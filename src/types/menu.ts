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
  expiryDate?: string; // Added optional expiryDate property
};