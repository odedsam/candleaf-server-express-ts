import { Router } from "express";
import { handleContactForm } from "./contact.controller";

const router = Router();

router.post("/contact", handleContactForm);

export default router;
