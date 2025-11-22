import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

// Lista os pacientes vinculados a um monitor
export async function getLinkedPatients(req: Request, res: Response) {
    try {
        const { monitorId } = req.params;

        if (!monitorId) {
            return res.status(400).json({ error: "ID do monitor obrigatório." });
        }

        // Busca na tabela de relacionamento e faz join com Pacientes
        // Assumindo que a tabela de pacientes se chama "Pacientes" e tem colunas "id" e "nome"
        // Precisamos confirmar o nome da tabela de pacientes. Vou assumir "Pacientes" por enquanto.
        const { data, error } = await supabase
            .from("Monitor_Pacientes")
            .select(`
        id,
        paciente_id,
        pacientes (
          id,
          nome,
          nascimento
        )
      `)
            .eq("monitor_id", monitorId);

        if (error) {
            console.error("Erro ao buscar alunos vinculados:", error);
            return res.status(500).json({ error: "Erro ao buscar alunos vinculados." });
        }

        // Formata o retorno
        const alunos = data.map((item: any) => ({
            link_id: item.id,
            id: item.pacientes.id,
            nome: item.pacientes.nome,
            nascimento: item.pacientes.nascimento
        }));

        return res.status(200).json({ alunos });
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}

// Lista pacientes disponíveis para vínculo (que ainda não estão vinculados a este monitor)
// Opcional: pode filtrar para não mostrar pacientes já vinculados a *qualquer* monitor se for a regra,
// mas por enquanto vou filtrar apenas os que não estão vinculados a *este* monitor.
export async function getAvailablePatients(req: Request, res: Response) {
    try {
        const { monitorId } = req.params;

        // 1. Busca todos os pacientes
        const { data: allPatients, error: patientsError } = await supabase
            .from("pacientes")
            .select("id, nome");

        if (patientsError) {
            return res.status(500).json({ error: "Erro ao buscar pacientes." });
        }

        // 2. Busca os IDs já vinculados a este monitor
        const { data: linked, error: linkError } = await supabase
            .from("Monitor_Pacientes")
            .select("paciente_id")
            .eq("monitor_id", monitorId);

        if (linkError) {
            return res.status(500).json({ error: "Erro ao verificar vínculos." });
        }

        const linkedIds = new Set(linked.map((item: any) => item.paciente_id));

        // 3. Filtra
        const available = allPatients.filter((p: any) => !linkedIds.has(p.id));

        return res.status(200).json({ pacientes: available });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno." });
    }
}

// Vincula um paciente a um monitor
export async function linkPatient(req: Request, res: Response) {
    try {
        const { monitorId, pacienteId } = req.body;

        if (!monitorId || !pacienteId) {
            return res.status(400).json({ error: "IDs obrigatórios." });
        }

        // Verifica se já existe o vínculo
        const { data: existing, error: checkError } = await supabase
            .from("Monitor_Pacientes")
            .select("id")
            .eq("monitor_id", monitorId)
            .eq("paciente_id", pacienteId)
            .maybeSingle();

        if (existing) {
            return res.status(400).json({ error: "Paciente já vinculado." });
        }

        const { error } = await supabase
            .from("Monitor_Pacientes")
            .insert({
                monitor_id: monitorId,
                paciente_id: pacienteId
            });

        if (error) {
            console.error("Erro ao vincular:", error);
            return res.status(500).json({ error: "Erro ao vincular paciente." });
        }

        return res.status(200).json({ message: "Vínculo criado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno." });
    }
}
