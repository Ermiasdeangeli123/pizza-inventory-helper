import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventory } from "@/queries/inventoryQueries";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const WasteReport = () => {
  const { data: inventory = [] } = useInventory();

  // Trova gli ingredienti in scadenza (entro 7 giorni)
  const expiringItems = inventory.filter(item => {
    if (!item.expiry_date) return false;
    const daysUntilExpiry = Math.floor(
      (new Date(item.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

  // Calcola il valore potenziale degli sprechi
  const potentialWaste = expiringItems.reduce((acc, item) => {
    return acc + (item.quantity * item.cost_per_unit);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trash2 className="h-5 w-5" />
          Report Sprechi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {potentialWaste > 0 && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 font-medium">
              Potenziale spreco: €{potentialWaste.toFixed(2)}
            </p>
          </div>
        )}

        {expiringItems.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Ingredienti in scadenza:</h3>
            <ul className="space-y-2">
              {expiringItems.map(item => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({item.quantity} {item.unit})
                    </span>
                  </div>
                  <span className="text-red-600">
                    Scade il {format(new Date(item.expiry_date!), "PPP", { locale: it })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {expiringItems.length === 0 && (
          <p className="text-gray-500">
            Non ci sono ingredienti in scadenza nei prossimi 7 giorni.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default WasteReport;