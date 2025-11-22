import express from "express";
import { supabase } from "../lib/supabaseClient";
import { usuarioController } from "../controllers/editarperfilController";

const router = express.Router();

// Inicializa o controller passando o supabase
const controller = usuarioController(supabase);

// Rota GET /api/usuarios/me
router.get("/me", controller.buscarPerfil);

// Rota PUT /api/usuarios/me
router.put("/me", controller.atualizarPerfil);

export default router;
