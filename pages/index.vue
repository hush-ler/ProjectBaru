<template>
  <v-app>
    <v-main>
      <LayoutHeroSection />
      <v-container class="py-12">
        <h2 class="text-h4 font-weight-bold text-center mb-8 text-deep-orange">
          Menu Favorit Kami
        </h2>
        <v-row align="stretch" justify="center" dense>
          <v-col
            v-for="item in favorites"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            cover
          >
            <ProductCard :product="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";
import ProductCard from "~/components/layout/ProductCard.vue";
import { LayoutHeroSection } from "#components";

const { favorites } = useProducts();
console.log(favorites);
// const { products } = useProducts();
</script>

<style scoped>
.text--secondary {
  color: #6b6b6b;
}
</style>
