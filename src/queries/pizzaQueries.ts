import { create } from 'zustand';
import { Pizza } from '@/types/menu';

interface PizzaStore {
  pizzas: Pizza[];
  setPizzas: (pizzas: Pizza[]) => void;
  addPizza: (pizza: Pizza) => void;
  updatePizza: (id: string, updates: Partial<Pizza>) => void;
  deletePizza: (id: string) => void;
}

export const usePizzaStore = create<PizzaStore>((set) => ({
  pizzas: [
    { id: "margherita", name: "Margherita", price: 8 },
    { id: "marinara", name: "Marinara", price: 7 },
    { id: "diavola", name: "Diavola", price: 9 },
    { id: "capricciosa", name: "Capricciosa", price: 10 },
    { id: "quattro-formaggi", name: "4 Formaggi", price: 11 },
  ],
  setPizzas: (pizzas) => set({ pizzas }),
  addPizza: (pizza) => set((state) => ({ pizzas: [...state.pizzas, pizza] })),
  updatePizza: (id, updates) =>
    set((state) => ({
      pizzas: state.pizzas.map((pizza) =>
        pizza.id === id ? { ...pizza, ...updates } : pizza
      ),
    })),
  deletePizza: (id) =>
    set((state) => ({
      pizzas: state.pizzas.filter((pizza) => pizza.id !== id),
    })),
}));