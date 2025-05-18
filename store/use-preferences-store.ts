import { create } from "zustand";
import { persist } from "zustand/middleware";

// export const usePreferencesStore = create(
//   persist(
//     () => ({
//       code: "",
//       title: "Untitled",
//       theme: "hyper",
//       darkMode: true,
//       showBackground: true,
//       language: "plaintext",
//       autoDetectLanguage: false,
//       fontSize: 16,
//       fontStyle: "jetBrainsMono",
//       padding: 64,
//     }),
//     {
//       name: "user-preferences",
//     }
//   )
// );

// Persistent: Saves data to localStorage under the key user-preferences, so the state is retained after refreshing/restarting the app.

interface PreferencesState {
  code: string;
  title: string;
  theme: string;
  darkMode: boolean;
  showBackground: boolean;
  language: string;
  autoDetectLanguage: boolean;
  fontSize: number;
  fontStyle: string;
  padding: number;

  // Setters
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
  toggleBackground: () => void;
  setLanguage: (language: string) => void;
  setAutoDetectLanguage: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  setFontStyle: (style: string) => void;
  setPadding: (padding: number) => void;
}

// Create a persistent Zustand store with type safety and update methods
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      code: "",
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: "jetBrainsMono",
      padding: 64,

      // Setters
      setCode: (code) => set({ code }),
      setTitle: (title) => set({ title }),
      setTheme: (theme) => set({ theme }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleBackground: () =>
        set((state) => ({ showBackground: !state.showBackground })),
      setLanguage: (language) => set({ language }),
      setAutoDetectLanguage: (enabled) => set({ autoDetectLanguage: enabled }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontStyle: (style) => set({ fontStyle: style }),
      setPadding: (padding) => set({ padding }),
    }),
    {
      name: "user-preferences", // Key used in localStorage
    }
  )
);
