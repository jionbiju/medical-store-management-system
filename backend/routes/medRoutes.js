import express from "express";
import { addMedicine, deleteMedicine, getMedicine, searchMedicine } from "../controller/medController.js";


const router = express.Router();

router.get('/getMedicines',getMedicine);
router.post('/add',addMedicine);
router.get('/search',searchMedicine);
router.delete('/delete/:id',deleteMedicine);

export default router;