
//creo que esto es innecesario, asi que sacar si lo es

import express from 'express';
// import cors from 'cors';
import routes from './routes/routes';

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);


  