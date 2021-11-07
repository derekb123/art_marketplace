import { Pool } from 'pg';
require('dotenv').config();

let dbParams: any = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} 
// else if (process.env.PG_AWS_URI) {
//   dbParams.connectionString = process.env.PG_AWS_URI
// } 
else {
  dbParams = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  };
}

const pool = new Pool({connectionString: process.env.PG_AWS_URI,
  ssl: {
    rejectUnauthorized: false
  }
});
// console.log(pool);
export { pool };
