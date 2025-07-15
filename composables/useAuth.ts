// composables/useAuth.ts
import { useUserStore } from "~/stores/user";
import { navigateTo } from "#app";

interface LoginPayload {
  username: string;
  password: string;
}

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
    photo: string;
  };
}

export function useAuth() {
  const userStore = useUserStore();

  const login = async (
    payload: LoginPayload
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await $fetch<LoginResponse>("/api/login", {
        method: "POST",
        body: payload,
      });

      if (res.success && res.token && res.user) {
        localStorage.setItem("token", res.token);
        userStore.setUser(res.user);
        await navigateTo("/dashboard");
        return { success: true };
      } else {
        return { success: false, message: res.message || "Login gagal." };
      }
    } catch {
      return { success: false, message: "Terjadi kesalahan saat login." };
    }
  };
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
    navigateTo("/login");
  };
  return {
    login,
    logout,
  };
}
