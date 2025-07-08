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
        <v-card :to="`/product/${item.id}`" class="hover:shadow-lg" link>
          <v-card-title class="font-weight-bold bg-black text-white">
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>{{ item.category }}</v-card-subtitle>
          <v-card-text> {{ item.desc?.slice(0, 80) }}... </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text">Lihat Detail</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";

const { products } = useProducts();
</script>
