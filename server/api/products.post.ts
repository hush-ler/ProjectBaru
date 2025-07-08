import { readFile, writeFile } from "fs/promises";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Body diterima di API:", body);
  // Cek validasi sederhana
  if (!body.name || !body.desc || !body.image || !body.created_by) {
    return { success: false, message: "Data tidak lengkap" };
  }

  // Baca file json lama
  const filePath = "server/data/products.json";
  const fileContent = await readFile(filePath, "utf-8");
  const products = JSON.parse(fileContent);

  // Buat produk baru
  const newProduct = {
    id: Date.now(), // ID unik
    name: body.name,
    desc: body.desc,
    image: body.image,
    created_by: body.created_by,
  };

  products.push(newProduct);

  // Simpan kembali ke file
  await writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");

  return {
    success: true,
    message: "Produk berhasil ditambahkan",
    product: newProduct,
  };
});
