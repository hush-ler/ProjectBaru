<script setup>
import { useProducts } from "~/composables/useProducts";

definePageMeta({
  middleware: "auth",
  layout: "login",
});

const { nama, deskripsi, kategori, favorite, imageUrl, tambahProduk } =
  useProducts();
</script>

<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 100vh"
  >
    <v-card
      class="pa-6 rounded-xl elevation-10"
      max-width="600"
      width="100%"
      style="background-color: #fafafa"
    >
      <v-card-title class="text-h5 font-weight-bold mb-2">
        Tambah Menu Baru
      </v-card-title>
      <v-card-subtitle class="mb-6 text-body-2 text-grey-darken-1">
        Silakan isi detail produk dengan lengkap
      </v-card-subtitle>

      <v-form>
        <v-text-field
          v-model="nama"
          label="Nama Produk"
          prepend-inner-icon="mdi-tag"
          variant="outlined"
          class="mb-4"
          density="comfortable"
          required
        />

        <v-textarea
          v-model="deskripsi"
          label="Deskripsi"
          prepend-inner-icon="mdi-text"
          variant="outlined"
          class="mb-4"
          rows="3"
          auto-grow
          required
        />

        <v-select
          v-model="kategori"
          label="Kategori"
          :items="['Makanan', 'Minuman']"
          prepend-inner-icon="mdi-silverware-fork-knife"
          variant="outlined"
          class="mb-4"
          required
        />

        <v-select
          v-model="favorite"
          label="Favorit?"
          :items="[
            { title: 'Favorit', value: true },
            { title: 'Tidak', value: false },
          ]"
          prepend-inner-icon="mdi-star"
          variant="outlined"
          class="mb-4"
          required
        />

        <v-text-field
          v-model="imageUrl"
          label="Link Gambar"
          prepend-inner-icon="mdi-image"
          variant="outlined"
          class="mb-4"
          required
        />

        <v-img
          v-if="imageUrl"
          :src="imageUrl"
          max-height="200"
          class="mb-6 rounded-lg"
          cover
        />

        <v-btn
          color="black"
          block
          size="large"
          class="text-none font-weight-bold"
          @click="tambahProduk"
        >
          Simpan Produk
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
