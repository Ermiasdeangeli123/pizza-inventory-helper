import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePizzas } from "@/queries/pizzaQueries";
import { Euro, TrendingUp, TrendingDown } from "lucide-react";
import { useSales } from "@/queries/salesQueries";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SalesChart from "@/components/dashboard/SalesChart";
import PizzaRankings from "@/components/dashboard/PizzaRankings";

const Dashboard = () => {
  const { data: pizzas = [] } = usePizzas();
  const { data: sales = [] } = useSales();
  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*');
      if (error) throw error;
      return data || [];
    }
  });

  // Calculate total revenue from sales
  const totalRevenue = sales.reduce((acc, sale) => {
    return acc + (sale.price_at_time * sale.quantity);
  }, 0);

  // Calculate costs from ingredients used
  const pizzaCosts: Record<string, number> = {};
  pizzas.forEach(pizza => {
    const pizzaCost = (pizza.pizza_ingredients || []).reduce((ingredientAcc, ingredient) => {
      const inventoryItem = inventory.find(item => item.id === ingredient.ingredient_id);
      if (!inventoryItem) return ingredientAcc;
      return ingredientAcc + (ingredient.quantity * inventoryItem.cost_per_unit);
    }, 0);
    pizzaCosts[pizza.id] = pizzaCost;
  });

  const totalCosts = sales.reduce((acc, sale) => {
    const pizzaCost = pizzaCosts[sale.pizza_id || ''] || 0;
    return acc + (pizzaCost * sale.quantity);
  }, 0);

  // Calculate profit
  const profit = totalRevenue - totalCosts;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-100">Ricavi Totali</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-100">€{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-100">Costi Totali</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-100">€{totalCosts.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${profit >= 0 ? 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800' : 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${profit >= 0 ? 'text-blue-700 dark:text-blue-100' : 'text-red-700 dark:text-red-100'}`}>Profitto</CardTitle>
            <Euro className={`h-4 w-4 ${profit >= 0 ? 'text-blue-600 dark:text-blue-200' : 'text-red-600 dark:text-red-200'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-700 dark:text-blue-100' : 'text-red-700 dark:text-red-100'}`}>€{profit.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart sales={sales} />
        <PizzaRankings 
          sales={sales} 
          pizzas={pizzas}
          costs={pizzaCosts}
        />
      </div>
    </div>
  );
};

export default Dashboard;