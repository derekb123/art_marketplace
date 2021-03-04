const { Pool } = require('pg');
require('dotenv').config();
// import Pool from 'pg';

// interface IDbConnectObject {
//   connectionString?: string;
//   host?: string,
//   port?: string,
//   user?: string,
//   password?: string,
//   database?: string
// }

let dbParams: any = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  };
}

const pool = new Pool(dbParams);
// console.log(pool);
export { pool };
