import { Router } from 'express';
import { 
  getRelatorios, getRelatorioById,
   createRelatorio, 
  updateRelatorio, removeRelatorio
} from '../controllers/relatorioController';

const router = Router();

router.get('/', getRelatorios);
router.get('/:id', getRelatorioById);
router.post('/', createRelatorio);
router.put('/:id', updateRelatorio);
router.delete('/:id', removeRelatorio);

export default router;