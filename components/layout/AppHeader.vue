<template>
  <v-app-bar app color="black" dark>
    <NuxtLink to="/">
      <v-img :src="logo" height="50" width="50" class="rounded-circle mx-10" />
    </NuxtLink>
    <v-spacer />
    <div class="d-flex align-center ga-2 pr-4">
      <NuxtLink to="/">
        <v-btn variant="text" color="white">Home</v-btn>
      </NuxtLink>
      <NuxtLink to="/product/">
        <v-btn variant="text" color="white">Menu</v-btn>
      </NuxtLink>
      <NuxtLink to="/login">
        <v-btn variant="text" color="white">Login</v-btn>
      </NuxtLink>
    </div>
  </v-app-bar>
</template>

<script setup>
import logo from "/images/logo_resto.png";
</script>
