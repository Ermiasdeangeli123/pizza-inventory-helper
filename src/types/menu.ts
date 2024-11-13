export type Pizza = {
  id: string;
  name: string;
  price: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  pizza_ingredients?: PizzaIngredient[];
  count?: number; // For UI purposes
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
  category: string;
  category_id?: string;
  quantity: number;
  unit: string;
  minStock: number;
  min_stock?: number;
  costPerUnit: number;
  cost_per_unit?: number;
  initialQuantity: number;
  initial_quantity?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
};
