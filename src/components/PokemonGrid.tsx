import DeleteCardBtn from "@/components/DeleteCardBtn";
import { getPokemonCards } from "@/lib/Pokemon";
import { verifySession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";

async function PokemonGrid() {
  const [cards, session] = await Promise.all([
    getPokemonCards(),
    verifySession(),
  ]);

  const { isAdmin } = session;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 sm:gap-6 md:gap-7 mx-2 my-6">
      {cards.length === 0 && (
        <div className="text-xl text-gray-100 text-center mt-24 col-span-full">
          No cards
        </div>
      )}

      {cards.map((card) => (
        <div key={card.id} className="relative">
          <Link href={`/pokemon/${card.id}`}>
            <Image
              src={card.image || "/no-image.jpg"}
              alt={card.name}
              height={742}
              width={532}
              className="object-cover"
            />

            {!card.image && (
              <div className="absolute flex items-center justify-between top-5 left-5 right-5 text-black z-20 text-xl font-bold">
                <h2 className="capitalize">{card.name}</h2>

                <div>
                  <span className="text-[10px] font-extrabold mr-0.5">HP</span>
                  <span>{card.hp}</span>
                </div>
              </div>
            )}
          </Link>

          {isAdmin && <DeleteCardBtn cardId={card.id} image={card.image} />}
        </div>
      ))}
    </div>
  );
}

export default PokemonGrid;
