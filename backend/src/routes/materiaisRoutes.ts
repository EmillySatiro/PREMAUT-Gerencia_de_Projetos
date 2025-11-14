import { Router } from 'express';
import multer from 'multer';
import { 
  uploadArquivo, 
  updateArquivo, 
  removeArquivo, 
  getMateriais, 
  getArquivoPorId,
  updateArquivoMetadados // 👈 ADICIONE AQUI
} from '../controllers/materiaisController';

const upload = multer();
const router = Router();

router.get('/:id', getArquivoPorId);
router.get('/', getMateriais);
router.post('/', upload.single('file'), uploadArquivo);
router.put('/:id/metadados', updateArquivoMetadados); // 👈 NOVA ROTA - Atualizar metadados
router.put('/:filename', upload.single('file'), updateArquivo); // Atualizar arquivo físico
router.delete('/:filename', removeArquivo);

export default router;