import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, subject and message are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully",
            data: contact
        });

    } catch (error) {
        console.error("CREATE CONTACT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to save contact message",
            error: error.message
        });
    }
};


export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact
            .find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {
        console.error("GET CONTACTS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch contact messages",
            error: error.message
        });
    }
};

export const updateContactStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "unread",
            "read",
            "replied"
        ];

        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid status. Allowed values are unread, read and replied"
            });

        }

        const contact =
            await Contact.findByIdAndUpdate(
                id,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!contact) {

            return res.status(404).json({
                success: false,
                message:
                    "Contact message not found"
            });

        }

        return res.status(200).json({

            success: true,

            message:
                "Contact status updated successfully",

            data: contact

        });

    } catch (error) {

        console.error(
            "UPDATE CONTACT ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to update contact",

            error:
                error.message

        });

    }

};

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact message deleted"
        });

    } catch (error) {
        console.error("DELETE CONTACT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete contact",
            error: error.message
        });
    }
};