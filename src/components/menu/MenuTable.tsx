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
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

interface MenuTableProps {
  pizzas: Pizza[];
  onUpdatePizza: (id: string, updates: Partial<Pizza>) => void;
  onDeletePizza: (id: string) => void;
}

const MenuTable = ({ pizzas, onUpdatePizza, onDeletePizza }: MenuTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Pizza>>({});

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

  const handleDelete = (id: string) => {
    onDeletePizza(id);
    toast.success("Pizza eliminata con successo");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome Pizza</TableHead>
          <TableHead>Prezzo</TableHead>
          <TableHead>Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pizzas.map((pizza) => (
          <TableRow key={pizza.id}>
            <TableCell>
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
            <TableCell>
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
                `€${pizza.price.toFixed(2)}`
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
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
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MenuTable;