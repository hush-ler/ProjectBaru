<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card v-if="product" class="pa-4 elevation-4 rounded-xl">
          <v-img
            :src="product.image || '/images/default.png'"
            alt="Gambar Produk"
            height="250"
            class="mb-4 rounded-lg"
            contain
          ></v-img>

          <v-card-title class="text-h5 font-weight-bold text-primary">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="mb-3 text-black">
            Kategori: {{ product.category || "Bukan Makanan dan Minuman" }} ({{
              product.is_favorite ? "Favorit" : "Bukan Favorit"
            }})
          </v-card-subtitle>

          <v-card-text class="text-body-1">
            <p>{{ product.desc }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="$router.back()" variant="tonal">
              Kembali
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="error" variant="outlined" class="mt-4">
          Produk tidak ditemukan.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useProducts } from "~/composables/useProducts";

const { products } = useProducts();

const route = useRoute();
const productId = Number(route.params.id);

const product = computed(
  () => products.value.find((p) => p.id === productId) || null
);
</script>
