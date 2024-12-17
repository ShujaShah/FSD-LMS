import express from "express";
import { updateUser } from "../controllers/userClerkController";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.put("/:userId", requireAuth(), updateUser);

export default router;