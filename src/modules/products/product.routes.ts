import { Router } from "express";
import { ProductController } from "./product.controller";
import { validate } from "../../middleware/validate";
import { productSchema } from "schemas/productSchema";

const router = Router();

router.post("/", validate(productSchema), ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", validate(productSchema), ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;