import express from "express";
import { generateText } from "../helper/generateText.js";
const router = express.Router();

router.post("/generatetext", generateText);

export default router;
