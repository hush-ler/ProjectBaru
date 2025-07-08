<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";

definePageMeta({
  middleware: "auth",
  layout: "login", // atau middleware login kamu
});

const nama = ref("");
const deskripsi = ref("");
const image = ref("");
const userStore = useUserStore();
const router = useRouter();

const tambahProduk = async () => {
  const res = await $fetch("/api/products", {
    method: "POST",
    body: {
      name: nama.value,
      desc: deskripsi.value,
      image: image.value,
      created_by: userStore.user.username,
    },
  });
  console.log("Data yang dikirim ke API:", payload);

  if (res.success) {
    alert("Produk berhasil ditambahkan");
    router.push("/product/products");
  } else {
    alert(res.message || "Gagal menambahkan produk");
  }
};
</script>

<template>
  <v-container>
    <v-text-field v-model="nama" label="Nama Produk" />
    <v-textarea v-model="deskripsi" label="Deskripsi" />
    <v-text-field
      v-model="image"
      label="Path Gambar (contoh: /images/pizza.png)"
    />
    <v-btn color="primary" @click="tambahProduk">Tambah Produk</v-btn>
  </v-container>
</template>
