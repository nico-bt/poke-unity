"use server";

import { redirect } from "next/navigation";
import * as bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// Hardcoded for this example
// I as a super user Im the one creating admin in db
// In a more complex scenario, diff users could be created with email and pass
const ADMIN_EMAIL = "admin@mail.com";

export async function login(
  prevState: { error: string | null },
  formData: FormData,
) {
  console.log({ prevState });
  const password = formData.get("password")?.toString();

  if (!password) {
    return { error: "Enter password" };
  }

  const adminUser = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!adminUser) {
    return {
      error: "No user in db. Call super admin",
    };
  }

  // Password in db is hashed
  const passwordMatch = await bcrypt.compare(password, adminUser.password);

  if (!passwordMatch) {
    return {
      error: "Wrong password",
    };
  }

  await createSession(adminUser.id, adminUser.email, adminUser.isAdmin);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
