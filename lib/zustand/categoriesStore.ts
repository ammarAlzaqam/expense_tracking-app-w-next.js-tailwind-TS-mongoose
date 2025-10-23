import { create } from "zustand";

interface Category {
  _id: string;
  name: string;
  slug: string;
}
interface UserState {
  categories: Category[] | null;
  setCategories: (categories: Category[] | null) => void;
  addCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  editCategory: (category: Category) => void;
  clearCategories: () => void;
}
export const useCategoriesStore = create<UserState>((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({
      categories: [category, ...(state.categories || [])],
    })),
  removeCategory: (category) =>
    set((state) => ({
      categories: state.categories?.filter((c) => c.slug !== category.slug),
    })),
  editCategory: (category) =>
    set((state) => ({
      categories: state.categories?.map((c) =>
        c.slug === category.slug ? category : c
      ),
    })),
  clearCategories: () => set({ categories: null }),
}));
