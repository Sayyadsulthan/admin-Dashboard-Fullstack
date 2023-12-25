import expres from "express";
import {getSales} from "../controllers/sales.js";

const router = expres.Router();

router.get("/sales", getSales);

export default router;
