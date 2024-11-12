export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
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
  { id: 'mozzarella', name: 'Mozzarella', category: 'dairy', quantity: 50, unit: 'kg', minStock: 10 },
  { id: 'parmesan', name: 'Parmigiano', category: 'dairy', quantity: 20, unit: 'kg', minStock: 5 },
  { id: 'gorgonzola', name: 'Gorgonzola', category: 'dairy', quantity: 15, unit: 'kg', minStock: 3 },
  
  // Meats
  { id: 'prosciutto', name: 'Prosciutto Crudo', category: 'meats', quantity: 30, unit: 'kg', minStock: 5 },
  { id: 'salami', name: 'Salame', category: 'meats', quantity: 25, unit: 'kg', minStock: 5 },
  { id: 'speck', name: 'Speck', category: 'meats', quantity: 20, unit: 'kg', minStock: 4 },
  
  // Vegetables
  { id: 'tomatoes', name: 'Pomodori', category: 'vegetables', quantity: 100, unit: 'kg', minStock: 20 },
  { id: 'mushrooms', name: 'Funghi', category: 'vegetables', quantity: 40, unit: 'kg', minStock: 8 },
  { id: 'olives', name: 'Olive', category: 'vegetables', quantity: 30, unit: 'kg', minStock: 5 },
  
  // Base
  { id: 'flour', name: 'Farina', category: 'base', quantity: 200, unit: 'kg', minStock: 50 },
  { id: 'oil', name: 'Olio', category: 'base', quantity: 50, unit: 'L', minStock: 10 },
  { id: 'yeast', name: 'Lievito', category: 'base', quantity: 10, unit: 'kg', minStock: 2 },
  
  // Other
  { id: 'oregano', name: 'Origano', category: 'other', quantity: 5, unit: 'kg', minStock: 1 },
  { id: 'basil', name: 'Basilico', category: 'other', quantity: 8, unit: 'kg', minStock: 2 },
  { id: 'salt', name: 'Sale', category: 'other', quantity: 25, unit: 'kg', minStock: 5 },
];
