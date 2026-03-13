// Obs:
// url params are in sync with the input
// Then the component uses the query to perform the fetch SSR

"use client";

import { PokemonType } from "@/db/generated/prisma/enums";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const WAITING_TIME_DEBOUNCE = 300;

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = useDebouncedCallback(
    (input: string | null) => updateParam("query", input),
    WAITING_TIME_DEBOUNCE,
  );

  return (
    <div className="flex justify-center w-full p-3 pb-0 gap-2">
      {/* SEARCH BY NAME */}
      <div className="relative w-full sm:w-[380px]">
        <input
          className="peer w-full sm:w-[380px] bg-white p-2 pl-11 border rounded-xl text-gray-500 focus:text-black shadow"
          type="text"
          name="query"
          id="query"
          placeholder="Search by pokemon name"
          defaultValue={searchParams?.get("query") || ""}
          autoComplete="off"
          onChange={(e) => handleInputChange(e.target.value)}
        />

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 peer-focus:opacity-100" />
      </div>

      {/* TYPE SELECT */}
      <select
        className="bg-white border rounded-xl px-3 shadow text-black"
        defaultValue={searchParams?.get("type") || ""}
        onChange={(e) => updateParam("type", e.target.value || null)}
      >
        <option value="">All types</option>
        {Object.values(PokemonType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
