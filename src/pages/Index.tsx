import { categories } from "@/lib/data";
import CategorySection from "@/components/CategorySection";
import { useInventory, useUpdateInventory, useAddInventoryItem, useDeleteInventoryItem } from "@/queries/inventoryQueries";
import { Skeleton } from "@/components/ui/skeleton";
import type { InventoryItem } from "@/lib/data";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const session = useSession();
  const { data: inventoryData, isLoading, refetch } = useInventory();
  const updateInventory = useUpdateInventory();
  const addInventoryItem = useAddInventoryItem();
  const deleteInventoryItem = useDeleteInventoryItem();

  const handleReloadData = async () => {
    if (!session?.user?.id) {
      toast.error("Devi essere autenticato per ricaricare i dati");
      return;
    }

    try {
      const { error } = await supabase
        .rpc('populate_data_for_user', { input_user_id: session.user.id });

      if (error) throw error;

      await refetch();
      toast.success("Dati ricaricati con successo");
    } catch (error) {
      console.error("Error reloading data:", error);
      toast.error("Errore nel ricaricamento dei dati");
    }
  };

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

  const handleDeleteItem = (id: string) => {
    deleteInventoryItem.mutate(id);
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
    quantity: item.quantity,
    unit: item.unit,
    minStock: item.min_stock,
    costPerUnit: item.cost_per_unit,
    initialQuantity: item.initial_quantity,
    expiryDate: item.expiry_date
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Inventario</h1>
          <Button 
            variant="outline" 
            onClick={handleReloadData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Ricarica Dati
          </Button>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Nessun dato nell'inventario</p>
            <Button onClick={handleReloadData}>
              Carica Dati Iniziali
            </Button>
          </div>
        ) : (
          categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              items={inventory.filter((item) => item.category === category.id)}
              onUpdateQuantity={handleUpdateQuantity}
              onAddItem={handleAddItem}
              onUpdateCost={handleUpdateCost}
              onDeleteItem={handleDeleteItem}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;