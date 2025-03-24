import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFilters = create((set) => ({
    type: 'all',
    setType: (type) => set({ type }),
}));

export const useStoreProject = create(persist((set) => ({
    cart: [],
    favorites: [],
    addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
    addToFavorite: (product) =>
        set((state) => ({ favorites: [...state.favorites, product] })),
    removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter(item => item.id !== productId) })),
    removeFromFavorites: (productId) =>
        set((state) => ({ favorites: state.favorites.filter(item => item.id !== productId) })),
}), { name: "store" }));
