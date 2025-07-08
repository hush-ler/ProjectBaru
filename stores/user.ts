import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as null | {
      name: string;
      username: string;
      email: string;
      alamat: string;
      divisi: string;
    },
  }),
  actions: {
    setUser(data: any) {
      this.user = data;
    },
    clearUser() {
      this.user = null;
    },
  },
});
