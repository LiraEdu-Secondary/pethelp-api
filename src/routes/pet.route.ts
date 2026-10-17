import { Router } from "express";
import {
  createdPetController,
  deletePetController,
  getPetByIdController,
  listPets,
  updatedPetController,
} from "../controllers/pet.controller";

const petsRouter = Router();

petsRouter.get("/", listPets);

petsRouter.get("/:id", getPetByIdController);

petsRouter.post("/", createdPetController);

petsRouter.put("/:id", updatedPetController);

petsRouter.delete("/:id", deletePetController);

export { petsRouter };
