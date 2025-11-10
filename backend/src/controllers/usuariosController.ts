import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { supabase } from "../services/supabaseClient";
import nodemailer from "nodemailer";

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


export async function enviarCodigoRecuperacao(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "O e-mail é obrigatório." });
    }

  
    const { data: usuario, error: buscaErr } = await supabase
      .from("Usuarios")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (buscaErr) {
      console.error("Erro ao buscar usuário:", buscaErr);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }


    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      await supabase
        .from("RecuperacaoSenha")
        .insert([{ usuario_id: usuario.id, codigo, criado_em: new Date().toISOString() }]);
    } catch (dbErr) {
      console.warn("Aviso: não foi possível salvar o código em 'RecuperacaoSenha' (pode não existir).", dbErr);

    }

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: `"PREMAUT (Teste)" <no-reply@premaut.test>`,
      to: email,
      subject: "Código de recuperação de senha (teste)",
      text: `Olá ${usuario.nome || ""},\n\nSeu código de recuperação é: ${codigo}\n\nSe não foi você, ignore.`,
      html: `<p>Olá ${usuario.nome || ""},</p><p>Seu código de recuperação é: <b>${codigo}</b></p><p>Se não foi você, ignore.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    


    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log("Ethereal preview URL:", previewUrl);

    return res.status(200).json({
      message: "Código (teste) enviado. Abra previewUrl para visualizar o e-mail.",
      previewUrl,
    });
  } catch (error: any) {
    console.error("Erro ao enviar código de recuperação:", error);
    return res.status(500).json({ error: "Erro interno no servidor.", detalhes: error.message });
  }
}

export async function verificarCodigo(req: Request, res: Response) {
  try {
    const { email, codigo } = req.body;

    if (!email || !codigo) {
      return res.status(400).json({ error: "E-mail e código são obrigatórios." });
    }

    console.log(`[verificarCodigo] solicitacao para email=${email} codigo=${codigo}`);


    const { data: usuario, error: userErr } = await supabase
      .from("Usuarios")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (userErr) {
      console.error("[verificarCodigo] erro ao buscar usuario:", userErr);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const { data: codigoData, error: codeErr } = await supabase
      .from("RecuperacaoSenha")
      .select("id, codigo, criado_em")
      .eq("usuario_id", usuario.id)
      .order("criado_em", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (codeErr) {
      console.error("[verificarCodigo] erro ao buscar codigo:", codeErr);
      return res.status(500).json({ error: "Erro ao buscar código." });
    }

    if (!codigoData) {
      console.warn("[verificarCodigo] nenhum codigo encontrado para usuario_id=", usuario.id);
      return res.status(400).json({ error: "Código inválido." });
    }

    const codigoSalvo = String(codigoData.codigo).trim();
    const codigoRecebido = String(codigo).trim();


    const criadoEm = new Date(codigoData.criado_em);
    const expirado = (Date.now() - criadoEm.getTime()) > 15 * 60 * 1000; // 15 min

    if (codigoSalvo !== codigoRecebido) {
      console.warn("[verificarCodigo] codigo incorreto", { codigoSalvo, codigoRecebido });
      return res.status(400).json({ error: "Código inválido." });
    }

    if (expirado) {
      console.warn("[verificarCodigo] codigo expirado", { criadoEm });
      return res.status(400).json({ error: "Código expirado. Solicite novamente." });
    }


    return res.status(200).json({ message: "Código válido." });
  } catch (err: any) {
    console.error("[verificarCodigo] erro inesperado:", err);
    return res.status(500).json({ error: "Erro interno no servidor.", detalhes: err.message });
  }
}


export async function redefinirSenha(req: Request, res: Response) {
  try {
    const { email, codigo, novaSenha } = req.body;

    if (!email || !codigo || !novaSenha) {
      return res.status(400).json({ error: "E-mail, código e nova senha são obrigatórios." });
    }

    console.log(`[redefinirSenha] email=${email} codigo=${codigo}`);

 
    const { data: usuario, error: usuarioErr } = await supabase
      .from("Usuarios")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (usuarioErr) {
      console.error("[redefinirSenha] erro ao buscar usuario:", usuarioErr);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

 
    const { data: recuperacao, error: rcErr } = await supabase
      .from("RecuperacaoSenha")
      .select("id, codigo, criado_em")
      .eq("usuario_id", usuario.id)
      .order("criado_em", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (rcErr) {
      console.error("[redefinirSenha] erro ao buscar recuperacao:", rcErr);
      return res.status(500).json({ error: "Erro ao buscar código." });
    }

    if (!recuperacao) {
      return res.status(400).json({ error: "Link inválido. Solicite novamente o código de recuperação." });
    }

    const codigoSalvo = String(recuperacao.codigo).trim();
    const codigoRecebido = String(codigo).trim();
    const criadoEm = new Date(recuperacao.criado_em);
    const expirado = (Date.now() - criadoEm.getTime()) > 15 * 60 * 1000; // 15 min

    if (codigoSalvo !== codigoRecebido) {
      console.warn("[redefinirSenha] codigo mismatch", { codigoSalvo, codigoRecebido });
      return res.status(400).json({ error: "Link inválido. Solicite novamente o código de recuperação." });
    }
    if (expirado) {
      console.warn("[redefinirSenha] codigo expirado", { criadoEm });
      return res.status(400).json({ error: "Link expirado. Solicite outro código." });
    }

  
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    const { error: updateErr } = await supabase
      .from("Usuarios")
      .update({ senha: senhaCriptografada })
      .eq("id", usuario.id);

    if (updateErr) {
      console.error("[redefinirSenha] erro ao atualizar senha:", updateErr);
      return res.status(500).json({ error: "Erro ao atualizar senha." });
    }

  
    const { error: delErr } = await supabase
      .from("RecuperacaoSenha")
      .delete()
      .eq("id", recuperacao.id);

    if (delErr) {
      console.warn("[redefinirSenha] não foi possível deletar o código (não bloqueante):", delErr);
    }

    return res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (err: any) {
    console.error("[redefinirSenha] erro inesperado:", err);
    return res.status(500).json({ error: "Erro interno no servidor.", detalhes: err.message });
  }
}
