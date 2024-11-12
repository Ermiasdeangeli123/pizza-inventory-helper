import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MenuTable from "@/components/menu/MenuTable";
import { Pizza } from "@/types/menu";

const Menu = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([
    { id: "margherita", name: "Margherita", price: 8 },
    { id: "marinara", name: "Marinara", price: 7 },
    { id: "diavola", name: "Diavola", price: 9 },
    { id: "capricciosa", name: "Capricciosa", price: 10 },
    { id: "quattro-formaggi", name: "4 Formaggi", price: 11 },
  ]);
  const [newPizzaName, setNewPizzaName] = useState("");
  const [newPizzaPrice, setNewPizzaPrice] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNewPizza = () => {
    if (!newPizzaName || !newPizzaPrice) {
      toast.error("Compila tutti i campi");
      return;
    }

    const price = parseFloat(newPizzaPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Inserisci un prezzo valido");
      return;
    }

    const newPizza: Pizza = {
      id: newPizzaName.toLowerCase().replace(/\s+/g, "-"),
      name: newPizzaName,
      price: price,
    };

    setPizzas((prev) => [...prev, newPizza]);
    setNewPizzaName("");
    setNewPizzaPrice("");
    setIsDialogOpen(false);
    toast.success("Pizza aggiunta con successo");
  };

  const handleUpdatePizza = (id: string, updates: Partial<Pizza>) => {
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === id ? { ...pizza, ...updates } : pizza
      )
    );
  };

  const handleDeletePizza = (id: string) => {
    setPizzas((prev) => prev.filter((pizza) => pizza.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestione Menu</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi Pizza
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Aggiungi Nuova Pizza</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome Pizza</Label>
                  <Input
                    id="name"
                    value={newPizzaName}
                    onChange={(e) => setNewPizzaName(e.target.value)}
                    placeholder="Es: Quattro Stagioni"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Prezzo (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPizzaPrice}
                    onChange={(e) => setNewPizzaPrice(e.target.value)}
                    placeholder="Es: 10.50"
                    step="0.50"
                    min="0"
                  />
                </div>
                <Button onClick={handleAddNewPizza}>Aggiungi</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          <MenuTable
            pizzas={pizzas}
            onUpdatePizza={handleUpdatePizza}
            onDeletePizza={handleDeletePizza}
          />
        </Card>
      </div>
    </div>
  );
};

export default Menu;