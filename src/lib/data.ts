export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  costPerUnit: number;
  initialQuantity: number;
  expiryDate?: string; // Added optional expiryDate property
};

export const categories: Category[] = [
  { id: 'dairy', name: 'Latticini', icon: '🧀' },
  { id: 'meats', name: 'Carni', icon: '🥓' },
  { id: 'vegetables', name: 'Verdure', icon: '🫑' },
  { id: 'base', name: 'Base', icon: '🌾' },
  { id: 'other', name: 'Altro', icon: '🍯' },
];