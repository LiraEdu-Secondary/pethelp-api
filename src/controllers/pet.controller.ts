import type { Request, Response } from "express";
import {
  createPet,
  deletePet,
  getAllPets,
  getPetById,
  updatePet,
} from "../services/pet.service";
import { createPetSchema } from "../schemas/pet-schemas";

// Lista todos os pets
export async function listPets(_req: Request, res: Response): Promise<void> {
  try {
    const pets = await getAllPets();
    res.status(200).json(pets);
  } catch (error) {
    console.error("Erro ao buscar pets. ", error);
    res.status(500).json({ error: "Não foi possivel buscar os pets." });
  }
}

// Busca pet por id
export async function getPetByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ error: "ID inválido." });
      return;
    }

    const pet = await getPetById(id);

    if (pet === null) {
      res.status(404).json({ error: "Pet não encontrado" });
      return;
    }

    res.status(200).json(pet);
  } catch (error) {
    console.error("Não foi possível encontrar o pet.");
    res.status(500).json({ error: "Não foi possivel encontrar seu pet." });
  }
}

// Cria pet no banco de dados
export async function createdPetController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const parsedBody = createPetSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({
        error: "Dados Inválidos.",
        details: parsedBody.error.issues,
      });
      return;
    }
    const pet = await createPet(parsedBody.data);
    res.status(201).json({
      message: "Pet cadastrado com sucesso!"
    });
  } catch (error) {
    console.error("Não foi possivel cadastrar o seu pet", error);
    res.status(500).json({ error: "Não foi possivel cadastrar o seu pet." });
  }
}

// Atualiza campos do pet
export async function updatedPetController(
  req: Request,
  res: Response,
): Promise<void> {
  // Converte id para number e valida.
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const parsedBody = createPetSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({
        error: "Dados Inválidos",
        details: parsedBody.error.issues,
      });
      return;
    }

    const pet = await updatePet(id, parsedBody.data);
    res.status(200).json(pet);
  } catch (error) {
    console.error("Não foi possivel atualizar os dados do seu pet.");
    res.status(500).json({
      error: "Não foi possivel atualizar os dados do seu pet.",
    });
  }
}

export async function deletePetController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({
        error: "ID Inválido",
      });
      return;
    }

    const pet = await deletePet(id);

    if (pet === null) {
      res.status(400).json({
        error: "Pet não encontrado.",
      });
      return;
    }

    res.status(204).json({
      message: "Pet deletado com sucesso.",
    });
  } catch (error) {
    console.error("Não foi possivel deletar seu pet.");
    res.status(500).json({
      error: "Não foi possivel deletar seu pet.",
    });
  }
}
