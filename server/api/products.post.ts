import { readFile, writeFile } from "fs/promises";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, desc, category, is_favorite, image_url, created_by } = body;

  if (!desc || !name || !created_by) {
    return {
      success: false,
      message: "Nama dan deskripsi",
    };
  }

  const dataPath = "server/data/products.json";
  const products = JSON.parse(await readFile(dataPath, "utf-8"));

  const newProduct = {
    id: Date.now(),
    name,
    desc,
    category,
    is_favorite: is_favorite === true,
    image: image_url,
    created_by,
  };

  products.push(newProduct);
  await writeFile(dataPath, JSON.stringify(products, null, 2));

  return {
    success: true,
    product: newProduct,
  };
});

// import { readFile, writeFile } from "fs/promises";
// import { join } from "path";
// import formidable from "formidable";
// import { defineEventHandler } from "h3";

// export default defineEventHandler(async (event) => {
//   const form = formidable({
//     multiples: false,
//     uploadDir: "/tmp",
//     keepExtensions: true,
//   });

//   const { fields, files } = await new Promise<{
//     fields: formidable.Fields;
//     files: formidable.Files;
//   }>((resolve, reject) => {
//     form.parse(
//       event.node.req,
//       (err: any, fields: formidable.Fields, files: formidable.Files) => {
//         if (err) reject(err);
//         else resolve({ fields, files });
//       }
//     );
//   });

//   const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
//   console.log(imageFile);
//   // 🔐 Cek imageFile tidak undefined
//   if (!imageFile) {
//     return {
//       success: false,
//       message: "Gambar tidak ditemukan.",
//     };
//   }

//   const originalFilename = imageFile.originalFilename || "image.png";
//   const newFileName = Date.now() + "-" + originalFilename;
//   const publicPath = join("public", "images", newFileName);
//   const fileBuffer = await readFile(imageFile.filepath);

//   await writeFile(publicPath, fileBuffer);

//   const dataPath = "server/data/products.json";
//   const products = JSON.parse(await readFile(dataPath, "utf-8"));

//   const newProduct = {
//     id: Date.now(),
//     name: Array.isArray(fields.name) ? fields.name[0] : fields.name || "",
//     desc: Array.isArray(fields.desc) ? fields.desc[0] : fields.desc || "",
//     image: "/images/" + newFileName,
//     category: Array.isArray(fields.category)
//       ? fields.category[0]
//       : fields.category || "",
//     is_favorite:
//       (Array.isArray(fields.is_favorite)
//         ? fields.is_favorite[0]
//         : fields.is_favorite) === "true",
//     created_by: Array.isArray(fields.created_by)
//       ? fields.created_by[0]
//       : fields.created_by || "",
//   };

//   products.push(newProduct);
//   await writeFile(dataPath, JSON.stringify(products, null, 2));

//   return {
//     success: true,
//     product: newProduct,
//   };
// });
