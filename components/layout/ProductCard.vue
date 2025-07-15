<template>
  <v-card :to="`/product/${product.id}`" class="hover:shadow-lg" link>
    <v-card-title class="font-weight-bold bg-black text-white">
      {{ product.name }}
    </v-card-title>
    <v-img
      :src="product.image || '/images/default.png'"
      alt="Gambar Produk"
      height="250"
      class="mb-4 rounded-lg"
      contain
    />
    <v-card-text> {{ product.desc?.slice(0, 50) }}... </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="text">Lihat Detail</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  product: {
    id: number | string;
    name: string;
    desc: string;
    image?: string;
  };
}>();
</script>
