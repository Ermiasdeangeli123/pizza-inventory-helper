import { useState } from "react";
import { Card } from "@/components/ui/card";
import { EuroIcon, TrendingUpIcon } from "lucide-react";
import { toast } from "sonner";
import { usePizzaStore } from "@/queries/pizzaQueries";
import SalesTable from "@/components/sales/SalesTable";
import { initialInventory } from "@/lib/data";

const Sales = () => {
  const { pizzas } = usePizzaStore();
  const [inventory, setInventory] = useState(initialInventory);

  const updateInventory = (pizzaId: string, increment: boolean) => {
    const pizza = pizzas.find(p => p.id === pizzaId);
    if (!pizza) return;

    setInventory(prev => prev.map(item => {
      const pizzaIngredient = pizza.ingredients.find(ing => ing.ingredientId === item.id);
      if (!pizzaIngredient) return item;

      const quantityChange = increment ? -pizzaIngredient.quantity : pizzaIngredient.quantity;
      const newQuantity = item.quantity + quantityChange;

      if (newQuantity < 0) {
        toast.error(`Ingredienti insufficienti per ${item.name}`);
        return item;
      }

      return {
        ...item,
        quantity: newQuantity
      };
    }));
  };

  const handleIncrement = (id: string) => {
    updateInventory(id, true);
  };

  const handleDecrement = (id: string) => {
    updateInventory(id, false);
  };

  const totalRevenue = pizzas.reduce(
    (acc, pizza) => acc + pizza.price * (pizza.count || 0),
    0
  );

  const totalSales = pizzas.reduce((acc, pizza) => acc + (pizza.count || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Conteggio Vendite</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-full">
                <EuroIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Incasso Totale</p>
                <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <TrendingUpIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pizze Vendute</p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <SalesTable
            pizzas={pizzas}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </Card>
      </div>
    </div>
  );
};

export default Sales;