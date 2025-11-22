import { Router } from "express";
import {
  getEventos,
  getEventoPorId,
  postEvento,
  deleteEvento,
} from "../controllers/eventoController";

const router = Router();

router.get("/", getEventos);        // GET /eventos
router.get("/:id", getEventoPorId); // GET /eventos/:id
router.post("/", postEvento);       // POST /eventos
router.delete("/:id", deleteEvento);// DELETE /eventos/:id

export default router;
