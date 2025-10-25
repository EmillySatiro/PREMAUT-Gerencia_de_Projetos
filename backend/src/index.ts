import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
const IP = process.env.IP || 'localhost';


app.listen(PORT, () => {
  console.log(`Servidor rodando: http://${IP}:${PORT}`);
});
