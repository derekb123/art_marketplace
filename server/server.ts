const app = require("./app");

// load .env data into process.env
require("dotenv").config();

const PORT = process.env.PORT || 8081;
const ENV = process.env.ENV;


app.listen(8081, () => {
  console.log("Server is now running!")
});