import { Readable } from "stream";

import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (
    buffer,
    options = {}
) => {
    return new Promise(
        (resolve, reject) => {

            const uploadStream =
                cloudinary.uploader.upload_stream(
                    options,
                    (error, result) => {

                        if (error) {
                            reject(error);
                            return;
                        }

                        resolve(result);
                    }
                );

            Readable
                .from(buffer)
                .pipe(uploadStream);
        }
    );
};


// ------------------------------------
// Upload Profile Image
// ------------------------------------

export const uploadProfileImage = async (
    req,
    res
) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message:
                    "Profile image is required"
            });
        }

        const result =
            await uploadToCloudinary(
                req.file.buffer,
                {
                    folder:
                        "portfolio/profile",

                    resource_type:
                        "image"
                }
            );

        res.status(200).json({
            success: true,
            message:
                "Profile image uploaded successfully",

            data: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });

   } catch (error) {
    console.error(
        "Profile image upload error:",
        error
    );

    res.status(500).json({
        success: false,
        message: "Failed to upload profile image",
        error: error.message
    });
}
};

// ------------------------------------
// Upload Resume
// ------------------------------------

export const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF is required"
            });
        }


        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({
                success: false,
                message: "Only PDF files are allowed for resume"
            });
        }


        const result = await uploadToCloudinary(
            req.file.buffer,
            {
                folder: "portfolio/resume",

                // Cloudinary supports PDFs as image assets
                resource_type: "image",

                // Do NOT put .pdf in image public_id
                public_id: `resume_${Date.now()}`
            }
        );


        res.status(200).json({
            success: true,

            message:
                "Resume uploaded successfully",

            data: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });


    } catch (error) {

        console.error(
            "Resume upload error:",
            error
        );

        res.status(500).json({
            success: false,

            message:
                "Failed to upload resume",

            error:
                error.message
        });
    }
};