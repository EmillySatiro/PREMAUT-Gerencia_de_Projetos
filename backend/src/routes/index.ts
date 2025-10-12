import { Router } from 'express';
import exampleController from '../controllers/exampleController';

const router = Router();

router.get('/hello', exampleController.hello);

export default router;
