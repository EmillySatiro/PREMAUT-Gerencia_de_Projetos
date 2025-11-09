import { Request, Response } from "express";
import bcrypt from "bcryptjs"; 

import { supabase } from "../services/supabaseClient"; 

export async function cadastrarUsuario(req: Request, res: Response) {
  try {
    const { nome, genero, email, telefone, senha, nascimento } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    const { data: existente, error: erroBusca } = await supabase
      .from("Usuarios")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (erroBusca && erroBusca.code !== "PGRST116") {
      console.error("Erro ao verificar usuário existente:", erroBusca);
      return res.status(500).json({ error: "Erro ao verificar usuário existente." });
    }

    if (existente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }


    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase.from("Usuarios").insert([
      {
        nome,
        genero,
        email,
        telefone,
        senha: senhaCriptografada,
        nascimento,
        tipo_usuario: "comum",
      },
    ]);

    if (error) {
      console.error("Erro no insert do Supabase:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!", data });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}
