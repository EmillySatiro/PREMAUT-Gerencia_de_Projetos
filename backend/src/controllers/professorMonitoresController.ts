import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

// Busca monitores vinculados a um professor
export async function getLinkedMonitors(req: Request, res: Response) {
    const { professorId } = req.params;

    try {
        const { data, error } = await supabase
            .from("Professor_Monitores")
            .select(`
                id,
                created_at,
                monitor_id,
                Usuarios:monitor_id (
                    id,
                    nome,
                    email,
                    genero,
                    nascimento
                )
            `)
            .eq("professor_id", professorId);

        if (error) {
            console.error("Erro ao buscar monitores vinculados:", error);
            return res.status(500).json({ error: error.message });
        }

        // Formata a resposta para facilitar o uso no frontend
        const monitores = data.map((item: any) => ({
            link_id: item.id,
            id: item.Usuarios.id,
            nome: item.Usuarios.nome,
            email: item.Usuarios.email,
            genero: item.Usuarios.genero,
            nascimento: item.Usuarios.nascimento
        }));

        return res.status(200).json({ monitores });
    } catch (error: any) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Erro interno." });
    }
}

// Busca monitores disponíveis (que ainda não estão vinculados a este professor)
export async function getAvailableMonitors(req: Request, res: Response) {
    const { professorId } = req.params;

    try {
        console.log("Buscando monitores disponíveis para professor:", professorId);

        // 1. Busca todos os monitores (case insensitive)
        const { data: allMonitors, error: monitorsError } = await supabase
            .from("Usuarios")
            .select("id, nome, tipo_usuario")
            .ilike("tipo_usuario", "monitor");

        if (monitorsError) {
            console.error("Erro ao buscar todos os monitores:", monitorsError);
            throw monitorsError;
        }

        console.log("Total de monitores encontrados:", allMonitors?.length);

        // 2. Busca os IDs dos monitores já vinculados a este professor
        const { data: linked, error: linkedError } = await supabase
            .from("Professor_Monitores")
            .select("monitor_id")
            .eq("professor_id", professorId);

        if (linkedError) {
            console.error("Erro ao buscar vínculos:", linkedError);
            throw linkedError;
        }

        const linkedIds = new Set(linked.map((item: any) => item.monitor_id));
        console.log("Monitores já vinculados:", linkedIds.size);

        // 3. Filtra apenas os disponíveis
        const available = allMonitors.filter((m: any) => !linkedIds.has(m.id));
        console.log("Monitores disponíveis:", available.length);

        return res.status(200).json({ monitores: available });
    } catch (error: any) {
        console.error("Erro ao buscar monitores disponíveis:", error);
        return res.status(500).json({ error: error.message });
    }
}

// Vincula um monitor a um professor
export async function linkMonitor(req: Request, res: Response) {
    const { professorId, monitorId } = req.body;

    if (!professorId || !monitorId) {
        return res.status(400).json({ error: "professorId e monitorId são obrigatórios." });
    }

    try {
        // Verifica se já existe o vínculo
        const { data: existing, error: checkError } = await supabase
            .from("Professor_Monitores")
            .select("id")
            .eq("professor_id", professorId)
            .eq("monitor_id", monitorId)
            .maybeSingle();

        if (checkError) throw checkError;

        if (existing) {
            return res.status(400).json({ error: "Monitor já vinculado a este professor." });
        }

        // Cria o vínculo
        const { data, error } = await supabase
            .from("Professor_Monitores")
            .insert([
                {
                    professor_id: professorId,
                    monitor_id: monitorId,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;

        return res.status(201).json({ message: "Monitor vinculado com sucesso!", data });
    } catch (error: any) {
        console.error("Erro ao vincular monitor:", error);
        return res.status(500).json({ error: error.message });
    }
}
