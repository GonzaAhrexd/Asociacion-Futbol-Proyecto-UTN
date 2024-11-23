
import express from 'express';
// import cors from 'cors';
import routes from './routes/routes';

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// ver
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });
  
  