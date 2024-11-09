import app from './app.js';
import initializeDatabase from './config/initdb.js';
import dotenv from "dotenv"

const PORT = process.env.PORT || 11000;

dotenv.config({
  path : "./.env"
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  initializeDatabase()
});
