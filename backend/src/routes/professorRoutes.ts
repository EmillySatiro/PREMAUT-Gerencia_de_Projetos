import express from "express";
import { getProfessorData, updateProfessorData } from "../controllers/professorController";

const router = express.Router();

// Rota para buscar dados do perfil do professor (incluindo dados específicos)
router.get("/:id", getProfessorData);

// Rota para atualizar dados do perfil do professor
router.put("/:id", updateProfessorData);

export default router;
