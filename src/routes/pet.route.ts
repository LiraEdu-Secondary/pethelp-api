import { Router } from "express";
import {
  createdPetController,
  getPetByIdController,
  listPets,
  updatedPet,
} from "../controllers/pet.controller";

const petsRouter = Router();

petsRouter.get("/", listPets);

petsRouter.get("/:id", getPetByIdController);

petsRouter.post("/", createdPetController);

petsRouter.put("/:id", updatedPet);

export { petsRouter };
