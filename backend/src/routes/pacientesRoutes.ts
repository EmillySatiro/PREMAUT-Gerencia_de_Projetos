import { Router } from 'express';
import {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  removePaciente
} from '../controllers/pacientesController';
import { getPacienteEditData, savePacienteEditData } from '../controllers/pacienteEditController';

const router = Router();

router.get('/', getPacientes);
router.get('/:id', getPacienteById);
router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', removePaciente);

// Rotas específicas para a tela de edição (se precisar de formatação especial)
router.get('/editar/:id', getPacienteEditData);
router.put('/editar/:id', savePacienteEditData);

export default router;