"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionType } from "@/lib/session";
import Image from "next/image";
import { actions } from "@/actions";

function Header({ session }: { session: SessionType }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 pt-3 pb-1 bg-black text-white border-b border-gray-600">
      <Link
        className="z-10 cursor-pointer animate-fadeInLong flex gap-1 flex-col items-center"
        href={"/"}
      >
        <Image
          src="/cu-logo.svg"
          alt="Logo"
          width={132}
          height={28}
          className="bg-white p-1"
          priority
        />
        <span className="font-semibold text-[11px] self-center uppercase tracking-widest">
          Home | Pokemons
        </span>
      </Link>

      {!session.isAdmin ? (
        <div className="flex gap-4">
          <Link
            href="/login"
            className={`z-10 hover:text-gray-300 ${
              pathname === "/login" ? " border-b-2" : ""
            }`}
          >
            Admin Login
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 flex-1">
          <div className="mx-auto flex gap-4 items-center">
            <Image src={"/ash.jpg"} height={50} width={50} alt="Ash" />
            {pathname !== "/admin" && (
              <Link
                href={"/admin"}
                className="bg-green-800 hover:bg-green-900 px-4 py-2 rounded"
              >
                Add Card
              </Link>
            )}
          </div>
          <button
            onClick={() => actions.auth.logout()}
            className="hover:text-gray-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Header;
