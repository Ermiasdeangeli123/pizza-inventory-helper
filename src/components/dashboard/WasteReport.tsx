import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useInventory } from "@/queries/inventoryQueries";
import { useCurrency } from "@/hooks/useCurrency";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const WasteReport = () => {
  const { data: inventory = [] } = useInventory();
  const { formatPrice } = useCurrency();

  // Calcola le statistiche sugli sprechi
  const wasteStats = inventory.map(item => {
    const consumed = item.initial_quantity - item.quantity;
    const consumedPercentage = (consumed / item.initial_quantity) * 100;
    const isExpired = item.expiry_date && new Date(item.expiry_date) < new Date();
    const wastedValue = isExpired ? item.quantity * item.cost_per_unit : 0;

    return {
      ...item,
      consumed,
      consumedPercentage,
      isExpired,
      wastedValue
    };
  });

  // Calcola il totale del valore sprecato
  const totalWaste = wasteStats.reduce((acc, item) => acc + item.wastedValue, 0);

  // Filtra gli elementi scaduti o con consumo anomalo
  const itemsToWatch = wasteStats.filter(
    item => item.isExpired || item.consumedPercentage < 10
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Sprechi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-lg font-semibold">
            Valore totale sprechi: {formatPrice(totalWaste)}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingrediente</TableHead>
              <TableHead className="text-right">Quantità Iniziale</TableHead>
              <TableHead className="text-right">Consumato</TableHead>
              <TableHead className="text-right">% Consumo</TableHead>
              <TableHead>Scadenza</TableHead>
              <TableHead className="text-right">Valore Sprecato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsToWatch.map((item) => (
              <TableRow 
                key={item.id}
                className={item.isExpired ? "bg-red-50" : item.consumedPercentage < 10 ? "bg-yellow-50" : ""}
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  {item.initial_quantity} {item.unit}
                </TableCell>
                <TableCell className="text-right">
                  {item.consumed.toFixed(2)} {item.unit}
                </TableCell>
                <TableCell className="text-right">
                  {item.consumedPercentage.toFixed(1)}%
                </TableCell>
                <TableCell>
                  {item.expiry_date ? (
                    <span className={item.isExpired ? "text-red-600" : ""}>
                      {format(new Date(item.expiry_date), "PPP", { locale: it })}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(item.wastedValue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WasteReport;