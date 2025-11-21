// routes/monitorRouter.ts
import express from "express";
import { getPerfilMonitor, updatePerfilMonitor } from "../controllers/monitorController";

const router = express.Router();

router.get("/perfil/:id", getPerfilMonitor); // ← Usa o ID da URL
router.put("/perfil/:id", updatePerfilMonitor);

export default router;