"use client";

import { Pokemon } from "@/db/generated/prisma/client";
import Image from "next/image";
import OponentCombobox from "@/components/OponentCombobox";
import { useMemo, useState } from "react";

export const VersusGrid = ({
  pokemon,
  allPokemons,
}: {
  pokemon: Pokemon;
  allPokemons: Pokemon[];
}) => {
  const [selectedOponentId, setSelectedOponentId] = useState<number | null>(
    null,
  );

  const oponent = useMemo(
    () => allPokemons.find((item) => item.id === selectedOponentId),
    [selectedOponentId, allPokemons],
  );

  return (
    <div className="grid grid-cols-[1fr_75px_1fr] mt-4 gap-x-2 md:gap-x-10 px-4 gap-y-3">
      {/* Row 1 */}
      <div />
      <div />
      <OponentCombobox
        pokemons={allPokemons}
        setSelectedOponentId={setSelectedOponentId}
      />

      {/* Row 2 */}
      <Image
        height={1024}
        width={734}
        className="mx-auto w-full max-w-[475px]"
        src={pokemon.image || "/no-image.jpg"}
        alt={pokemon.name}
      />

      <span className="font-semibold text-lg text-red-600 grid place-items-center">
        VS
      </span>

      {oponent && (
        <Image
          height={1024}
          width={734}
          className="mx-auto w-full max-w-[475px] object-cover"
          src={oponent.image || "/no-image.jpg"}
          alt={oponent.name}
        />
      )}
    </div>
  );
};
