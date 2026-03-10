export function PokemonGridSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 sm:gap-6 md:gap-7 mx-2 my-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4.2] w-full rounded-xl bg-gray-800 animate-shimmer"
          />
        ))}
    </div>
  );
}
