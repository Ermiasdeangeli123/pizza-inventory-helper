import { useState } from "react";
import { categories } from "@/lib/data";
import CategorySection from "@/components/CategorySection";
import { useInventory, useUpdateInventory, useAddInventoryItem } from "@/queries/inventoryQueries";
import { Skeleton } from "@/components/ui/skeleton";
import type { InventoryItem } from "@/lib/data";

const Index = () => {
  const { data: inventoryData, isLoading } = useInventory();
  const updateInventory = useUpdateInventory();
  const addInventoryItem = useAddInventoryItem();

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = inventoryData?.find((i) => i.id === id);
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

  const handleAddItem = (newItem: Omit<InventoryItem, "id">) => {
    addInventoryItem.mutate({
      name: newItem.name,
      category_id: newItem.category,
      quantity: newItem.quantity,
      unit: newItem.unit,
      min_stock: newItem.minStock,
      cost_per_unit: newItem.costPerUnit,
      initial_quantity: newItem.quantity
    });
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

  // Transform the inventory data to match our InventoryItem type
  const inventory: InventoryItem[] = inventoryData?.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category_id || '',
    category_id: item.category_id,
    quantity: item.quantity,
    unit: item.unit,
    minStock: item.min_stock,
    min_stock: item.min_stock,
    costPerUnit: item.cost_per_unit,
    cost_per_unit: item.cost_per_unit,
    initialQuantity: item.initial_quantity,
    initial_quantity: item.initial_quantity,
    created_at: item.created_at,
    updated_at: item.updated_at,
    user_id: item.user_id
  })) || [];

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