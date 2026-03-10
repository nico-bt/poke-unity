import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Pokemon } from "@/db/generated/prisma/client";
import Image from "next/image";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await prisma.pokemon.findUnique({
    where: { id: Number(id) },
  });

  if (!pokemon) notFound();

  return <PokemonDetail pokemon={pokemon} />;
}

// components/PokemonDetail.tsx
export const PokemonDetail = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="grid grid-cols-3">
        <Image
          height={1024}
          width={734}
          src={pokemon.image || "/no-image.jpg"}
          alt={pokemon.name}
        />
      </div>
      <div>VS</div>
    </div>
  );
};
