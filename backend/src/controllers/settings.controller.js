import Settings from "../models/Settings.js";

// ---------------------------------------
// Get Settings
// ---------------------------------------

export const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                name: "Bipasa Roy",
                title: "Backend Developer",
                about: "",
                email: "",
                phone: "",
                location: "",
                github: "",
                linkedin: "",
                twitter: "",
                website: "",

                resumeUrl: "",
                resumePublicId: "",

                profileImage: "",
                profileImagePublicId: ""
            });
        }

        res.status(200).json({
            success: true,
            data: settings
        });

    } catch (error) {
        console.error(
            "Get settings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to get settings",
            error: error.message
        });
    }
};


// ---------------------------------------
// Update Settings
// ---------------------------------------

export const updateSettings = async (req, res) => {
    try {
        const {
            name,
            title,
            about,
            email,
            phone,
            location,
            github,
            linkedin,
            twitter,
            website,

            resumeUrl,
            resumePublicId,

            profileImage,
            profileImagePublicId
        } = req.body;


        let settings = await Settings.findOne();


        if (!settings) {
            settings = new Settings({
                name: name || "Bipasa Roy",
                title: title || "Backend Developer"
            });
        }


        // ---------------------------------
        // Basic Settings
        // ---------------------------------

        if (name !== undefined) {
            settings.name = name;
        }

        if (title !== undefined) {
            settings.title = title;
        }

        if (about !== undefined) {
            settings.about = about;
        }

        if (email !== undefined) {
            settings.email = email;
        }

        if (phone !== undefined) {
            settings.phone = phone;
        }

        if (location !== undefined) {
            settings.location = location;
        }

        if (github !== undefined) {
            settings.github = github;
        }

        if (linkedin !== undefined) {
            settings.linkedin = linkedin;
        }

        if (twitter !== undefined) {
            settings.twitter = twitter;
        }

        if (website !== undefined) {
            settings.website = website;
        }


        // ---------------------------------
        // Resume
        // ---------------------------------

        if (resumeUrl !== undefined) {
            settings.resumeUrl = resumeUrl;
        }

        if (resumePublicId !== undefined) {
            settings.resumePublicId = resumePublicId;
        }


        // ---------------------------------
        // Profile Image
        // ---------------------------------

        if (profileImage !== undefined) {
            settings.profileImage = profileImage;
        }

        if (profileImagePublicId !== undefined) {
            settings.profileImagePublicId =
                profileImagePublicId;
        }


        await settings.save();


        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: settings
        });

    } catch (error) {
        console.error(
            "Update settings error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to update settings",
            error: error.message
        });
    }
};