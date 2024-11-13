import { useState } from "react";
import { categories } from "@/lib/data";
import CategorySection from "@/components/CategorySection";
import { useInventory, useUpdateInventory, useAddInventoryItem } from "@/queries/inventoryQueries";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: inventory, isLoading } = useInventory();
  const updateInventory = useUpdateInventory();
  const addInventoryItem = useAddInventoryItem();

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = inventory?.find((i) => i.id === id);
    if (!item) return;
    
    updateInventory.mutate({
      id,
      updates: { quantity: item.quantity + change }
    });
  };

  const handleUpdateCost = (id: string, newCost: number) => {
    updateInventory.mutate({
      id,
      updates: { cost_per_unit: newCost }
    });
  };

  const handleAddItem = (newItem: any) => {
    addInventoryItem.mutate(newItem);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

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
            items={inventory?.filter((item) => item.category_id === category.id) || []}
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