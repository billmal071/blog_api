import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import csrf from 'csrf-simple-origin';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import error from './middlewares/error';
import postRoute from './routes/post.route';
require('express-async-errors');
dotenv.config();

const swaggerJsDocs = yaml.load('./src/docs/api.yaml');
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(
  cors({
    origin: '*',
  }),
);
app.use(xss());
// const allowedOrigins = ['https://yoursite.example.com', 'http://localhost:5000', 'http://localhost:5000/'];
// app.use(csrf(allowedOrigins))

app.use('/api/v1/apexdv/doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
app.use('/api/v1/apexdv/posts', postRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to ApexDv Blog API',
  });
});

app.use(error);

export default app;
