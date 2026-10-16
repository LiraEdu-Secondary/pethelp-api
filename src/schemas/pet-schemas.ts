import z from "zod";

export const createPetSchema = z.object({
  name: z.string().trim().min(1),
  specie: z.enum(["cat", "dog", "other"]),
  descricao: z.string().trim().min(1),
  city: z.string().trim().min(1),
  contact: z.string().trim().min(1),
  dateDisappearance: z.iso.datetime().transform((value) => new Date(value)),
  status: z.enum(["lost", "found"]),
});

export type CreatePetSchema = z.input<typeof createPetSchema>;

export type CreatePetData = z.output<typeof createPetSchema>;
