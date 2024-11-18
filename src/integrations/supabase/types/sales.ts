import { BaseTable } from './base';

export interface SalesTable extends BaseTable {
  Row: {
    id: string;
    pizza_id: string | null;
    quantity: number;
    price_at_time: number;
    user_id: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    pizza_id?: string | null;
    price_at_time: number;
    quantity?: number;
    user_id: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    pizza_id?: string | null;
    price_at_time?: number;
    quantity?: number;
    user_id?: string;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "sales_pizza_id_fkey";
      columns: ["pizza_id"];
      isOneToOne: false;
      referencedRelation: "pizzas";
      referencedColumns: ["id"];
    }
  ];
}