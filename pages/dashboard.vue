<template>
  <v-container class="py-8">
    <v-row justify="space-between" align="center" class="mb-6">
      <h2 class="text-h5 font-weight-bold">Dashboard</h2>
      <v-btn color="error" @click="logout" prepend-icon="mdi-logout">
        Logout
      </v-btn>
    </v-row>

    <v-card elevation="2" class="pa-6 rounded-lg">
      <v-row>
        <v-col cols="12" md="6">
          <p><strong>Nama:</strong> {{ user?.name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p><strong>Alamat:</strong> {{ user?.alamat }}</p>
          <p><strong>Divisi:</strong> {{ user?.divisi }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "login",
  middleware: "auth",
});

const userStore = useUserStore();
const user = userStore.user;

const router = useRouter();

const logout = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    await $fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  localStorage.removeItem("token");
  userStore.clearUser();
  router.push("/login");
};
</script>
