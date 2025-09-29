import express from "express";
import { addMedicine, getMedicine, searchMedicine } from "../controller/medController.js";


const router = express.Router();

router.get('/getMedicines',getMedicine);
router.post('/add',addMedicine);
router.get('/search',searchMedicine);

export default router;