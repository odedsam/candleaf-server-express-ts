"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactForm = void 0;
const contact_model_1 = __importDefault(require("./contact.model"));
const handleContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new contact_model_1.default({
            name,
            email,
            message,
        });
        const savedContact = await newContact.save();
        console.log("Contact form data saved:", savedContact);
        res.status(201).json({ message: "Message received and saved successfully!", data: savedContact });
    }
    catch (error) {
        console.error("Error saving contact form data:", error);
        res.status(500).json({ message: "Failed to save message." });
    }
};
exports.handleContactForm = handleContactForm;
//# sourceMappingURL=contact.controller.js.map