///npm install express nodemon cors dotenv morgan mysql2 --save
// Importar node packages
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

// SERVER ROUTES
import { api } from './routes/index.js';
import { curriculumDB, database } from './config/context/database.js';

//--REST SERVER--//
const server = express();

const clientURL = '*';

const corsOptions = {
  origin: clientURL,
};
server.use(cors(corsOptions));

server.use(morgan('short'));

server.use(express.json());

// http://localhost:4242/api ......
server.use('/api', api);


try {
  database.sync({ force: false, alter: true });
  curriculumDB.sync({ force: false, alter: true });
} catch (error) {
  console.info(error);
}

// correr server no url host:port definido em .env
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    'Server up and running at http://%s:%s',
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});
