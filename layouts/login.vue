<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <NuxtLink to="/dashboard">
        <v-img
          :src="logo"
          height="50"
          width="50"
          class="rounded-circle mx-10"
        />
      </NuxtLink>
      <NuxtLink to="/product/products">
        <v-btn variant="text" color="white">Product</v-btn>
      </NuxtLink>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import logo from "/images/logo_resto.png";
</script>
