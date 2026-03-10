"use server";

import { PokemonType } from "@/db/generated/prisma/enums";
import { createPokemonCard, deletePokemonById } from "@/lib/Pokemon";
import {
  PokemonCardFormFieldsSchema,
  pokemonCardFormFieldsSchemma,
} from "@/utils/zodSchema";
import { revalidatePath } from "next/cache";
import z from "zod";

export type ActionResponse = {
  success: boolean;
  errors: {
    name?: string;
    type?: string;
    root?: string;
  } | null;
  data?: {
    name: string;
    type: PokemonType;
  };
};

export async function addCard(
  data: PokemonCardFormFieldsSchema,
): Promise<ActionResponse> {
  // Validate input
  const result = pokemonCardFormFieldsSchemma.safeParse(data);

  if (!result.success) {
    // Normalize: just keep the first message for each field instead of an array of messages
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    const normalizedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [
        key,
        value?.[0] ?? "Invalid input",
      ]),
    );

    return {
      success: false,
      errors: normalizedErrors,
      data,
    };
  }

  try {
    await createPokemonCard(result.data);

    revalidatePath("/");

    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      errors: {
        root: "There was an error trying to access the database, please try again",
      },
      data: result.data,
    };
  }
}

export async function deletePokemonCardById(id: number) {
  try {
    await deletePokemonById(id);

    revalidatePath("/", "layout");
    return { success: true, error: "" };
  } catch (error) {
    console.error("Error deleting patient:", error);
    return { success: false, error: "Failed to delete card. Please try again" };
  }
}
