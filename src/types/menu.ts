export type Pizza = {
  id: string;
  name: string;
  price: number;
  count?: number;
  ingredients: PizzaIngredient[];
};

export type PizzaIngredient = {
  ingredientId: string;
  quantity: number;
};