import { Card } from "@/components/ui/card";
import { EuroIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { usePizzas } from "@/queries/pizzaQueries";
import { useSales } from "@/queries/salesQueries";
import { initialInventory } from "@/lib/data";

const Profits = () => {
  const { data: pizzas = [] } = usePizzas();
  const { data: sales = [] } = useSales();

  // Calculate total sales using sales data
  const totalRevenue = sales.reduce((acc, sale) => {
    return acc + (sale.price_at_time * sale.quantity);
  }, 0);

  // Calculate total costs of ingredients used based on sales
  const totalCosts = sales.reduce((acc, sale) => {
    const pizza = pizzas.find(p => p.id === sale.pizza_id);
    if (!pizza) return acc;
    
    const pizzaCost = (pizza.pizza_ingredients || []).reduce((ingredientAcc, ingredient) => {
      const inventoryItem = initialInventory.find(item => item.id === ingredient.ingredient_id);
      if (!inventoryItem) return ingredientAcc;
      return ingredientAcc + (ingredient.quantity * inventoryItem.costPerUnit);
    }, 0);
    
    return acc + (pizzaCost * sale.quantity);
  }, 0);

  // Calculate profit
  const profit = totalRevenue - totalCosts;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profitti</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-full">
                <TrendingUpIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ricavi Totali</p>
                <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-100 rounded-full">
                <TrendingDownIcon className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Costi Totali</p>
                <p className="text-2xl font-bold">€{totalCosts.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <EuroIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profitto</p>
                <p className="text-2xl font-bold">€{profit.toFixed(2)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profits;