import expres from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = expres.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;
