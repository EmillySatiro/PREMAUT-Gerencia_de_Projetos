import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios"; 

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3001;
const IP = process.env.IP || "localhost";


app.use(cors());
app.use(express.json());


app.use("/api/usuarios", usuariosRoutes);



app.listen(PORT, () => {
  console.log(`Servidor rodando: http://${IP}:${PORT}`);
});

export default app; 
