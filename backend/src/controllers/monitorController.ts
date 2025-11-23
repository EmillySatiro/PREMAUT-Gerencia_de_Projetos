// controllers/monitorController.ts
import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export async function getPerfilMonitor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log(`[getPerfilMonitor] Request received for ID: ${id}`);

    if (!id) {
      console.log("[getPerfilMonitor] ID missing");
      return res.status(400).json({ error: "ID obrigatório." });
    }

    const { data: usuario, error } = await supabase
      .from("Usuarios")
      .select("nome, email, genero, telefone, nascimento, criado_em, tipo_usuario")
      .eq("id", id)
      .eq("tipo_usuario", "monitor")
      .single();

    console.log(`[getPerfilMonitor] Supabase result for ID ${id}:`, { usuario, error });

    if (error || !usuario) {
      console.log("[getPerfilMonitor] User not found or error:", error);
      return res.status(403).json({ error: "Acesso negado ou usuário não encontrado." });
    }

    // Busca dados específicos do monitor (se existirem)
    const { data: dadosMonitor, error: monitorError } = await supabase
      .from("DadosMonitor")
      .select("inicio_periodo, fim_periodo, curso, professor")
      .eq("usuario_id", id)
      .maybeSingle();

    const perfil = {
      nome: usuario.nome,
      email: usuario.email,
      genero: usuario.genero || "Não informado",
      telefone: usuario.telefone || "Não informado",
      nascimento: usuario.nascimento
        ? new Date(usuario.nascimento).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "Não informado",
      nascimentoISO: usuario.nascimento, // Data crua para edição
      dataCadastro: new Date(usuario.criado_em).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      ...(dadosMonitor || {
        inicio_periodo: "Não informado",
        fim_periodo: "Não informado",
        curso: "Não informado",
        professor: "Não informado",
      }),
    };

    return res.status(200).json({ perfil });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno." });
  }
}

export async function updatePerfilMonitor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, email, genero, telefone, nascimento } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID obrigatório." });
    }

    const { error } = await supabase
      .from("Usuarios")
      .update({
        nome,
        email,
        genero,
        telefone,
        nascimento,
      })
      .eq("id", id)
      .eq("tipo_usuario", "monitor");

    if (error) {
      console.error("Erro ao atualizar perfil:", error);
      return res.status(500).json({ error: "Erro ao atualizar perfil." });
    }

    return res.status(200).json({ message: "Perfil atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro interno ao atualizar perfil:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
}