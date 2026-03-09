import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

type SessionPayload = {
  userId: number;
  email: string;
  isAdmin: boolean;
  expiresAt: Date;
};

export type SessionType = {
  userId: number | undefined;
  email: string | undefined;
  isAdmin: boolean;
};

export async function createSession(
  userId: number,
  email: string,
  isAdmin: boolean,
) {
  const expiresAt = new Date(Date.now() + SEVEN_DAYS);
  const sessionJWT = await encrypt({
    userId,
    email,
    isAdmin,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", sessionJWT, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie)) as SessionPayload;

  if (!session?.userId) {
    return {
      isAdmin: false,
      userId: undefined,
      email: undefined,
    } as SessionType;
  }

  return {
    isAdmin: session.isAdmin,
    userId: session.userId,
    email: session.email,
  } as SessionType;
});
