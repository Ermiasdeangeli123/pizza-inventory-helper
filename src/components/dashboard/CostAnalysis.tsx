import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePizzas } from "@/queries/pizzaQueries";
import { useInventory } from "@/queries/inventoryQueries";
import { useCurrency } from "@/hooks/useCurrency";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const CostAnalysis = () => {
  const { data: pizzas = [] } = usePizzas();
  const { data: inventory = [] } = useInventory();
  const { formatPrice } = useCurrency();

  // Calcola il costo degli ingredienti per ogni pizza
  const pizzaCosts = pizzas.map(pizza => {
    const ingredientsCost = (pizza.pizza_ingredients || []).reduce((acc, ing) => {
      const ingredient = inventory.find(i => i.id === ing.ingredient_id);
      if (!ingredient) return acc;
      return acc + (ing.quantity * ingredient.cost_per_unit);
    }, 0);

    const margin = pizza.price - ingredientsCost;
    const marginPercentage = (margin / pizza.price) * 100;

    return {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      cost: ingredientsCost,
      margin,
      marginPercentage
    };
  });

  // Ordina le pizze per margine percentuale (dal più basso al più alto)
  const sortedPizzas = [...pizzaCosts].sort((a, b) => a.marginPercentage - b.marginPercentage);

  // Identifica le pizze con margini bassi (sotto il 30%)
  const lowMarginPizzas = sortedPizzas.filter(pizza => pizza.marginPercentage < 30);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analisi dei Costi</CardTitle>
      </CardHeader>
      <CardContent>
        {lowMarginPizzas.length > 0 && (
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attenzione</AlertTitle>
            <AlertDescription>
              Alcune pizze hanno un margine di profitto basso (sotto il 30%).
              Considera di aumentare i prezzi o ottimizzare gli ingredienti.
            </AlertDescription>
          </Alert>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pizza</TableHead>
              <TableHead className="text-right">Prezzo</TableHead>
              <TableHead className="text-right">Costo Ingredienti</TableHead>
              <TableHead className="text-right">Margine</TableHead>
              <TableHead className="text-right">Margine %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPizzas.map((pizza) => (
              <TableRow key={pizza.id} className={pizza.marginPercentage < 30 ? "bg-red-50" : ""}>
                <TableCell className="font-medium">{pizza.name}</TableCell>
                <TableCell className="text-right">{formatPrice(pizza.price)}</TableCell>
                <TableCell className="text-right">{formatPrice(pizza.cost)}</TableCell>
                <TableCell className="text-right">{formatPrice(pizza.margin)}</TableCell>
                <TableCell className="text-right">{pizza.marginPercentage.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CostAnalysis;