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

      <template v-slot:append>
        <NuxtLink to="/dashboard">
          <v-btn variant="text" color="white">Profil</v-btn>
        </NuxtLink>
        <NuxtLink to="/product/products">
          <v-btn variant="text" color="white">Menu</v-btn>
        </NuxtLink>
        <v-btn
          variant="text"
          color="white"
          @click="logout"
          prepend-icon="mdi-logout"
        >
          Logout
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import logo from "/images/logo_resto.png";
import { useAuth } from "~/composables/useAuth";

const { logout } = useAuth();
</script>
