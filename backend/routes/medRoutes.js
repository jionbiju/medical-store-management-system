import express from "express";
import { addMedicine, getMedicine } from "../controller/medController.js";


const router = express.Router();

router.get('/',getMedicine);
router.post('/add',addMedicine);

export default router;