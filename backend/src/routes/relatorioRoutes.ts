import { Router } from 'express';
import {
  getRelatorios, getRelatorioById,
  createRelatorio,
  updateRelatorio, removeRelatorio, getRelatorioStats,
  getRelatoriosByPaciente
} from '../controllers/relatorioController';

const router = Router();

router.get('/', getRelatorios);
router.get('/paciente/:pacienteId', getRelatoriosByPaciente); // Nova rota
router.get('/:id', getRelatorioById);
router.post('/', createRelatorio);
router.put('/:id', updateRelatorio);
router.delete('/:id', removeRelatorio);
router.get('/stats', getRelatorioStats);

export default router;