import express from 'express';
import cors from 'cors';
import routes from './routes';
import relatorioRoutes from './routes/relatorioRoutes';
import materiaisRoutes from './routes/materiaisRoutes';
import usuariosRoutes from "./routes/usuarios"; 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/materiais', materiaisRoutes);
app.use("/api/usuarios", usuariosRoutes);

export default app;