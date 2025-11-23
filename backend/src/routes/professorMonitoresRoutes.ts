import express from "express";
import {
    getLinkedMonitors,
    getAvailableMonitors,
    linkMonitor
} from "../controllers/professorMonitoresController";

const router = express.Router();

// GET /api/professor/monitores/:professorId -> Lista monitores vinculados
router.get("/:professorId", getLinkedMonitors);

// GET /api/professor/monitores/disponiveis/:professorId -> Lista monitores disponíveis para vincular
router.get("/disponiveis/:professorId", getAvailableMonitors);

// POST /api/professor/monitores/vincular -> Vincula um monitor
router.post("/vincular", linkMonitor);

export default router;
