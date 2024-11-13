export type Pizza = {
  id: string;
  name: string;
  price: number;
  count?: number;
  ingredients: PizzaIngredient[];
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  pizza_ingredients?: any[];
};

export type PizzaIngredient = {
  ingredientId: string;
  quantity: number;
};