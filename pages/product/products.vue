<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "~/stores/user";
import { useProducts } from "~/composables/useProducts";

definePageMeta({
  middleware: "auth",
  layout: "login", // atau middleware login kamu
});

// Ambil user dari store
const userStore = useUserStore();
const user = userStore.user;

// Ambil semua produk
const { products } = useProducts();

// Filter produk yang dibuat oleh user login
const userProducts = computed(() => {
  if (!user?.username) return [];

  return products.value.filter(
    (product) => product.created_by === user.username
  );
});
</script>

<template>
  <v-container>
    <h2 class="text-h5 mb-4">Produk Milik Anda</h2>
    <NuxtLink to="/product/addProduct">
      <v-btn variant="outlined" color="primary">Tambah Produk</v-btn>
    </NuxtLink>
    <!-- Loading -->
    <!-- <div v-if="pending">
      <v-alert type="info" color="blue-lighten-4">Memuat produk...</v-alert>
    </div> -->

    <!-- Error -->
    <!-- <div v-if="error">
      <v-alert type="error" color="red-lighten-3"
        >Gagal memuat data produk.</v-alert
      >
    </div> -->

    <!-- Tidak ada produk -->
    <!-- <div v-if="!pending && userProducts.length === 0">
      <v-alert type="warning" color="yellow-lighten-4">
        Anda belum memiliki produk.
      </v-alert>
    </div> -->

    <!-- Produk milik user -->
    <v-row>
      <v-col
        v-for="product in userProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mb-4 rounded-xl" elevation="6">
          <v-img :src="product.image" height="200px" cover></v-img>
          <v-card-title class="text-subtitle-1">{{
            product.name
          }}</v-card-title>
          <v-card-subtitle
            >Rp {{ product.price.toLocaleString() }}</v-card-subtitle
          >
          <v-card-text>{{ product.desc }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
