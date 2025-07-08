import { defineEventHandler, getHeader } from "h3";
import { readFile, writeFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { success: false, message: "Unauthorized" };
  }

  const token = authHeader.split(" ")[1];

  const raw = await readFile("server/data/users.json", "utf-8");
  const users = JSON.parse(raw);

  const userIndex = users.findIndex((u: any) => u.token === token);

  if (userIndex === -1) {
    return { success: false, message: "Token tidak ditemukan" };
  }

  // Hapus token
  delete users[userIndex].token;

  await writeFile("server/data/users.json", JSON.stringify(users, null, 2));

  return { success: true, message: "Logout berhasil" };
});
