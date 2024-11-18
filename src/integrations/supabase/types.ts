export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Base table interfaces
interface BaseTable {
  Row: Record<string, any>;
  Insert: Record<string, any>;
  Update: Record<string, any>;
  Relationships: any[];
}

// Individual table interfaces
interface CategoriesTable extends BaseTable {
  Row: {
    icon: string;
    id: string;
    name: string;
  };
  Insert: {
    icon: string;
    id: string;
    name: string;
  };
  Update: {
    icon?: string;
    id?: string;
    name?: string;
  };
  Relationships: [];
}

interface InventoryTable extends BaseTable {
  Row: {
    category_id: string | null;
    cost_per_unit: number;
    created_at: string;
    expiry_date: string | null;
    id: string;
    initial_quantity: number;
    min_stock: number;
    name: string;
    quantity: number;
    unit: string;
    updated_at: string;
    user_id: string;
  };
  Insert: {
    category_id?: string | null;
    cost_per_unit?: number;
    created_at?: string;
    expiry_date?: string | null;
    id?: string;
    initial_quantity?: number;
    min_stock?: number;
    name: string;
    quantity?: number;
    unit: string;
    updated_at?: string;
    user_id: string;
  };
  Update: {
    category_id?: string | null;
    cost_per_unit?: number;
    created_at?: string;
    expiry_date?: string | null;
    id?: string;
    initial_quantity?: number;
    min_stock?: number;
    name?: string;
    quantity?: number;
    unit?: string;
    updated_at?: string;
    user_id?: string;
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

interface ProfilesTable extends BaseTable {
  Row: {
    created_at: string | null;
    first_name: string | null;
    id: string;
    last_name: string | null;
    subscription_end_date: string | null;
    subscription_status: string | null;
    updated_at: string | null;
    currency: string;
  };
  Insert: {
    created_at?: string | null;
    first_name?: string | null;
    id: string;
    last_name?: string | null;
    subscription_end_date?: string | null;
    subscription_status?: string | null;
    updated_at?: string | null;
    currency?: string;
  };
  Update: {
    created_at?: string | null;
    first_name?: string | null;
    id?: string;
    last_name?: string | null;
    subscription_end_date?: string | null;
    subscription_status?: string | null;
    updated_at?: string | null;
    currency?: string;
  };
  Relationships: [];
}

export interface Database {
  public: {
    Tables: {
      categories: CategoriesTable;
      inventory: InventoryTable;
      profiles: ProfilesTable;
    };
    Views: Record<string, never>;
    Functions: {
      populate_data_for_user: {
        Args: { input_user_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Additional types for Tables, TablesInsert, TablesUpdate, Enums, and CompositeTypes can be added here if needed.
