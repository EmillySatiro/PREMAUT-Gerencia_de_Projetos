import express, { Request, Response } from "express";
import { cadastrarUsuario, loginUsuario } from "../controllers/usuariosController";

const router = express.Router();

/**
 * @route POST /api/usuarios/cadastro
 * @desc Cadastrar novo usuário
 * @access Público
 */
router.post("/cadastro", async (req: Request, res: Response) => {
  try {
    await cadastrarUsuario(req, res);
  } catch (error) {
    console.error("Erro na rota de cadastro:", error);
    res.status(500).json({ error: "Erro no servidor ao cadastrar usuário." });
  }
});

/**
 * @route POST /api/usuarios/login
 * @desc Login de usuário
 * @access Público
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    await loginUsuario(req, res);
  } catch (error) {
    console.error("Erro na rota de login:", error);
    res.status(500).json({ error: "Erro no servidor ao fazer login." });
  }
});

/**
 * @route GET /api/usuarios/teste
 * @desc Verificar se a rota está ativa
 */
router.get("/teste", (req: Request, res: Response) => {
  res.json({ mensagem: "Rota de usuários ativa! 🚀" });
});

export default router;
