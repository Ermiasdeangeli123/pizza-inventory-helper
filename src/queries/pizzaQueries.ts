import { create } from 'zustand';
import { Pizza } from '@/types/menu';
import { toast } from "sonner";

interface PizzaStore {
  pizzas: Pizza[];
  setPizzas: (pizzas: Pizza[]) => void;
  addPizza: (pizza: Pizza) => void;
  updatePizza: (id: string, updates: Partial<Pizza>) => void;
  deletePizza: (id: string) => void;
  updateSales: (id: string, count: number) => void;
}

export const usePizzaStore = create<PizzaStore>((set) => ({
  pizzas: [
    { 
      id: "margherita", 
      name: "Margherita", 
      price: 8,
      ingredients: [
        { ingredientId: "flour", quantity: 0.25 },
        { ingredientId: "mozzarella", quantity: 0.2 },
        { ingredientId: "tomatoes", quantity: 0.15 },
        { ingredientId: "oil", quantity: 0.02 },
      ]
    },
    { 
      id: "marinara", 
      name: "Marinara", 
      price: 7,
      ingredients: [
        { ingredientId: "flour", quantity: 0.25 },
        { ingredientId: "tomatoes", quantity: 0.15 },
        { ingredientId: "oil", quantity: 0.02 },
      ]
    },
    { 
      id: "diavola", 
      name: "Diavola", 
      price: 9,
      ingredients: [
        { ingredientId: "flour", quantity: 0.25 },
        { ingredientId: "mozzarella", quantity: 0.2 },
        { ingredientId: "tomatoes", quantity: 0.15 },
        { ingredientId: "salami", quantity: 0.1 },
        { ingredientId: "oil", quantity: 0.02 },
      ]
    },
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
  updateSales: (id, count) => {
    set((state) => ({
      pizzas: state.pizzas.map((pizza) =>
        pizza.id === id ? { ...pizza, count: (pizza.count || 0) + count } : pizza
      ),
    }));
    toast.success("Vendita registrata con successo");
  },
}));