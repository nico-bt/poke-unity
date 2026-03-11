"use client";

import { deletePokemonCardById } from "@/actions/pokemon";
import { deleteImage } from "@/supabase/storage/client";
import { Loader2, TrashIcon } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";

function DeleteCardBtn({
  cardId,
  image,
}: {
  cardId: number;
  image: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: number) => {
    startTransition(async () => {
      if (image) {
        deleteImage(image);
      }
      const result = await deletePokemonCardById(id);

      if (result.error) {
        toast.error(result.error);
      }

      if (result.success) {
        toast.success("Pokemon deleted successfully", { icon: "🗑️" });
      }
    });
  };

  return (
    <>
      {isPending ? (
        <div className="top-0 bottom-0 w-full grid place-items-center z-20 absolute bg-gray-800 opacity-80 rounded-xl">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => handleDelete(cardId)}
          aria-label="Delete this Pokémon card"
          className={`cursor-pointer absolute bottom-2 right-2 h-8 w-8 rounded-full p-1.5 bg-white text-black border border-red-700
        hover:bg-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <TrashIcon className="h-full w-full" />
        </button>
      )}
    </>
  );
}

export default DeleteCardBtn;
