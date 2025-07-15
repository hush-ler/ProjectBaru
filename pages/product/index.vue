<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">List Produk</h2>
    <v-row>
      <v-col
        v-for="item in products"
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

<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";
import ProductCard from "~/components/layout/ProductCard.vue";

const { products } = useProducts();
</script>
