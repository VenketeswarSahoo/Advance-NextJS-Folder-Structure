import { customEncryptedStorage } from "@/lib/utils/customEncryptedStorage";
import type { ApiKey, AuthUser, SyncProcess } from "@/types/auth.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  syncId?: string;
  currentApiKey: {
    id: string;
    storeName: string;
    storeId?: string;
    syncId?: string;
  } | null;
  currentSync: SyncProcess | null;
}

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  login: (user: AuthUser) => void;
  logout: () => void;
  setCurrentApiKey: (key: ApiKey) => void;
  setCurrentSync: (sync: SyncProcess | null) => void;
  addSyncProcess: (process: SyncProcess) => void;
  reset: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  currentApiKey: null,
  currentSync: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setUser: (user) => set({ user, isAuthenticated: !!user }),
        login: (user) =>
          set({ user, isAuthenticated: true, error: null, isLoading: false }),

        logout: () => {
          // 1️⃣ Clear persisted storage
          customEncryptedStorage.removeItem("thoth-auth-store");

          // 2️⃣ Reset store state
          set({
            ...initialState,
          });

          // 3️⃣ Redirect to login page (client-side)
          if (typeof window !== "undefined") {
            // Clear auth_token cookie
            document.cookie = "auth_token=; Max-Age=0; path=/;";
            window.location.href = "/login";
          }
        },

        setCurrentApiKey: (key: ApiKey) =>
          set({
            currentApiKey: {
              id: key.id,
              storeName: key.storeName || "Unnamed Store",
              syncId: key.syncId,
              storeId: key.storeId,
            },
          }),
        setCurrentSync: (currentSync) => set({ currentSync }),
        addSyncProcess: (process) => set({ currentSync: process }),

        reset: () => set(initialState),
      }),
      {
        name: "thoth-auth-store",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          syncId: state.syncId,
          currentApiKey: state.currentApiKey,
        }),
        storage: customEncryptedStorage,
      }
    )
  )
);
