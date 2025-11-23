import { Router } from 'express';
import multer from 'multer';
import {
  uploadArquivo,
  updateArquivo,
  removeArquivo,
  getMateriais,
  getArquivoPorId,
  updateArquivoMetadados,
  createArquivo // 👈 ADICIONE AQUI
} from '../controllers/materiaisController';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/:id', getArquivoPorId);
router.get('/', getMateriais);
router.post('/', upload.single('file'), uploadArquivo);
router.post('/novo', createArquivo); // 👈 NOVA ROTA - Criar registro no banco
router.put('/:id/metadados', updateArquivoMetadados);
router.put('/:filename', upload.single('file'), updateArquivo);
router.delete('/:filename', removeArquivo);

export default router;