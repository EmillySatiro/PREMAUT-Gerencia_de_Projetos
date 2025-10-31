import express from 'express';
import cors from 'cors'; // <-- Não esqueça do import!
import routes from './routes';
import relatorioRoutes from './routes/relatorioRoutes';
import uploadRouter from './routes/uploadRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/upload', uploadRouter);

export default app;