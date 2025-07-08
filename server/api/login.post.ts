import { readFile, writeFile } from "fs/promises";
import { defineEventHandler, readBody } from "h3";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // Baca users.json
  const raw = await readFile("server/data/users.json", "utf-8");
  const users = JSON.parse(raw);

  // Temukan user index
  const userIndex = users.findIndex(
    (u: any) => u.username === username && u.password === password
  );

  if (userIndex === -1) {
    return { success: false, message: "Username atau password salah" };
  }

  // 🔐 Generate token random
  const token = crypto.randomBytes(16).toString("hex");
  users[userIndex].token = token;

  // 💾 Simpan token ke file
  await writeFile("server/data/users.json", JSON.stringify(users, null, 2));

  const user = users[userIndex];

  return {
    success: true,
    token,
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      alamat: user.alamat,
      divisi: user.divisi,
    },
  };
});
