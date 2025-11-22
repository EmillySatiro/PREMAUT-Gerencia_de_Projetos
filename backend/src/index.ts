import express from "express";
import cors from "cors";
import routes from "./routes";
import eventoRoutes from "./routes/eventoRoutes";
import pacienteRoutes from "./routes/pacienteRoutes";

const app = express();

// CORS para aceitar requisições do Next.js
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// Rotas principais
app.use("/api", routes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/pacientes", pacienteRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});

export default app;