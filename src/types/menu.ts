export type Pizza = {
  id: string;
  name: string;
  price: number;
  count?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  pizza_ingredients?: PizzaIngredient[];
};

export type PizzaIngredient = {
  id: string;
  pizza_id: string;
  ingredient_id: string;
  quantity: number;
  user_id: string;
  created_at: string;
  ingredient?: {
    id: string;
    name: string;
    cost_per_unit: number;
  };
};

export type InventoryItem = {
  id: string;
  name: string;
  category_id: string;
  quantity: number;
  unit: string;
  min_stock: number;
  cost_per_unit: number;
  initial_quantity: number;
  user_id: string;
  created_at: string;
  updated_at: string;
};