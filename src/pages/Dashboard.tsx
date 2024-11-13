import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePizzas } from "@/queries/pizzaQueries";
import { Euro, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { useSales } from "@/queries/salesQueries";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfWeek, eachDayOfInterval, endOfWeek } from "date-fns";
import { it } from 'date-fns/locale';
import { Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

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

  // Prepare data for the chart
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const salesData = weekDays.map(day => {
    const dayStart = new Date(day.setHours(0, 0, 0, 0));
    const dayEnd = new Date(day.setHours(23, 59, 59, 999));
    
    const daySales = sales.filter(sale => {
      const saleDate = new Date(sale.created_at);
      return saleDate >= dayStart && saleDate <= dayEnd;
    });

    const totalSales = daySales.reduce((acc, sale) => acc + sale.quantity, 0);

    return {
      name: format(day, 'EEE', { locale: it }), // Italian day abbreviation
      sales: totalSales
    };
  });

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
          <ChartContainer
            config={{
              sales: {
                label: "Vendite",
                theme: {
                  light: "#8884d8",
                  dark: "#8884d8"
                }
              }
            }}
          >
            <>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                data={salesData}
              />
            </>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
