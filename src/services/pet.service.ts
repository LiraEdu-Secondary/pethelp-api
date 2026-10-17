import { prisma } from "../lib/prisma";
import type { CreatePetData } from "../schemas/pet-schemas";

// Retorna todos os pets cadastrados no banco de dados
export async function getAllPets() {
  return prisma.pet.findMany({
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
  return prisma.pet.create({ data });
}

// Atualiza campos do pet
export async function updatePet(id: number, data: CreatePetData) {
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
