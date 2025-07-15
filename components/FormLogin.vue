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
import { useAuth } from "~/composables/useAuth";

const username = ref("");
const password = ref("");
const error = ref("");
const { login } = useAuth();

const handleLogin = async () => {
  error.value = "";

  const result = await login({
    username: username.value,
    password: password.value,
  });

  if (!result.success) {
    error.value = result.message ?? "Login gagal.";
  }
};
</script>
