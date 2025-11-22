import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export async function getPacienteEditData(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID obrigatório." });
        }

        const { data: paciente, error } = await supabase
            .from("pacientes")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !paciente) {
            return res.status(404).json({ error: "Paciente não encontrado." });
        }

        // Prepara os dados para o frontend
        const perfil = {
            ...paciente,
            nascimentoISO: paciente.nascimento, // Mantém a data original para o input date (se for YYYY-MM-DD)
            // Se o nascimento vier como timestamp, talvez precise converter. 
            // Assumindo que no banco é DATE ou TIMESTAMP
        };

        return res.status(200).json({ perfil });
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}

export async function savePacienteEditData(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID obrigatório." });
        }

        // Remove campos que não devem ser atualizados diretamente se vierem no body
        delete updates.id;
        delete updates.created_at;
        delete updates.nascimentoISO; // Remove campo auxiliar

        const { error } = await supabase
            .from("pacientes")
            .update(updates)
            .eq("id", id);

        if (error) {
            console.error("Erro ao atualizar paciente:", error);
            return res.status(500).json({
                error: "Erro ao atualizar paciente.",
                details: error.message
            });
        }

        return res.status(200).json({ message: "Paciente atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}
