import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

const Menu = () => {
  const { data: pizzas, isLoading } = usePizzas();
  const addPizza = useAddPizza();
  const updatePizza = useUpdatePizza();
  const deletePizza = useDeletePizza();
  const session = useSession();
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
      pizza_ingredients: []
    });

    setNewPizzaName("");
    setNewPizzaPrice("");
    setIsDialogOpen(false);
  };

  const handleUpdateRecipe = async (pizzaId: string, ingredients: Array<{ ingredient_id: string; quantity: number }>) => {
    try {
      // First, delete existing ingredients
      const { error: deleteError } = await supabase
        .from('pizza_ingredients')
        .delete()
        .eq('pizza_id', pizzaId);

      if (deleteError) throw deleteError;

      // Then insert new ingredients
      const { error: insertError } = await supabase
        .from('pizza_ingredients')
        .insert(
          ingredients.map(ing => ({
            pizza_id: pizzaId,
            ingredient_id: ing.ingredient_id,
            quantity: ing.quantity,
            user_id: session?.user?.id
          }))
        );

      if (insertError) throw insertError;

      // Refresh pizzas data
      usePizzas().refetch();
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast.error("Errore nel salvataggio della ricetta");
    }
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

  // Transform the pizza data to include the count from sales
  const transformedPizzas: Pizza[] = (pizzas || []).map(pizza => ({
    ...pizza,
    count: 0 // This will be updated when we implement sales tracking
  }));

  if (transformedPizzas.length === 0) {
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

          <Card>
            <CardHeader>
              <CardTitle>Benvenuto nel Menu</CardTitle>
              <CardDescription>
                Qui puoi gestire tutte le pizze del tuo ristorante.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Il menu ti permette di:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creare e gestire le tue pizze</li>
                <li>Definire gli ingredienti e le quantità per ogni pizza</li>
                <li>Impostare i prezzi</li>
                <li>Monitorare le vendite</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Quando vendi una pizza, gli ingredienti utilizzati vengono automaticamente sottratti dall'inventario.
                Inizia aggiungendo la tua prima pizza cliccando sul pulsante "Aggiungi Pizza".
              </p>
            </CardContent>
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
            pizzas={transformedPizzas}
            onUpdatePizza={(id, updates) => updatePizza.mutate({ id, updates })}
            onDeletePizza={(id) => deletePizza.mutate(id)}
            onUpdateRecipe={handleUpdateRecipe}
          />
        </Card>
      </div>
    </div>
  );
};

export default Menu;