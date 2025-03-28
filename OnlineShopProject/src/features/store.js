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

export const useAuthStore = create(persist((set, get) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    return {
        user: null,
        users: storedUsers,
        orders: storedOrders,
        register: (newUser) => {
            const { users } = get();
            const userExists = users.some((user) => user.username === newUser.username || user.email === newUser.email);

            if (userExists) {
                alert("Пользователь с таким логином или email уже существует!");
                return;
            }

            const updatedUsers = [...users, { ...newUser, cart: [], favorites: [], orders: [] }];
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            set({ users: updatedUsers });
        },
        login: (username, password) => {
            const { users } = get();
            const foundUser = users.find((user) => user.username === username && user.password === password);

            if (!foundUser) {
                alert("Неправильный логин или пароль!");
                return;
            }

            set({ user: foundUser });
        },
        logout: () => {
            set({ user: null });
        },
        addOrder: (orderData) => {
            const { user, orders } = get();
            if (user) {
                const newOrder = { ...orderData, userId: user.id, orderId: orders.length + 1, status: "pending" };
                const updatedOrders = [...orders, newOrder];
                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                set({ orders: updatedOrders });

                return newOrder;
            }
            return null;
        },
        getUserOrders: () => {
            const { user, orders } = get();
            if (user) {
                return orders.filter((order) => order.userId === user.id);
            }
            return [];
        },
    };
}, { name: "auth-store" }));
