"use client";

import { useForm } from "react-hook-form";
import {
  PokemonCardFormFieldsSchema,
  pokemonCardFormFieldsSchemma,
} from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { uploadImage } from "@/supabase/storage/client";
import toast from "react-hot-toast";
import { FileImgInput } from "./FileImgInput";
import { actions } from "@/actions";
import { PokemonType } from "@/db/generated/prisma/enums";
import { Loader2 } from "lucide-react";

export const AddCardForm = () => {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PokemonCardFormFieldsSchema>({
    resolver: zodResolver(pokemonCardFormFieldsSchemma),
    defaultValues: {
      name: "",
      image: "",
      hp: 60,
      attack: 10,
      type: "Colorless",
      resistanceType: "Colorless",
      resistanceQuantity: 0,
      weaknessType: "Colorless",
      weaknessDamage: 2,
    },
  });

  const onSubmit = async (data: PokemonCardFormFieldsSchema) => {
    if (imageFile) {
      const { imageUrl, error } = await uploadImage({
        file: imageFile,
        bucket: "cardImage",
      });

      if (error) {
        console.error(error);
        toast.error(error);
        return;
      }

      data.image = imageUrl;
    }

    const result = await actions.pokemon.addCard(data);

    // set the server error response to local state managed by react-hook-form (setError)
    if (!result.success && result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message });
      });
    }

    if (result.success) {
      router.push("/");
      toast.success("Pokemon added");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[600px] mx-auto space-y-5 p-6 bg-black mt-8 mb-24 border border-gray-800 rounded-lg relative"
      noValidate
      autoComplete="off"
    >
      <h2 className="text-lg border-b border-gray-400 [font-variant:small-caps] pb-1">
        Add new card
      </h2>
      {/* GENERAL ERROR */}
      {/* (named "root" both in react-hook-form and in the returned errors.root in the addPatient action) */}
      {errors?.root && (
        <div className="text-red-500 border rounded-md px-4 py-6">
          {errors.root.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* NAME */}
        <div>
          <label htmlFor="name" className="block">
            Name:
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder=""
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
            style={errors?.name && { border: "2px solid red" }}
          />

          {errors.name && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* TYPE */}
        <div>
          <label htmlFor="type" className="block">
            Type:
          </label>
          <select
            {...register("type")}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 p-3 bg-black"
            style={errors?.type && { border: "2px solid red" }}
          >
            {Object.values(PokemonType).map((type) => (
              <option key={type} value={type} className="bg-gray-900">
                {type}
              </option>
            ))}
          </select>

          {errors.type && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* HP */}
        <div>
          <label htmlFor="hp" className="block">
            HP:
          </label>
          <input
            {...register("hp", { valueAsNumber: true })}
            id="hp"
            type="number"
            min={0}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
            style={errors?.hp && { border: "2px solid red" }}
          />
          {errors.hp && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.hp.message}
            </p>
          )}
        </div>

        {/* ATTACK */}
        <div>
          <label htmlFor="attack" className="block">
            Attack:
          </label>
          <input
            {...register("attack", { valueAsNumber: true })}
            id="attack"
            type="number"
            min={0}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
            style={errors?.attack && { border: "2px solid red" }}
          />
          {errors.attack && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.attack.message}
            </p>
          )}
        </div>

        {/* WEAKNESS TYPE */}
        <div>
          <label htmlFor="weaknessType" className="block">
            Weakness Type:
          </label>
          <select
            {...register("weaknessType")}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 p-3 bg-black"
            style={errors?.weaknessType && { border: "2px solid red" }}
          >
            {Object.values(PokemonType).map((type) => (
              <option key={type} value={type} className="bg-gray-900">
                {type}
              </option>
            ))}
          </select>
          {errors.weaknessType && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.weaknessType.message}
            </p>
          )}
        </div>

        {/* WEAKNESS DAMAGE */}
        <div>
          <label htmlFor="weaknessDamage" className="block">
            Weakness Damage x:
          </label>
          <input
            {...register("weaknessDamage", { valueAsNumber: true })}
            id="weaknessDamage"
            type="number"
            min={0}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
            style={errors?.weaknessDamage && { border: "2px solid red" }}
          />
          {errors.weaknessDamage && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.weaknessDamage.message}
            </p>
          )}
        </div>

        {/* RESISTANCE TYPE */}
        <div>
          <label htmlFor="resistanceType" className="block">
            Resistance Type:
          </label>
          <select
            {...register("resistanceType", {
              setValueAs: (value) => (value === "" ? undefined : value),
            })}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 p-3 bg-black"
            style={errors?.resistanceType && { border: "2px solid red" }}
          >
            <option key={"none"} value={""} className="bg-gray-900">
              {"-"}
            </option>
            {Object.values(PokemonType).map((type) => (
              <option key={type} value={type} className="bg-gray-900">
                {type}
              </option>
            ))}
          </select>
          {errors.resistanceType && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.resistanceType.message}
            </p>
          )}
        </div>

        {/* RESISTANCE QUANTITY */}
        <div>
          <label htmlFor="resistanceQuantity" className="block">
            Resistance Quantity:
          </label>
          <input
            {...register("resistanceQuantity", { valueAsNumber: true })}
            id="resistanceQuantity"
            type="number"
            min={0}
            className="mt-1 text-lg block w-full rounded-md border border-gray-300 px-3 py-2"
            style={errors?.resistanceQuantity && { border: "2px solid red" }}
          />
          {errors.resistanceQuantity && (
            <p className="text-sm text-red-500 text-center mt-1">
              {errors.resistanceQuantity.message}
            </p>
          )}
        </div>
      </div>

      {/* IMAGE */}
      <FileImgInput setImageFile={setImageFile} isSubmitting={isSubmitting} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="ml-auto flex mt-12 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Loading..." : "Add Card"}
      </button>

      {/* Loading OVERLAY */}
      {isSubmitting && (
        <div className="inset-0 grid place-items-center z-20 absolute bg-gray-800 opacity-80 rounded-lg">
          <Loader2 className="animate-spin text-red-600 h-12 w-12" />
        </div>
      )}
    </form>
  );
};
