import { PokemonType } from "@/db/generated/prisma/enums";
import z from "zod";

export const pokemonCardFormFieldsSchemma = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  image: z.string().optional(),
  type: z.enum(PokemonType),
  hp: z.number(),
  attack: z.number(),
  weaknessType: z.enum(PokemonType),
  weaknessDamage: z.number(),
  resistanceType: z.enum(PokemonType),
  resistanceQuantity: z.number(),
});

export type PokemonCardFormFieldsSchema = z.infer<
  typeof pokemonCardFormFieldsSchemma
>;
