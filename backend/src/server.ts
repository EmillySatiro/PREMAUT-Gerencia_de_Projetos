import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3001;
const IP = process.env.IP || "localhost";

app.listen(PORT, () => { console.log(`Servidor rodando: http://${IP}:${PORT}`);});
