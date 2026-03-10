import PokemonGrid from "@/components/PokemonGrid";
import { PokemonGridSkeleton } from "@/components/PokemonGridSkeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen w-full">
      <Suspense fallback={<PokemonGridSkeleton />}>
        <PokemonGrid />
      </Suspense>
    </main>
  );
}
