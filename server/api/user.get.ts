import { defineEventHandler, getHeader } from "h3";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { success: false, message: "Unauthorized: token tidak ada" };
  }

  const token = authHeader.split(" ")[1];

  // Baca users.json
  const raw = await readFile("server/data/users.json", "utf-8");
  const users = JSON.parse(raw);

  const user = users.find((u: any) => u.token === token);

  if (!user) {
    return {
      success: false,
      message: "Token tidak valid atau user tidak ditemukan",
    };
  }

  return {
    success: true,
    user: {
      name: user.name,
      photo: user.photo,
      username: user.username,
      email: user.email,
      alamat: user.alamat,
      divisi: user.divisi,
    },
  };
});
