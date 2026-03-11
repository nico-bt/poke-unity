import { PokemonType } from "@/db/generated/prisma/enums";
import z from "zod";

export const pokemonCardFormFieldsSchemma = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  image: z.string().optional(),
  type: z.enum(PokemonType),
  hp: z.number().min(0, { message: "Enter a positive number" }),
  attack: z.number().min(0, { message: "Enter a positive number" }),
  weaknessType: z.enum(PokemonType),
  weaknessDamage: z.number().min(0, { message: "Enter a positive number" }),
  resistanceType: z.enum(PokemonType).optional(),
  resistanceQuantity: z
    .number()
    .min(0, { message: "Enter a positive number" })
    .optional(),
});

export type PokemonCardFormFieldsSchema = z.infer<
  typeof pokemonCardFormFieldsSchemma
>;
