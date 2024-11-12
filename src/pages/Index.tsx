import { useState } from "react";
import { categories, initialInventory } from "@/lib/data";
import type { InventoryItem } from "@/lib/data";
import CategorySection from "@/components/CategorySection";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

  const handleUpdateQuantity = (id: string, change: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
    );
  };

  const handleUpdateCost = (id: string, newCost: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, costPerUnit: newCost } : item
      )
    );
  };

  const handleAddItem = (newItem: Omit<InventoryItem, "id">) => {
    const itemWithId = { ...newItem, id: uuidv4() };
    setInventory((prev) => [...prev, itemWithId]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Inventario</h1>
        </div>

        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            items={inventory.filter((item) => item.category === category.id)}
            onUpdateQuantity={handleUpdateQuantity}
            onAddItem={handleAddItem}
            onUpdateCost={handleUpdateCost}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;