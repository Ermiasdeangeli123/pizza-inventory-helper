import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EuroIcon, TrendingUpIcon, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Pizza = {
  id: string;
  name: string;
  price: number;
  count: number;
};

const initialPizzas: Pizza[] = [
  { id: "margherita", name: "Margherita", price: 8, count: 0 },
  { id: "marinara", name: "Marinara", price: 7, count: 0 },
  { id: "diavola", name: "Diavola", price: 9, count: 0 },
  { id: "capricciosa", name: "Capricciosa", price: 10, count: 0 },
  { id: "quattro-formaggi", name: "4 Formaggi", price: 11, count: 0 },
];

const Sales = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas);
  const [newPizzaName, setNewPizzaName] = useState("");
  const [newPizzaPrice, setNewPizzaPrice] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNewPizza = () => {
    if (!newPizzaName || !newPizzaPrice) {
      toast.error("Inserisci nome e prezzo della pizza");
      return;
    }

    const price = parseFloat(newPizzaPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Inserisci un prezzo valido");
      return;
    }

    const newPizza: Pizza = {
      id: newPizzaName.toLowerCase().replace(/\s+/g, '-'),
      name: newPizzaName,
      price: price,
      count: 0,
    };

    setPizzas(prev => [...prev, newPizza]);
    setNewPizzaName("");
    setNewPizzaPrice("");
    setIsDialogOpen(false);
    toast.success("Pizza aggiunta con successo");
  };

  const handleIncrement = (id: string) => {
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      )
    );
    toast.success("Vendita registrata");
  };

  const handleDecrement = (id: string) => {
    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza.id === id && pizza.count > 0
          ? { ...pizza, count: pizza.count - 1 }
          : pizza
      )
    );
  };

  const totalRevenue = pizzas.reduce(
    (acc, pizza) => acc + pizza.price * pizza.count,
    0
  );
  const totalSales = pizzas.reduce((acc, pizza) => acc + pizza.count, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Conteggio Vendite</h1>
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

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-full">
                <EuroIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Incasso Totale</p>
                <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <TrendingUpIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pizze Vendute</p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pizza</TableHead>
                <TableHead>Prezzo</TableHead>
                <TableHead>Vendute</TableHead>
                <TableHead>Totale</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pizzas.map((pizza) => (
                <TableRow key={pizza.id}>
                  <TableCell className="font-medium">{pizza.name}</TableCell>
                  <TableCell>€{pizza.price.toFixed(2)}</TableCell>
                  <TableCell>{pizza.count}</TableCell>
                  <TableCell>€{(pizza.price * pizza.count).toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecrement(pizza.id)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={pizza.count}
                        className="w-20 text-center"
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncrement(pizza.id)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Sales;