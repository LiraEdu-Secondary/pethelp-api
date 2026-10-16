import express from "express";
import { petsRouter } from "./routes/pet.route.js";

const app = express();
const PORT = "3000";

app.use(express.json());

app.use("/pets", petsRouter);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
