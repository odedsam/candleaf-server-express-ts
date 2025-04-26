import { Router } from "express";
import { ProductController } from "./product.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { productSchema } from "schemas/productSchema";

const router = Router();

router.post("/", validateRequest(productSchema), ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", validateRequest(productSchema), ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
