import { readFile } from "fs/promises";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  const data = await readFile("server/data/products.json", "utf-8");
  const products = JSON.parse(data);

  return {
    success: true,
    products,
  };
});
