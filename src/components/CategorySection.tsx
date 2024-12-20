import type { Category, InventoryItem } from "@/lib/data";
import InventoryItemComponent from "./InventoryItem";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface CategorySectionProps {
  category: Category;
  items: InventoryItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onAddItem: (item: Omit<InventoryItem, "id">) => void;
  onUpdateCost: (id: string, newCost: number) => void;
  onDeleteItem: (id: string) => void;
}

const CategorySection = ({ 
  category, 
  items, 
  onUpdateQuantity, 
  onAddItem,
  onUpdateCost,
  onDeleteItem
}: CategorySectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");
  const [newItemMinStock, setNewItemMinStock] = useState("");
  const [newItemCostPerUnit, setNewItemCostPerUnit] = useState("");

  const handleAddNewItem = () => {
    if (!newItemName || !newItemQuantity || !newItemUnit || !newItemMinStock || !newItemCostPerUnit) {
      toast.error("Compila tutti i campi");
      return;
    }

    const quantity = parseInt(newItemQuantity);
    const minStock = parseInt(newItemMinStock);
    const costPerUnit = parseFloat(newItemCostPerUnit);

    if (isNaN(quantity) || quantity < 0) {
      toast.error("Inserisci una quantità valida");
      return;
    }

    if (isNaN(minStock) || minStock < 0) {
      toast.error("Inserisci una scorta minima valida");
      return;
    }

    if (isNaN(costPerUnit) || costPerUnit < 0) {
      toast.error("Inserisci un costo per unità valido");
      return;
    }

    onAddItem({
      name: newItemName,
      category: category.id,
      quantity,
      unit: newItemUnit,
      minStock,
      costPerUnit,
      initialQuantity: quantity
    });

    setNewItemName("");
    setNewItemQuantity("");
    setNewItemUnit("");
    setNewItemMinStock("");
    setNewItemCostPerUnit("");
    setIsDialogOpen(false);
    toast.success("Alimento aggiunto con successo");
  };

  // Sort items alphabetically by name
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <h2 className="text-xl font-semibold">{category.name}</h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Aggiungi {category.name}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo {category.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Es: Mozzarella"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantità</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(e.target.value)}
                  placeholder="Es: 10"
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unità di misura</Label>
                <Input
                  id="unit"
                  value={newItemUnit}
                  onChange={(e) => setNewItemUnit(e.target.value)}
                  placeholder="Es: kg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minStock">Scorta minima</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newItemMinStock}
                  onChange={(e) => setNewItemMinStock(e.target.value)}
                  placeholder="Es: 5"
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="costPerUnit">Costo per unità</Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  value={newItemCostPerUnit}
                  onChange={(e) => setNewItemCostPerUnit(e.target.value)}
                  placeholder="Es: 5.50"
                  min="0"
                  step="0.01"
                />
              </div>
              <Button onClick={handleAddNewItem}>Aggiungi</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedItems.map((item) => (
          <InventoryItemComponent
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onUpdateCost={onUpdateCost}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;