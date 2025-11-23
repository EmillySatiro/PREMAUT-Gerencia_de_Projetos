// routes/monitorRouter.ts
import express from "express";
import { getPerfilMonitor, updatePerfilMonitor } from "../controllers/monitorController";
import { getEditData, saveEditData } from "../controllers/monitoreditController";
import { getLinkedPatients, getAvailablePatients, linkPatient } from "../controllers/monitorPacientesController";

const router = express.Router();

router.get("/perfil/:id", getPerfilMonitor);
router.put("/perfil/:id", updatePerfilMonitor); // Mantendo por compatibilidade, se necessário

// Rotas para a nova tela de edição
router.get("/editar/:id", getEditData);
router.put("/editar/:id", saveEditData);

// Rotas para gestão de alunos/pacientes
router.get("/pacientes/:monitorId", getLinkedPatients);
router.get("/pacientes/disponiveis/:monitorId", getAvailablePatients);
router.post("/pacientes/vincular", linkPatient);

export default router;