import { Router } from "express";
import {
  archiveNote,
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/noteController.js";

const router = Router();

router.post("/createNote", createNote);
router.get("/getAllNotes", getAllNotes);
router.get("/getNote/:id", getNoteById);
router.put("/updateNote/:id", updateNote);
router.put("/archiveNote/:id", archiveNote);
router.delete("/deleteNote/:id", deleteNote);

export default router;
