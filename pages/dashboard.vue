<template>
  <v-container class="py-8">
    <v-row justify="space-between" align="center" class="mb-6">
      <h2 class="text-h5 font-weight-bold">Dashboard</h2>
    </v-row>
    <v-card elevation="3" class="pa-6 rounded-xl">
      <v-row no-gutters align="center" class="mb-6">
        <v-col cols="12" md="3" class="d-flex justify-center mb-4 mb-md-0">
          <v-avatar size="120">
            <v-img
              :src="user?.photo || '/images/profile.jpg'"
              alt="Foto Profil"
              cover
            />
          </v-avatar>
        </v-col>

        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" sm="6">
              <p class="text-subtitle-1 font-weight-medium">
                👤 <strong>Nama:</strong> {{ user?.name }}
              </p>
              <p class="text-subtitle-1 font-weight-medium">
                📧 <strong>Email:</strong> {{ user?.email }}
              </p>
              <p class="text-subtitle-1 font-weight-medium">
                🏠 <strong>Alamat:</strong> {{ user?.alamat }}
              </p>
              <p class="text-subtitle-1 font-weight-medium">
                🏢 <strong>Divisi:</strong> {{ user?.divisi }}
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: "login",
  middleware: "auth",
});

const userStore = useUserStore();
const user = userStore.user;
</script>
