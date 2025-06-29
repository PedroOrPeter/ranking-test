import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
  console.log(`Servidor online: http://localhost:${PORT}`);
});