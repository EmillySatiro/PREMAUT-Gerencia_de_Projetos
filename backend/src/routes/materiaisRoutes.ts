import { Router } from 'express';
import multer from 'multer';
import { uploadArquivo, updateArquivo, removeArquivo, getMateriais } from '../controllers/materiaisController';

const upload = multer();
const router = Router();

router.get('/', getMateriais);
router.post('/', upload.single('file'), uploadArquivo);
router.put('/:filename', upload.single('file'), updateArquivo); // Atualizar arquivo
router.delete('/:filename', removeArquivo); // Remover arquivo

export default router;