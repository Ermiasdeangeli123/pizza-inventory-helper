export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  costPerUnit: number;
  initialQuantity: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { id: 'dairy', name: 'Latticini', icon: '🧀' },
  { id: 'meats', name: 'Carni', icon: '🥓' },
  { id: 'vegetables', name: 'Verdure', icon: '🫑' },
  { id: 'base', name: 'Base', icon: '🌾' },
  { id: 'other', name: 'Altro', icon: '🍯' },
];

export const initialInventory: InventoryItem[] = [
  // Dairy
  { id: 'mozzarella', name: 'Mozzarella', category: 'dairy', quantity: 50, initialQuantity: 50, unit: 'kg', minStock: 10, costPerUnit: 5 },
  { id: 'parmesan', name: 'Parmigiano', category: 'dairy', quantity: 20, initialQuantity: 20, unit: 'kg', minStock: 5, costPerUnit: 12 },
  { id: 'gorgonzola', name: 'Gorgonzola', category: 'dairy', quantity: 15, initialQuantity: 15, unit: 'kg', minStock: 3, costPerUnit: 8 },
  
  // Meats
  { id: 'prosciutto', name: 'Prosciutto Crudo', category: 'meats', quantity: 30, initialQuantity: 30, unit: 'kg', minStock: 5, costPerUnit: 15 },
  { id: 'salami', name: 'Salame', category: 'meats', quantity: 25, initialQuantity: 25, unit: 'kg', minStock: 5, costPerUnit: 10 },
  { id: 'speck', name: 'Speck', category: 'meats', quantity: 20, initialQuantity: 20, unit: 'kg', minStock: 4, costPerUnit: 12 },
  
  // Vegetables
  { id: 'tomatoes', name: 'Pomodori', category: 'vegetables', quantity: 100, initialQuantity: 100, unit: 'kg', minStock: 20, costPerUnit: 2 },
  { id: 'mushrooms', name: 'Funghi', category: 'vegetables', quantity: 40, initialQuantity: 40, unit: 'kg', minStock: 8, costPerUnit: 4 },
  { id: 'olives', name: 'Olive', category: 'vegetables', quantity: 30, initialQuantity: 30, unit: 'kg', minStock: 5, costPerUnit: 3 },
  
  // Base
  { id: 'flour', name: 'Farina', category: 'base', quantity: 200, initialQuantity: 200, unit: 'kg', minStock: 50, costPerUnit: 1 },
  { id: 'oil', name: 'Olio', category: 'base', quantity: 50, initialQuantity: 50, unit: 'L', minStock: 10, costPerUnit: 5 },
  { id: 'yeast', name: 'Lievito', category: 'base', quantity: 10, initialQuantity: 10, unit: 'kg', minStock: 2, costPerUnit: 3 },
  
  // Other
  { id: 'oregano', name: 'Origano', category: 'other', quantity: 5, initialQuantity: 5, unit: 'kg', minStock: 1, costPerUnit: 15 },
  { id: 'basil', name: 'Basilico', category: 'other', quantity: 8, initialQuantity: 8, unit: 'kg', minStock: 2, costPerUnit: 4 },
  { id: 'salt', name: 'Sale', category: 'other', quantity: 25, initialQuantity: 25, unit: 'kg', minStock: 5, costPerUnit: 1 },
];
