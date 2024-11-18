import { BaseTable } from './base';

export interface PizzasTable extends BaseTable {
  Row: {
    id: string;
    name: string;
    price: number;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    name: string;
    price: number;
    user_id: string;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    name?: string;
    price?: number;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [];
}

export interface PizzaIngredientsTable extends BaseTable {
  Row: {
    id: string;
    pizza_id: string;
    ingredient_id: string;
    quantity: number;
    user_id: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    pizza_id: string;
    ingredient_id: string;
    quantity: number;
    user_id: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    pizza_id?: string;
    ingredient_id?: string;
    quantity?: number;
    user_id?: string;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "pizza_ingredients_ingredient_id_fkey";
      columns: ["ingredient_id"];
      isOneToOne: false;
      referencedRelation: "inventory";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "pizza_ingredients_pizza_id_fkey";
      columns: ["pizza_id"];
      isOneToOne: false;
      referencedRelation: "pizzas";
      referencedColumns: ["id"];
    }
  ];
}