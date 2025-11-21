import { Router } from 'express';
import {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  removeEvento
} from '../controllers/eventosController';

const router = Router();

router.get('/', getEventos);
router.get('/:id', getEventoById);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', removeEvento);

export default router;