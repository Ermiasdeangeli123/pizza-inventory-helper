import { Card } from "@/components/ui/card";
import { EuroIcon, TrendingUpIcon } from "lucide-react";
import SalesTable from "@/components/sales/SalesTable";
import { usePizzas } from "@/queries/pizzaQueries";
import { useAddSale, useSales } from "@/queries/salesQueries";
import { Skeleton } from "@/components/ui/skeleton";
import type { Pizza } from "@/types/menu";

const Sales = () => {
  const { data: pizzas, isLoading } = usePizzas();
  const { data: sales = [] } = useSales();
  const addSale = useAddSale();

  const handleIncrement = (id: string) => {
    const pizza = pizzas?.find((p) => p.id === id);
    if (!pizza) return;

    addSale.mutate({
      pizzaId: id,
      quantity: 1,
      priceAtTime: pizza.price
    });
  };

  const handleDecrement = (id: string) => {
    const pizza = pizzas?.find((p) => p.id === id);
    if (!pizza) return;

    addSale.mutate({
      pizzaId: id,
      quantity: -1,
      priceAtTime: pizza.price
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  // Calculate totals from sales data
  const totalRevenue = sales.reduce(
    (acc, sale) => acc + (sale.price_at_time * sale.quantity),
    0
  );

  const totalSales = sales.reduce(
    (acc, sale) => acc + sale.quantity,
    0
  );

  // Add count to pizzas based on sales
  const pizzasWithCount = (pizzas || []).map(pizza => ({
    ...pizza,
    count: sales.filter(sale => sale.pizza_id === pizza.id)
      .reduce((acc, sale) => acc + sale.quantity, 0)
  }));

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
            pizzas={pizzasWithCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </Card>
      </div>
    </div>
  );
};

export default Sales;