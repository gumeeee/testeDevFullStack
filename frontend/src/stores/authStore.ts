import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";
import type {
  AuthState,
  LoginCredentials,
  LoginResponse,
  User,
} from "../types/auth.types";

interface AuthStoreState extends AuthState {
  loginError: string | null;
  setLoginError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loginError: null,

      setLoginError: (error: string | null) => {
        set({ loginError: error });
      },

      login: async (credentials: LoginCredentials) => {
        set({ loginError: null });

        try {
          const { data } = await api.post<LoginResponse>(
            "/auth/login",
            credentials,
          );

          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("auth_user", JSON.stringify(data.user));

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loginError: null,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Erro ao fazer login";

          set({ loginError: errorMessage });

          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.error("Erro ao fazer logout:", error);
        } finally {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loginError: null,
          });
        }
      },

      checkAuth: () => {
        const token = localStorage.getItem("auth_token");
        const userString = localStorage.getItem("auth_user");

        if (token && userString) {
          try {
            const user = JSON.parse(userString) as User;

            set({
              user,
              token,
              isAuthenticated: true,
            });
          } catch (error) {
            console.error("Erro ao verificar autenticação:", error);
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
