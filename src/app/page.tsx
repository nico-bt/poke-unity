import PokemonGrid from "@/components/PokemonGrid";
import { PokemonGridSkeleton } from "@/components/PokemonGridSkeleton";
import Searchbar from "@/components/Searchbar";
import { Suspense } from "react";

type SearchParams = Promise<{
  query: string | undefined;
  type: string | undefined;
}>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const type = searchParams?.type || "";

  return (
    <main className="w-full">
      <Searchbar />

      <Suspense key={query} fallback={<PokemonGridSkeleton />}>
        <PokemonGrid query={query} type={type} />
      </Suspense>
    </main>
  );
}
