import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useInventory } from "@/queries/inventoryQueries";
import { toast } from "sonner";

interface RecipeEditorProps {
  pizzaId: string;
  existingIngredients: Array<{
    id: string;
    ingredient_id: string;
    quantity: number;
  }>;
  onSave: (ingredients: Array<{ ingredient_id: string; quantity: number }>) => void;
}

const RecipeEditor = ({ pizzaId, existingIngredients, onSave }: RecipeEditorProps) => {
  const { data: inventory = [] } = useInventory();
  const [ingredients, setIngredients] = useState(
    existingIngredients.map(ing => ({
      ingredient_id: ing.ingredient_id,
      quantity: ing.quantity * 1000 // Convert kg to g for display
    }))
  );

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient_id: "", quantity: 0 }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: "ingredient_id" | "quantity", value: string | number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    };
    setIngredients(newIngredients);
  };

  const handleSave = () => {
    // Validate ingredients
    if (ingredients.some(ing => !ing.ingredient_id || ing.quantity <= 0)) {
      toast.error("Completa tutti i campi degli ingredienti");
      return;
    }

    // Convert grams back to kilograms before saving
    const convertedIngredients = ingredients.map(ing => ({
      ingredient_id: ing.ingredient_id,
      quantity: ing.quantity / 1000 // Convert g back to kg for storage
    }));

    onSave(convertedIngredients);
  };

  const getIngredientCost = (ingredientId: string, quantityInGrams: number) => {
    const ingredient = inventory.find(item => item.id === ingredientId);
    if (!ingredient) return 0;
    
    // Convert grams to kg for cost calculation
    const quantityInKg = quantityInGrams / 1000;
    return ingredient.cost_per_unit * quantityInKg;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-end gap-4">
            <div className="flex-1">
              <Label>Ingrediente</Label>
              <Select
                value={ingredient.ingredient_id}
                onValueChange={(value) => handleIngredientChange(index, "ingredient_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona ingrediente" />
                </SelectTrigger>
                <SelectContent>
                  {inventory.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} ({item.unit}) - €{item.cost_per_unit.toFixed(2)}/kg
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-32">
              <Label>Quantità (g)</Label>
              <Input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", parseFloat(e.target.value))}
                min="0"
                step="10"
              />
            </div>
            {ingredient.ingredient_id && (
              <div className="w-24 text-sm text-gray-500 pb-2">
                €{getIngredientCost(ingredient.ingredient_id, ingredient.quantity).toFixed(2)}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveIngredient(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleAddIngredient}
        >
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi Ingrediente
        </Button>
        <Button onClick={handleSave}>
          Salva Ricetta
        </Button>
      </div>
    </div>
  );
};

export default RecipeEditor;