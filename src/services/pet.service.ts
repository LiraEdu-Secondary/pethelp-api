import { prisma } from "../lib/prisma";
import type { CreatePetData, UpdatePetData } from "../schemas/pet-schemas";

// Retorna todos os pets cadastrados no banco de dados
export async function getAllPets(skip: number, limit: number) {
  return prisma.pet.findMany({
    skip,
    take: limit,
    orderBy: { id: "asc" },
  });
}

// Busca um pet especifico por id
export async function getPetById(id: number) {
  return prisma.pet.findUnique({
    where: { id },
  });
}

// Cria pet no banco de dados
export async function createPet(data: CreatePetData) {
  return prisma.pet.create({
    data: {
      ...data,
      status: "lost"
    }
  });
}

// Atualiza campos do pet
export async function updatePet(id: number, data: UpdatePetData) {
  return prisma.pet.update({
    where: { id },
    data,
  });
}

export async function deletePet(id: number) {
  return prisma.pet.delete({
    where: { id },
  });
}
