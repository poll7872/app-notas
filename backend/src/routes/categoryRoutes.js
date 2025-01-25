import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/getCategories", getAllCategories);
router.post("/createCategory", createCategory);

export default router;
