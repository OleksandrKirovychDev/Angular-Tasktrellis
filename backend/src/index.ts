import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { AppDataSource } from './database/data-source';

// routes import
import { userRouter } from './routes/user.routes';

const app = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log('Server is running on http://localhost:' + port);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));

app.use('/user', userRouter);
