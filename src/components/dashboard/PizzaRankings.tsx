import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCurrency } from "@/hooks/useCurrency";
import type { Pizza, Sale } from "@/types/menu";

interface PizzaRankingsProps {
  sales: Sale[];
  pizzas: Pizza[];
  costs: Record<string, number>;
}

const PizzaRankings = ({ sales, pizzas, costs }: PizzaRankingsProps) => {
  const { formatPrice } = useCurrency();
  
  const pizzaStats = pizzas.map(pizza => {
    const pizzaSales = sales.filter(sale => sale.pizza_id === pizza.id);
    const totalQuantity = pizzaSales.reduce((acc, sale) => acc + sale.quantity, 0);
    const totalRevenue = pizzaSales.reduce((acc, sale) => acc + (sale.price_at_time * sale.quantity), 0);
    const totalCost = (costs[pizza.id] || 0) * totalQuantity;
    const profit = totalRevenue - totalCost;

    return {
      id: pizza.id,
      name: pizza.name,
      quantity: totalQuantity,
      revenue: totalRevenue,
      profit: profit
    };
  }).sort((a, b) => b.quantity - a.quantity);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classifica Pizze</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pizza</TableHead>
              <TableHead className="text-right">Vendute</TableHead>
              <TableHead className="text-right">Ricavi</TableHead>
              <TableHead className="text-right">Profitto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pizzaStats.map((pizza) => (
              <TableRow key={pizza.id}>
                <TableCell className="font-medium">{pizza.name}</TableCell>
                <TableCell className="text-right">{pizza.quantity}</TableCell>
                <TableCell className="text-right">{formatPrice(pizza.revenue)}</TableCell>
                <TableCell className="text-right">{formatPrice(pizza.profit)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PizzaRankings;