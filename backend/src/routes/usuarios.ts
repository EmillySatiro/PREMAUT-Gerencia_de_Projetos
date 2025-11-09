import express, { Request, Response } from "express";
import { cadastrarUsuario } from "../controllers/usuariosController"; // Importa a função real de cadastro

const router = express.Router();

/**
 * @route POST /api/usuarios/cadastro
 * @desc Cadastrar novo usuário
 * @access Público
 */
router.post("/cadastro", async (req: Request, res: Response) => {
  try {
    // Chama o controller que lida com o cadastro e o banco
    await cadastrarUsuario(req, res);
  } catch (error) {
    console.error("Erro na rota de cadastro:", error);
    res.status(500).json({ error: "Erro no servidor ao cadastrar usuário." });
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
