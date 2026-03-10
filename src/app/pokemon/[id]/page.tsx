import { notFound } from "next/navigation";
import { findPokemonCardById, getPokemonCards } from "@/lib/Pokemon";
import { VersusGrid } from "@/components/VersusGrid";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [pokemon, allPokemons] = await Promise.all([
    findPokemonCardById(Number(id)),
    getPokemonCards(),
  ]);

  if (!pokemon) notFound();

  return <VersusGrid pokemon={pokemon} allPokemons={allPokemons} />;
}
