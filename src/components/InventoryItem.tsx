import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import type { InventoryItem as InventoryItemType } from "@/lib/data";

interface InventoryItemProps {
  item: InventoryItemType;
  onUpdateQuantity: (id: string, change: number) => void;
}

const InventoryItem = ({ item, onUpdateQuantity }: InventoryItemProps) => {
  const handleUpdate = (change: number) => {
    if (item.quantity + change < 0) {
      toast.error("La quantità non può essere negativa");
      return;
    }
    onUpdateQuantity(item.id, change);
    toast.success(`${item.name} aggiornato`);
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
      </div>
      <div className="flex items-center gap-2">
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