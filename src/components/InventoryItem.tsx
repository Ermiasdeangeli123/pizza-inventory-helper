import { Button } from "@/components/ui/button";
import { Minus, Plus, Edit2 } from "lucide-react";
import { toast } from "sonner";
import type { InventoryItem as InventoryItemType } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface InventoryItemProps {
  item: InventoryItemType;
  onUpdateQuantity: (id: string, change: number) => void;
  onUpdateCost: (id: string, newCost: number) => void;
}

const InventoryItem = ({ item, onUpdateQuantity, onUpdateCost }: InventoryItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCost, setNewCost] = useState(item.costPerUnit.toString());

  const handleUpdate = (change: number) => {
    if (item.quantity + change < 0) {
      toast.error("La quantità non può essere negativa");
      return;
    }
    onUpdateQuantity(item.id, change);
    toast.success(`${item.name} aggiornato`);
  };

  const handleCostUpdate = () => {
    const parsedCost = parseFloat(newCost);
    if (isNaN(parsedCost) || parsedCost < 0) {
      toast.error("Inserisci un costo valido");
      return;
    }
    onUpdateCost(item.id, parsedCost);
    setIsDialogOpen(false);
    toast.success(`Costo di ${item.name} aggiornato`);
  };

  const getStockLevelColor = () => {
    const ratio = item.quantity / item.minStock;
    if (ratio <= 1) return "text-red-500";
    if (ratio <= 2) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className={`text-sm ${getStockLevelColor()}`}>
          {item.quantity} {item.unit}
        </p>
        <p className="text-sm text-gray-500">€{item.costPerUnit.toFixed(2)}/{item.unit}</p>
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifica Costo {item.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  placeholder="Nuovo costo per unità"
                  min="0"
                  step="0.01"
                />
              </div>
              <Button onClick={handleCostUpdate}>Aggiorna Costo</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdate(-1)}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdate(1)}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InventoryItem;