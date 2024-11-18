import { BaseTable } from './base';

export interface InventoryTable extends BaseTable {
  Row: {
    id: string;
    name: string;
    category_id: string | null;
    quantity: number;
    unit: string;
    min_stock: number;
    cost_per_unit: number;
    initial_quantity: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    expiry_date: string | null;
  };
  Insert: {
    id?: string;
    name: string;
    category_id?: string | null;
    quantity?: number;
    unit: string;
    min_stock?: number;
    cost_per_unit?: number;
    initial_quantity?: number;
    user_id: string;
    created_at?: string;
    updated_at?: string;
    expiry_date?: string | null;
  };
  Update: {
    id?: string;
    name?: string;
    category_id?: string | null;
    quantity?: number;
    unit?: string;
    min_stock?: number;
    cost_per_unit?: number;
    initial_quantity?: number;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    expiry_date?: string | null;
  };
  Relationships: [
    {
      foreignKeyName: "inventory_category_id_fkey";
      columns: ["category_id"];
      isOneToOne: false;
      referencedRelation: "categories";
      referencedColumns: ["id"];
    }
  ];
}