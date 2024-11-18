import { useInventory } from "@/queries/inventoryQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/lib/data";
import { ShoppingBag } from "lucide-react";

const Shopping = () => {
  const { data: inventory, isLoading } = useInventory();

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  // Filtra gli elementi sotto la scorta minima
  const lowStockItems = inventory?.filter(item => item.quantity <= item.min_stock) || [];

  // Raggruppa gli elementi per categoria
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = lowStockItems.filter(item => item.category_id === category.id);
    return acc;
  }, {} as Record<string, typeof lowStockItems>);

  // Calcola la quantità suggerita da ordinare
  const calculateSuggestedOrder = (item: typeof lowStockItems[0]) => {
    const deficit = item.min_stock - item.quantity;
    // Suggerisce di ordinare il doppio del deficit per avere un buffer
    const suggestedQuantity = Math.ceil(deficit * 2);
    return suggestedQuantity;
  };

  // Calcola il costo stimato dell'ordine
  const calculateEstimatedCost = (item: typeof lowStockItems[0], quantity: number) => {
    return (quantity * item.cost_per_unit).toFixed(2);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingBag className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Lista della Spesa</h1>
      </div>

      {lowStockItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Non ci sono alimenti da acquistare al momento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {categories.map((category) => {
            const categoryItems = itemsByCategory[category.id];
            if (!categoryItems || categoryItems.length === 0) return null;

            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {categoryItems.map((item) => {
                        const suggestedQuantity = calculateSuggestedOrder(item);
                        const estimatedCost = calculateEstimatedCost(item, suggestedQuantity);

                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 rounded-lg border"
                          >
                            <div className="space-y-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <div className="flex gap-2">
                                <Badge variant="secondary">
                                  Scorta attuale: {item.quantity} {item.unit}
                                </Badge>
                                <Badge variant="destructive">
                                  Sotto scorta minima: {item.min_stock} {item.unit}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                Ordine suggerito: {suggestedQuantity} {item.unit}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Costo stimato: €{estimatedCost}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shopping;