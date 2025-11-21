import { Router } from 'express';
import {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  removePaciente
} from '../controllers/pacientesController';

const router = Router();

router.get('/', getPacientes);
router.get('/:id', getPacienteById);
router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', removePaciente);

export default router;