import { PokemonCardFormFieldsSchema } from "@/utils/zodSchema";
import prisma from "./prisma";

export async function createPokemonCard(data: PokemonCardFormFieldsSchema) {
  return prisma.pokemon.create({ data });
}

export async function getPokemonCards() {
  return prisma.pokemon.findMany({
    orderBy: { created_at: "desc" },
    // where: {
    //   name: { contains: query, mode: "insensitive" },
    // },
  });
}

export async function findPokemonCardById(id: number) {
  return prisma.pokemon.findUnique({ where: { id: Number(id) } });
}

export async function deletePokemonById(id: number) {
  return prisma.pokemon.delete({ where: { id } });
}
