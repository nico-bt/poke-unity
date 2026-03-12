import { PokemonCardFormFieldsSchema } from "@/utils/zodSchema";
import prisma from "./prisma";
import { PokemonType } from "@/db/generated/prisma/enums";

export async function createPokemonCard(data: PokemonCardFormFieldsSchema) {
  return prisma.pokemon.create({ data });
}

export async function getPokemonCards(query: string, type?: string) {
  // if type directly in url
  const validType = Object.values(PokemonType).includes(type as PokemonType)
    ? (type as PokemonType)
    : undefined;

  return prisma.pokemon.findMany({
    orderBy: { created_at: "desc" },
    where: {
      name: { contains: query, mode: "insensitive" },
      ...(type && { type: validType }),
    },
  });
}

export async function findPokemonCardById(id: number) {
  return prisma.pokemon.findUnique({ where: { id: Number(id) } });
}

export async function deletePokemonById(id: number) {
  return prisma.pokemon.delete({ where: { id } });
}
