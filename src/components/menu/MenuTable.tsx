import { Pizza } from "@/types/menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PencilIcon, TrashIcon, CheckIcon, XIcon, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RecipeEditor from "./RecipeEditor";
import { useCurrency } from "@/hooks/useCurrency";

interface MenuTableProps {
  pizzas: Pizza[];
  onUpdatePizza: (id: string, updates: Partial<Pizza>) => void;
  onDeletePizza: (id: string) => void;
  onUpdateRecipe: (id: string, ingredients: Array<{ ingredient_id: string; quantity: number }>) => void;
}

const MenuTable = ({ pizzas, onUpdatePizza, onDeletePizza, onUpdateRecipe }: MenuTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Pizza>>({});
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [selectedPizzaId, setSelectedPizzaId] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const handleEdit = (pizza: Pizza) => {
    setEditingId(pizza.id);
    setEditForm({ name: pizza.name, price: pizza.price });
  };

  const handleSave = (id: string) => {
    if (!editForm.name || !editForm.price) {
      toast.error("Compila tutti i campi");
      return;
    }

    onUpdatePizza(id, editForm);
    setEditingId(null);
    setEditForm({});
    toast.success("Pizza modificata con successo");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (id: string) => {
    try {
      await onDeletePizza(id);
      toast.success("Pizza eliminata con successo");
    } catch (error) {
      console.error('Error deleting pizza:', error);
      toast.error("Errore durante l'eliminazione della pizza");
    }
  };

  const handleOpenRecipe = (pizzaId: string) => {
    setSelectedPizzaId(pizzaId);
    setRecipeDialogOpen(true);
  };

  const handleSaveRecipe = (ingredients: Array<{ ingredient_id: string; quantity: number }>) => {
    if (selectedPizzaId) {
      onUpdateRecipe(selectedPizzaId, ingredients);
      setRecipeDialogOpen(false);
      setSelectedPizzaId(null);
      toast.success("Ricetta salvata con successo");
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Pizza</TableHead>
              <TableHead>Prezzo</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pizzas.map((pizza) => (
              <TableRow key={pizza.id}>
                <TableCell className="min-w-[120px]">
                  {editingId === pizza.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  ) : (
                    pizza.name
                  )}
                </TableCell>
                <TableCell className="min-w-[100px]">
                  {editingId === pizza.id ? (
                    <Input
                      type="number"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          price: parseFloat(e.target.value),
                        })
                      }
                      step="0.50"
                      min="0"
                    />
                  ) : (
                    formatPrice(pizza.price)
                  )}
                </TableCell>
                <TableCell className="text-right min-w-[180px]">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === pizza.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSave(pizza.id)}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCancel}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(pizza)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(pizza.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenRecipe(pizza.id)}
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={recipeDialogOpen} onOpenChange={setRecipeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Gestione Ricetta - {pizzas.find(p => p.id === selectedPizzaId)?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedPizzaId && (
            <RecipeEditor
              pizzaId={selectedPizzaId}
              existingIngredients={pizzas.find(p => p.id === selectedPizzaId)?.pizza_ingredients || []}
              onSave={handleSaveRecipe}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuTable;