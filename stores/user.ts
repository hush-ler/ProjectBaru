import { defineStore } from "pinia";
interface User {
  name: string;
  username: string;
  email: string;
  alamat: string;
  divisi: string;
  photo: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },

  persist: true,
});
