import { Request, Response } from "express";
import ContactModel from "./contact.model";

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new ContactModel({
      name,
      email,
      message,
    });

    const savedContact = await newContact.save();

    console.log("Contact form data saved:", savedContact);
    res.status(201).json({ message: "Message received and saved successfully!", data: savedContact });

  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ message: "Failed to save message." });
  }
};
