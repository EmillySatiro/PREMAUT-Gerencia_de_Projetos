import express from 'express';
import cors from 'cors';
import routes from './routes';
import relatorioRoutes from './routes/relatorioRoutes';
import materiaisRoutes from './routes/materiaisRoutes';
import usuariosRoutes from "./routes/usuarios"; 
import monitorRouter from "./routes/monitorRouter";
import pacientesRoutes from './routes/pacientesRoutes';
import monitorRoutes from "./routes/monitorRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use("/api/monitor", monitorRouter);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/materiais', materiaisRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use("/api/monitor", monitorRoutes);

export default app;

