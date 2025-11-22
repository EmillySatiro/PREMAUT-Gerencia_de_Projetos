import { Request, Response } from "express";
import { SupabaseClient } from "@supabase/supabase-js";

export const usuarioController = (supabase: SupabaseClient) => {
  return {
    async buscarPerfil(req: Request, res: Response) {
      try {
        // pega e-mail da query ou usa um teste temporário
        const email = (req.query.email as string) || "teste@exemplo.com";

        const { data, error } = await supabase
          .from("usuarios")
          .select("nome, genero, telefone, email, nascimento")
          .eq("email", email)
          .maybeSingle();

        if (error) {
          console.error("Erro ao buscar perfil:", error);
          return res.status(500).json({ message: "Erro interno do servidor." });
        }

        if (!data) {
          return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json(data);
      } catch (error) {
        console.error("Erro inesperado ao buscar perfil:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
      }
    },

    async atualizarPerfil(req: Request, res: Response) {
      try {
        const { nome, genero, telefone, email, nascimento } = req.body;

        if (!email) {
          return res.status(400).json({ message: "O campo 'email' é obrigatório." });
        }

        const { data, error } = await supabase
          .from("usuarios")
          .update({
            nome,
            genero,
            telefone,
            nascimento,
          })
          .eq("email", email)
          .select()
          .maybeSingle();

        if (error) {
          console.error("Erro ao atualizar perfil:", error);
          return res.status(500).json({ message: "Erro interno do servidor." });
        }

        if (!data) {
          return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json({
          message: "Perfil atualizado com sucesso.",
          data,
        });
      } catch (error) {
        console.error("Erro inesperado ao atualizar perfil:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
      }
    },
  };
};
