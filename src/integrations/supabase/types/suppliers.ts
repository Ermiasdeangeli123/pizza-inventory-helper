import { BaseTable } from './base';

export interface SuppliersTable extends BaseTable {
  Row: {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    name: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    name?: string;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [];
}

export interface SupplierPricesTable extends BaseTable {
  Row: {
    id: string;
    supplier_id: string;
    ingredient_id: string;
    price: number;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    supplier_id: string;
    ingredient_id: string;
    price: number;
    user_id: string;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    supplier_id?: string;
    ingredient_id?: string;
    price?: number;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "supplier_prices_supplier_id_fkey";
      columns: ["supplier_id"];
      isOneToOne: false;
      referencedRelation: "suppliers";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "supplier_prices_ingredient_id_fkey";
      columns: ["ingredient_id"];
      isOneToOne: false;
      referencedRelation: "inventory";
      referencedColumns: ["id"];
    }
  ];
}