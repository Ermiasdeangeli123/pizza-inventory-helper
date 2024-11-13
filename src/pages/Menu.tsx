import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MenuTable from "@/components/menu/MenuTable";
import { usePizzas, useAddPizza, useUpdatePizza, useDeletePizza } from "@/queries/pizzaQueries";
import { Skeleton } from "@/components/ui/skeleton";
import type { Pizza } from "@/types/menu";

const Menu = () => {
  const { data: pizzas, isLoading } = usePizzas();
  const addPizza = useAddPizza();
  const updatePizza = useUpdatePizza();
  const deletePizza = useDeletePizza();
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

    addPizza.mutate({
      name: newPizzaName,
      price: price,
      ingredients: []
    });

    setNewPizzaName("");
    setNewPizzaPrice("");
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            pizzas={pizzas || []}
            onUpdatePizza={(id, updates) => updatePizza.mutate({ id, updates })}
            onDeletePizza={(id) => deletePizza.mutate(id)}
          />
        </Card>
      </div>
    </div>
  );
};

export default Menu;
