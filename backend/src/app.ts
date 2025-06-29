import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Servidor rodando com Node + TypeScript 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor online: http://localhost:${PORT}`);
});
