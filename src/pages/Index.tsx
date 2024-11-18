import { categories } from "@/lib/data";
import CategorySection from "@/components/CategorySection";
import { useInventory, useUpdateInventory, useAddInventoryItem, useDeleteInventoryItem } from "@/queries/inventoryQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InventoryItem } from "@/lib/data";

const Index = () => {
  const { data: inventoryData, isLoading } = useInventory();
  const updateInventory = useUpdateInventory();
  const addInventoryItem = useAddInventoryItem();
  const deleteInventoryItem = useDeleteInventoryItem();

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
    category: item.category_id || 'other', // Default to 'other' if no category
    quantity: item.quantity,
    unit: item.unit,
    minStock: item.min_stock,
    costPerUnit: item.cost_per_unit,
    initialQuantity: item.initial_quantity,
    expiryDate: item.expiry_date
  })) || [];

  if (inventory.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Benvenuto nell'Inventario</CardTitle>
              <CardDescription>
                Qui puoi gestire tutti gli ingredienti del tuo ristorante.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                L'inventario ti permette di:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tenere traccia delle quantità di ogni ingrediente</li>
                <li>Impostare scorte minime per non rimanere mai senza ingredienti</li>
                <li>Monitorare le date di scadenza</li>
                <li>Calcolare i costi e gli sprechi</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Inizia aggiungendo i tuoi primi ingredienti utilizzando i pulsanti "Aggiungi" in ogni categoria.
              </p>
            </CardContent>
          </Card>
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
            items={inventory.filter((item) => 
              category.id === 'other' 
                ? item.category === 'other' || !item.category
                : item.category === category.id
            )}
            onUpdateQuantity={handleUpdateQuantity}
            onAddItem={handleAddItem}
            onUpdateCost={handleUpdateCost}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;