import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePizzas } from "@/queries/pizzaQueries";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Euro, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { useSales } from "@/queries/salesQueries";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

  // Calculate total pizzas sold from sales
  const totalPizzasSold = sales.reduce((acc, sale) => acc + sale.quantity, 0);

  // Find low stock items
  const lowStockItems = inventory.filter(
    item => item.quantity <= item.min_stock
  );

  // Calculate costs from ingredients used
  const totalCosts = sales.reduce((acc, sale) => {
    const pizza = pizzas.find(p => p.id === sale.pizza_id);
    if (!pizza) return acc;
    
    const pizzaCost = (pizza.pizza_ingredients || []).reduce((ingredientAcc, ingredient) => {
      if (!ingredient.ingredient) return ingredientAcc;
      return ingredientAcc + (ingredient.quantity * ingredient.ingredient.cost_per_unit);
    }, 0);
    return acc + (pizzaCost * sale.quantity);
  }, 0);

  // Sample data for the chart
  const salesData = [
    { name: 'Lun', sales: 4 },
    { name: 'Mar', sales: 3 },
    { name: 'Mer', sales: 6 },
    { name: 'Gio', sales: 4 },
    { name: 'Ven', sales: 8 },
    { name: 'Sab', sales: 10 },
    { name: 'Dom', sales: 7 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ricavi Totali</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costi Totali</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalCosts.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pizze Vendute</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPizzasSold}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scorte Basse</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Vendite Settimanali</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;