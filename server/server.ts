import { app } from "./app";
require('dotenv').config();

const PORT = process.env.SERVERPORT || 8081;


app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}!`)
});