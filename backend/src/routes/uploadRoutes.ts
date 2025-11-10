import { Router } from 'express';
import multer from 'multer';
import { uploadArquivo, updateArquivo, removeArquivo } from '../controllers/uploadController';

const upload = multer();
const router = Router();

router.post('/', upload.single('file'), uploadArquivo);
router.put('/:filename', upload.single('file'), updateArquivo); // Atualizar arquivo
router.delete('/:filename', removeArquivo); // Remover arquivo

export default router;