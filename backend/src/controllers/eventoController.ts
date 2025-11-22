import { Request, Response } from "express";
import {
  criarEvento,
  listarEventos,
  buscarEventoPorId,
  deletarEvento,
} from "../models/eventoModel";

export async function getEventos(req: Request, res: Response) {
  try {
    const eventos = await listarEventos();
    res.json(eventos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getEventoPorId(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const evento = await buscarEventoPorId(id);
    if (!evento) return res.status(404).json({ message: "Evento não encontrado" });
    res.json(evento);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function postEvento(req: Request, res: Response) {
  try {
    const novoEvento = await criarEvento(req.body);
    res.status(201).json(novoEvento);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await deletarEvento(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
