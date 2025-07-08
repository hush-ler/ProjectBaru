<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400" class="pa-6 elevation-10">
      <v-card-title class="text-h5 font-weight-bold text-center">
        Login
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin" validate-on="submit">
          <v-text-field
            v-model="username"
            label="Username"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            required
          />
          <v-btn block type="submit" color="black" class="mt-4">Login</v-btn>
        </v-form>

        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
          density="compact"
          variant="outlined"
        >
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { navigateTo } from "#app";

const username = ref("");
const password = ref("");
const error = ref("");
const userStore = useUserStore();

// ✅ Typing untuk response dari /api/login
interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    name: string;
    username: string;
    email: string;
    alamat: string;
    divisi: string;
  };
}

const handleLogin = async () => {
  error.value = "";

  try {
    const res = await $fetch<LoginResponse>("/api/login", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
    });

    if (res.success && res.token && res.user) {
      // ✅ Simpan token di localStorage
      localStorage.setItem("token", res.token);

      // ✅ Simpan data user di Pinia
      userStore.setUser({
        name: res.user.name,
        email: res.user.email,
        alamat: res.user.alamat,
        divisi: res.user.divisi,
      });

      // ✅ Arahkan ke dashboard
      await navigateTo("/dashboard");
    } else {
      error.value = res.message || "Login gagal.";
    }
  } catch (err) {
    error.value = "Terjadi kesalahan saat login.";
  }
};
</script>
