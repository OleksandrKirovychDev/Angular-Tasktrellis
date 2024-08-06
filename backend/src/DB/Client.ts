import { Client, Pool } from 'pg';
import { AuthTypes, Connector } from '@google-cloud/cloud-sql-connector';

const connector = new Connector();

const DBManager = async () =>
  connector
    .getOptions({
      instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME!,
      authType: AuthTypes.IAM,
    })
    .then((clientOpts) => ({
      pool: new Pool({
        ...clientOpts,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      }),
      client: new Client({
        ...clientOpts,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      }),
    }));

export { DBManager };
