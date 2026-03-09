import prisma from "@/lib/prisma";

export default async function Home() {
  const cards = await prisma.pokemon.findMany({});

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {cards.map((card) => (
          <div key={card.id}>{card.name}</div>
        ))}
      </main>
    </div>
  );
}
