import Contact from "../models/contact.js";


// CREATE CONTACT MESSAGE
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
                message:
                    "Name, email, subject and message are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message:
                "Your message has been sent successfully",
            data: contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message
        });
    }
};


// GET CONTACT MESSAGES
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
            error: error.message
        });
    }
};


// UPDATE CONTACT STATUS
export const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

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
                message: "Contact message not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact status updated",
            data: contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update contact",
            error: error.message
        });
    }
};


// DELETE CONTACT
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact =
            await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact message deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete contact",
            error: error.message
        });
    }
};