import z from "zod";

export const petFieldSchema = z.object({
  name: z.string().trim().min(1),
  specie: z.enum(["cat", "dog", "other"]),
  descricao: z.string().trim().min(1),
  city: z.string().trim().min(1),
  contact: z.string().trim().min(1),
  dateDisappearance: z.iso.datetime().transform((value) => new Date(value)),
});

export const createPetSchema = petFieldSchema;

export const updatePetSchema = petFieldSchema.extend({
  status: z.enum(["lost", "found"]),
});


// Validação de paginação
export const listPetsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreatePetSchema = z.input<typeof createPetSchema>;

export type CreatePetData = z.output<typeof createPetSchema>;

export type UpdatePetData = z.output<typeof updatePetSchema>;
