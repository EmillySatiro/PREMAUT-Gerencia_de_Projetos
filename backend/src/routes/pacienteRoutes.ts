import { Router } from "express";
import {
  getPacientes,
  getPacientePorId,
  postPaciente,
  deletePaciente,
} from "../controllers/pacienteController";

const router = Router();

router.get("/", getPacientes);
router.get("/:id", getPacientePorId);
router.post("/", postPaciente);
router.delete("/:id", deletePaciente);

export default router;
