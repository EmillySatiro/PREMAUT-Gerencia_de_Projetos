import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export async function getEditData(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID obrigatório." });
        }

        // Busca dados básicos do usuário
        const { data: usuario, error: userError } = await supabase
            .from("Usuarios")
            .select("nome, email, genero, telefone, nascimento, tipo_usuario")
            .eq("id", id)
            .eq("tipo_usuario", "monitor")
            .single();

        if (userError || !usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // Busca dados específicos do monitor (se existirem)
        const { data: dadosMonitor, error: monitorError } = await supabase
            .from("DadosMonitor")
            .select("inicio_periodo, fim_periodo, curso, professor")
            .eq("usuario_id", id)
            .maybeSingle();

        // Se der erro que não seja "não encontrado", loga mas não falha o request principal
        if (monitorError && monitorError.code !== "PGRST116") {
            console.error("Erro ao buscar dados do monitor:", monitorError);
        }

        const perfil = {
            ...usuario,
            ...(dadosMonitor || {
                inicio_periodo: "",
                fim_periodo: "",
                curso: "",
                professor: "",
            }),
        };

        return res.status(200).json({ perfil });
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}

export async function saveEditData(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const {
            nome,
            email,
            genero,
            telefone,
            nascimento,
            inicio_periodo,
            fim_periodo,
            curso,
            professor,
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID obrigatório." });
        }

        // 1. Atualiza dados básicos em Usuarios
        const { error: userError } = await supabase
            .from("Usuarios")
            .update({
                nome,
                email,
                genero,
                telefone,
                nascimento,
            })
            .eq("id", id);

        if (userError) {
            console.error("Erro ao atualizar Usuarios:", userError);
            return res.status(500).json({ error: "Erro ao atualizar dados básicos." });
        }

        // 2. Atualiza ou Cria dados em DadosMonitor
        // Verifica se já existe registro para este usuário
        const { data: existingMonitor, error: checkError } = await supabase
            .from("DadosMonitor")
            .select("id")
            .eq("usuario_id", id)
            .maybeSingle();

        if (checkError) {
            console.error("Erro ao verificar DadosMonitor:", checkError);
            return res.status(500).json({ error: "Erro ao verificar dados do monitor." });
        }

        let monitorError;

        if (existingMonitor) {
            // Atualiza
            const { error } = await supabase
                .from("DadosMonitor")
                .update({
                    inicio_periodo,
                    fim_periodo,
                    curso,
                    professor,
                })
                .eq("usuario_id", id);
            monitorError = error;
        } else {
            // Cria
            const { error } = await supabase
                .from("DadosMonitor")
                .insert({
                    usuario_id: id,
                    inicio_periodo,
                    fim_periodo,
                    curso,
                    professor,
                });
            monitorError = error;
        }

        if (monitorError) {
            console.error("Erro ao atualizar DadosMonitor:", monitorError);

            // Se o erro for de relação inexistente (tabela não existe), tentamos "criar" (simulado)
            // Nota: O cliente Supabase JS não cria tabelas. 
            // Vamos retornar um erro específico sugerindo a criação da tabela.


            return res.status(500).json({
                error: "Erro ao atualizar dados do monitor.",
                details: monitorError.message,
                hint: monitorError.hint,
                code: monitorError.code
            });
        }

        return res.status(200).json({ message: "Perfil atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro interno ao salvar:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}
