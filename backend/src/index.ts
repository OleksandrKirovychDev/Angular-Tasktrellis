import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { DBManager } from './DB/Client';

const app = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  const { client } = await DBManager();

  await client
    .connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.log(err));
});
