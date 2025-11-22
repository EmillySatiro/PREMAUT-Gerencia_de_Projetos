import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventoRoutes from "./routes/eventoRoutes";
import pacienteRoutes from "./routes/pacienteRoutes";

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3001;
const IP = process.env.IP || "localhost";


app.use(cors());
app.use(express.json());

app.use("/api/eventos", eventoRoutes);
app.use("/api/pacientes", pacienteRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando: http://${IP}:${PORT}`);
});

export default app; 
