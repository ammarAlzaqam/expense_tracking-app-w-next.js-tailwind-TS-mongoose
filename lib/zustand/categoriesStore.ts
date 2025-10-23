import { create } from "zustand";

interface Category {
  _id: string;
  name: string;
  slug: string;
}
interface UserState {
  categories: Category[] | null;
  setCategories: (categories: Category[] | null) => void;
  clearCategories: () => void;
}
export const useCategoriesStore = create<UserState>((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
  clearCategories: () => set({ categories: null }),
}));
