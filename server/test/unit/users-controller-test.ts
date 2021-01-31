// import { pool } from 
const pool = require("../library/db-pool");
import { getAllUsers } from '../../controllers/users-controller';



//note using client
// jest.mock('pg', () => {
//   const mClient = {
//     connect: jest.fn(),
//     query: jest.fn(),
//     end: jest.fn(),
//   };
//   return { Client: jest.fn(() => mClient) };
// });