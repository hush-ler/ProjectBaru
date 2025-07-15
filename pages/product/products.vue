<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";
import ProductCard from "~/components/layout/ProductCard.vue";

definePageMeta({
  middleware: "auth",
  layout: "login",
});

const { userProducts, pending, error } = useProducts();
</script>

<template>
  <v-container>
    <NuxtLink to="/product/addProduct">
      <v-btn variant="outlined" color="primary">Tambah Menu</v-btn>
    </NuxtLink>
  </v-container>
  <v-container>
    <h2 class="text-h5 mb-4">Menu Milik Anda</h2>
    <div v-if="pending">
      <v-alert type="info" color="blue-lighten-4">Memuat menu...</v-alert>
    </div>

    <div v-if="error">
      <v-alert type="error" color="red-lighten-3"
        >Gagal memuat data menu.</v-alert
      >
    </div>

    <div v-if="!pending && userProducts.length === 0">
      <v-alert type="warning" color="yellow-lighten-4">
        Anda belum memiliki menu.
      </v-alert>
    </div>

    <v-row v-if="userProducts.length > 0">
      <v-col
        v-for="item in userProducts"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
