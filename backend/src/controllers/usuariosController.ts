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

export async function loginUsuario(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    const { data: usuario, error } = await supabase
      .from("Usuarios")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Login bem-sucedido
    return res.status(200).json({
      message: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}