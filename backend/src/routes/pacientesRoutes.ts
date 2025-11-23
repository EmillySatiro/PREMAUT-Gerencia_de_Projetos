import { Router } from 'express';
import {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  removePaciente,
  getFamiliarByPacienteId // <--- Importe a nova função
} from '../controllers/pacientesController';
import { getPacienteEditData, savePacienteEditData } from '../controllers/pacienteEditController';

const router = Router();

router.get('/', getPacientes);
router.get('/:id', getPacienteById);

// Nova rota para buscar o nome do familiar
router.get('/:id/familiar', getFamiliarByPacienteId);

router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', removePaciente);

// Rotas específicas para a tela de edição
router.get('/editar/:id', getPacienteEditData);
router.put('/editar/:id', savePacienteEditData);

export default router;