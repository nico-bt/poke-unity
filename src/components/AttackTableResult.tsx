import { CircleCheck, CircleX } from "lucide-react";
import { Pokemon } from "@/db/generated/prisma/client";

export function AttackTableResult({
  pokemon,
  oponent,
}: {
  pokemon: Pokemon;
  oponent: Pokemon;
}) {
  // Initial attack
  let attackModified = pokemon.attack;

  if (pokemon.type === oponent.weaknessType && oponent.weaknessDamage != null) {
    attackModified = attackModified * oponent.weaknessDamage;
  }

  if (
    pokemon.type === oponent.resistanceType &&
    oponent.resistanceQuantity != null
  ) {
    attackModified = attackModified - oponent.resistanceQuantity;
  }

  return (
    <div className="mt-2 overflow-x-auto flex justify-center w-full mx-auto col-span-3">
      <table className="border border-gray-700">
        <thead className="bg-gray-900 text-gray-400 uppercase text-xs tracking-wider text-center">
          <tr>
            <th className="px-4 py-3 border border-gray-700">Card</th>
            <th className="px-4 py-3 border border-gray-700">Attack To</th>
            <th className="px-4 py-3 border border-gray-700">
              Original Attack
            </th>
            <th className="px-4 py-3 border border-gray-700">
              Attack Modified
            </th>
            <th className="px-4 py-3 border border-gray-700">Succeed</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-gray-700 text-center">
            <td className="px-4 py-3 border border-gray-700">{pokemon.name}</td>
            <td className="px-4 py-3 border border-gray-700">
              {oponent.name} ({oponent.hp} HP)
            </td>
            <td className="px-4 py-3 border border-gray-700">
              {pokemon.attack}
            </td>
            <td className="px-4 py-3 border border-gray-700">
              {attackModified}
            </td>
            <td className="px-4 py-3 border border-gray-700 flex gap-3 items-center justify-center flex-wrap">
              {oponent.hp} - {attackModified}
              {oponent.hp - attackModified <= 0 ? (
                <CircleCheck className="text-green-500 text-2xl" />
              ) : (
                <CircleX className="text-red-500 size-8" />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
