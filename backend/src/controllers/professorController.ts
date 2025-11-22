import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export async function getProfessorData(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID obrigatório." });
        }

        // Busca dados básicos do usuário
        const { data: usuario, error: userError } = await supabase
            .from("Usuarios")
            .select("id, nome, email, genero, telefone, nascimento, tipo_usuario, criado_em")
            .eq("id", id)
            .eq("tipo_usuario", "professor")
            .single();

        if (userError || !usuario) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        // Busca dados específicos do professor (se existirem)
        // Note: The column name in DadosProfessor for the user link is likely 'id_professor' based on the image provided
        // But usually it's a foreign key to Usuarios.id. The image shows 'id_professor' (uuid). 
        // I will assume 'id_professor' is the FK to 'Usuarios.id'.
        const { data: dadosProfessor, error: professorError } = await supabase
            .from("DadosProfessor")
            .select("inicio_orientacao, fim_orientacao, curso, especialidade")
            .eq("id_professor", id)
            .maybeSingle();

        // Se der erro que não seja "não encontrado", loga mas não falha o request principal
        if (professorError && professorError.code !== "PGRST116") {
            console.error("Erro ao buscar dados do professor:", professorError);
        }

        const perfil = {
            ...usuario,
            ...(dadosProfessor || {
                inicio_orientacao: "",
                fim_orientacao: "",
                curso: "",
                especialidade: "",
            }),
        };

        return res.status(200).json({ perfil });
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}

export async function updateProfessorData(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const {
            nome,
            email,
            genero,
            telefone,
            nascimento,
            inicio_orientacao,
            fim_orientacao,
            curso,
            especialidade,
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

        // 2. Atualiza ou Cria dados em DadosProfessor
        // Verifica se já existe registro para este usuário
        const { data: existingProfessor, error: checkError } = await supabase
            .from("DadosProfessor")
            .select("id")
            .eq("id_professor", id)
            .maybeSingle();

        if (checkError) {
            console.error("Erro ao verificar DadosProfessor:", checkError);
            return res.status(500).json({ error: "Erro ao verificar dados do professor." });
        }

        let professorError;

        if (existingProfessor) {
            // Atualiza
            const { error } = await supabase
                .from("DadosProfessor")
                .update({
                    inicio_orientacao,
                    fim_orientacao,
                    curso,
                    especialidade,
                })
                .eq("id_professor", id);
            professorError = error;
        } else {
            // Cria
            const { error } = await supabase
                .from("DadosProfessor")
                .insert({
                    id_professor: id,
                    inicio_orientacao,
                    fim_orientacao,
                    curso,
                    especialidade,
                });
            professorError = error;
        }

        if (professorError) {
            console.error("Erro ao atualizar DadosProfessor:", professorError);
            return res.status(500).json({
                error: "Erro ao atualizar dados do professor.",
                details: professorError.message,
            });
        }

        return res.status(200).json({ message: "Perfil atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro interno ao salvar:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}
