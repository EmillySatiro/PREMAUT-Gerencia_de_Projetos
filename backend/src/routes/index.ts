import { Router } from "express";
import eventoRoutes from "./eventoRoutes";
import pacienteRoutes from "./pacienteRoutes";
import editarperfilRoutes from "./editarperfilRouters";

const router = Router();

router.use(eventoRoutes);
router.use(pacienteRoutes);
router.use(editarperfilRoutes);

export default router;
