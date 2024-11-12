import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategorySection from "@/components/CategorySection";
import { categories, initialInventory } from "@/lib/data";
import type { InventoryItem } from "@/lib/data";

const Index = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateQuantity = (id: string, change: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
    );
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsByCategory = categories.map((category) => ({
    ...category,
    items: filteredInventory.filter((item) => item.category === category.id),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Inventario Pizzeria</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {itemsByCategory.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            items={category.items}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;