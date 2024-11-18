import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LightbulbIcon } from "lucide-react";
import { useInventory } from "@/queries/inventoryQueries";
import { usePizzas } from "@/queries/pizzaQueries";
import { useSales } from "@/queries/salesQueries";
import { useCurrency } from "@/hooks/useCurrency";

const SmartSuggestions = () => {
  const { data: inventory = [] } = useInventory();
  const { data: pizzas = [] } = usePizzas();
  const { data: sales = [] } = useSales();
  const { formatPrice } = useCurrency();

  // Analisi degli sprechi
  const wasteAnalysis = inventory.map(item => {
    const consumed = item.initial_quantity - item.quantity;
    const consumedPercentage = item.initial_quantity > 0 
      ? (consumed / item.initial_quantity) * 100 
      : 0;
    const isExpired = item.expiry_date && new Date(item.expiry_date) < new Date();
    const isLowConsumption = consumedPercentage < 10 && consumed > 0;
    
    return {
      ...item,
      consumed,
      consumedPercentage,
      isExpired,
      isLowConsumption
    };
  });

  // Analisi delle vendite delle pizze
  const pizzaSales = pizzas.map(pizza => {
    const pizzaSalesData = sales.filter(sale => sale.pizza_id === pizza.id);
    const totalQuantity = pizzaSalesData.reduce((acc, sale) => acc + sale.quantity, 0);
    const totalRevenue = pizzaSalesData.reduce((acc, sale) => acc + (sale.price_at_time * sale.quantity), 0);
    
    return {
      ...pizza,
      totalQuantity,
      totalRevenue
    };
  }).sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Genera suggerimenti
  const generateSuggestions = () => {
    const suggestions = [];

    // Suggerimenti per gli sprechi
    const expiredItems = wasteAnalysis.filter(item => item.isExpired);
    if (expiredItems.length > 0) {
      suggestions.push({
        type: "warning",
        title: "Gestione Scadenze",
        description: `Hai ${expiredItems.length} ingredienti scaduti. Considera di ordinare quantità minori di ${expiredItems.map(i => i.name.toLowerCase()).join(", ")}.`
      });
    }

    // Suggerimenti per il basso consumo
    const lowConsumptionItems = wasteAnalysis.filter(item => item.isLowConsumption);
    if (lowConsumptionItems.length > 0) {
      suggestions.push({
        type: "info",
        title: "Ottimizzazione Scorte",
        description: `Considera di ridurre l'ordine di ${lowConsumptionItems.map(i => i.name.toLowerCase()).join(", ")} dato il basso consumo.`
      });
    }

    // Suggerimenti per le pizze più vendute
    const topSellingPizzas = pizzaSales.slice(0, 3);
    if (topSellingPizzas.length > 0) {
      suggestions.push({
        type: "success",
        title: "Tendenze di Vendita",
        description: `Le pizze più vendute sono: ${topSellingPizzas.map(p => p.name).join(", ")}. Assicurati di avere scorte sufficienti degli ingredienti necessari.`
      });
    }

    // Suggerimenti per le pizze meno vendute
    const lowSellingPizzas = pizzaSales.filter(p => p.totalQuantity === 0);
    if (lowSellingPizzas.length > 0) {
      suggestions.push({
        type: "warning",
        title: "Menu Performance",
        description: `Alcune pizze non sono mai state vendute: ${lowSellingPizzas.map(p => p.name).join(", ")}. Considera di rimuoverle dal menu o di promuoverle.`
      });
    }

    // Suggerimenti per gli ingredienti in esaurimento
    const lowStockItems = inventory.filter(item => item.quantity <= item.min_stock);
    if (lowStockItems.length > 0) {
      suggestions.push({
        type: "warning",
        title: "Scorte in Esaurimento",
        description: `${lowStockItems.length} ingredienti sono sotto la scorta minima. Ordina presto: ${lowStockItems.map(i => i.name.toLowerCase()).join(", ")}.`
      });
    }

    return suggestions;
  };

  const suggestions = generateSuggestions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5" />
          Suggerimenti Smart
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length === 0 ? (
          <p className="text-muted-foreground">
            Non ci sono suggerimenti al momento. Continua così!
          </p>
        ) : (
          suggestions.map((suggestion, index) => (
            <Alert key={index} variant={suggestion.type as any}>
              <h4 className="font-semibold">{suggestion.title}</h4>
              <AlertDescription>
                {suggestion.description}
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;