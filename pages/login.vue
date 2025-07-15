<template>
  <v-container>
    <FormLogin />
  </v-container>
</template>

<script setup>
import FormLogin from "~/components/FormLogin.vue";
definePageMeta({
  middleware: "midlog",
});
</script>
