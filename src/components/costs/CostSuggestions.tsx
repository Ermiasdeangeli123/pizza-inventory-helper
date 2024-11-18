import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventory } from "@/queries/inventoryQueries";
import { usePizzas } from "@/queries/pizzaQueries";
import { useSales } from "@/queries/salesQueries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown } from "lucide-react";

const CostSuggestions = () => {
  const { data: inventory = [] } = useInventory();
  const { data: pizzas = [] } = usePizzas();
  const { data: sales = [] } = useSales();

  // Calcola il margine di profitto per ogni pizza
  const pizzaMargins = pizzas.map(pizza => {
    const ingredients = pizza.pizza_ingredients || [];
    const cost = ingredients.reduce((acc, ing) => {
      const ingredient = inventory.find(i => i.id === ing.ingredient_id);
      if (!ingredient) return acc;
      return acc + (ingredient.cost_per_unit * ing.quantity);
    }, 0);
    
    const margin = ((pizza.price - cost) / pizza.price) * 100;
    return { ...pizza, margin, cost };
  });

  // Trova le pizze con margini bassi (sotto il 30%)
  const lowMarginPizzas = pizzaMargins.filter(p => p.margin < 30);

  // Trova gli ingredienti più costosi
  const expensiveIngredients = inventory
    .filter(ing => ing.cost_per_unit > 10)
    .sort((a, b) => b.cost_per_unit - a.cost_per_unit)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Suggerimenti per la Riduzione dei Costi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowMarginPizzas.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Le seguenti pizze hanno un margine di profitto basso:
              <ul className="mt-2 list-disc list-inside">
                {lowMarginPizzas.map(pizza => (
                  <li key={pizza.id}>
                    {pizza.name} - Margine: {pizza.margin.toFixed(1)}% 
                    (Costo: €{pizza.cost.toFixed(2)}, Prezzo: €{pizza.price.toFixed(2)})
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Ingredienti più costosi:</h3>
          <ul className="space-y-2">
            {expensiveIngredients.map(ing => (
              <li key={ing.id} className="flex justify-between">
                <span>{ing.name}</span>
                <span>€{ing.cost_per_unit.toFixed(2)}/{ing.unit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostSuggestions;