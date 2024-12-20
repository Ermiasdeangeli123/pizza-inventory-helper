import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { it } from 'date-fns/locale';
import { useUpdateInventory } from "@/queries/inventoryQueries";
import { toast } from "sonner";
import type { InventoryItem as InventoryItemType } from "@/lib/data";

interface InventoryItemProps {
  item: InventoryItemType;
  onUpdateQuantity: (id: string, change: number) => void;
  onUpdateCost: (id: string, newCost: number) => void;
  onDelete: (id: string) => void;
}

const InventoryItem = ({
  item,
  onUpdateQuantity,
  onUpdateCost,
  onDelete
}: InventoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(item.quantity.toString());
  const [newCostPerUnit, setNewCostPerUnit] = useState(item.costPerUnit.toString());
  const [newMinStock, setNewMinStock] = useState(item.minStock.toString());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    item.expiryDate ? new Date(item.expiryDate) : undefined
  );

  const updateInventory = useUpdateInventory();

  const handleSave = () => {
    const updates = {
      quantity: parseFloat(newQuantity),
      cost_per_unit: parseFloat(newCostPerUnit),
      min_stock: parseFloat(newMinStock),
      expiry_date: selectedDate
    };

    updateInventory.mutate(
      { id: item.id, updates },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Inventario aggiornato");
        },
        onError: (error) => {
          toast.error("Errore nell'aggiornamento dell'inventario");
          console.error(error);
        }
      }
    );
  };

  const isLowStock = item.quantity <= item.minStock;
  const isExpiringSoon = item.expiryDate && 
    (new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 7;

  // Show notification for expiring items
  if (isExpiringSoon && !isEditing) {
    toast.warning(`${item.name} sta per scadere`, {
      description: `Scade il ${format(new Date(item.expiryDate!), "PPP", { locale: it })}`,
      duration: 5000,
    });
  }

  return (
    <div className={`p-4 rounded-lg border ${isLowStock ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Annulla" : "Modifica"}
          </Button>
        </div>

        <div className="space-y-2">
          {isEditing ? (
            <>
              <div>
                <Label>Quantità ({item.unit})</Label>
                <Input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label>Costo per {item.unit}</Label>
                <Input
                  type="number"
                  value={newCostPerUnit}
                  onChange={(e) => setNewCostPerUnit(e.target.value)}
                  className="w-full"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <Label>Scorta minima ({item.unit})</Label>
                <Input
                  type="number"
                  value={newMinStock}
                  onChange={(e) => setNewMinStock(e.target.value)}
                  className="w-full"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <Label>Data di scadenza</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !selectedDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP", { locale: it })
                      ) : (
                        "Seleziona data"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button onClick={handleSave} className="w-full">
                Salva
              </Button>
            </>
          ) : (
            <>
              <p>
                Quantità: <span className="font-medium">{item.quantity} {item.unit}</span>
                {isLowStock && (
                  <span className="text-red-600 ml-2">(Scorta bassa)</span>
                )}
              </p>
              <p>
                Scorta minima: <span className="font-medium">{item.minStock} {item.unit}</span>
              </p>
              {item.expiryDate && (
                <p>
                  Scadenza:{" "}
                  <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : ''}`}>
                    {format(new Date(item.expiryDate), "PPP", { locale: it })}
                    {isExpiringSoon && " (In scadenza)"}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;