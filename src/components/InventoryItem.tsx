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

interface InventoryItemProps {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  costPerUnit: number;
  initialQuantity: number;
  expiryDate?: string;
}

const InventoryItem = ({
  id,
  name,
  quantity,
  unit,
  minStock,
  costPerUnit,
  initialQuantity,
  expiryDate
}: InventoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity.toString());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    expiryDate ? new Date(expiryDate) : undefined
  );

  const updateInventory = useUpdateInventory();

  const handleSave = () => {
    const updates = {
      quantity: parseFloat(newQuantity),
      expiry_date: selectedDate
    };

    updateInventory.mutate(
      { id, updates },
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

  const isLowStock = quantity <= minStock;
  const isExpiringSoon = selectedDate && 
    (new Date(selectedDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 7;

  return (
    <div className={`p-4 rounded-lg border ${isLowStock ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Annulla" : "Modifica"}
        </Button>
      </div>

      <div className="space-y-2">
        {isEditing ? (
          <>
            <div>
              <Label>Quantità ({unit})</Label>
              <Input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="w-full"
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
              Quantità: <span className="font-medium">{quantity} {unit}</span>
              {isLowStock && (
                <span className="text-red-600 ml-2">(Scorta bassa)</span>
              )}
            </p>
            <p>
              Costo per {unit}: <span className="font-medium">€{costPerUnit.toFixed(2)}</span>
            </p>
            {selectedDate && (
              <p>
                Scadenza:{" "}
                <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : ''}`}>
                  {format(new Date(selectedDate), "PPP", { locale: it })}
                  {isExpiringSoon && " (In scadenza)"}
                </span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;