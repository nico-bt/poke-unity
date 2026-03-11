"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-xl mt-12">
        {" "}
        Ups... Something went wrong!
      </h2>

      {error.message && <p className="text-center"> {error.message} </p>}

      <Link
        href={"/"}
        className="underline underline-offset-6 my-4 font-bold text-lg text-center bg-red text-white tracking-wider h-auto"
      >
        Back Home
      </Link>
    </main>
  );
}
