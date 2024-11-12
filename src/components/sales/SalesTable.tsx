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

interface SalesTableProps {
  pizzas: Pizza[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const SalesTable = ({ pizzas, onIncrement, onDecrement }: SalesTableProps) => {
  return (
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
            <TableCell>{pizza.count || 0}</TableCell>
            <TableCell>€{(pizza.price * (pizza.count || 0)).toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDecrement(pizza.id)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={pizza.count || 0}
                  className="w-20 text-center"
                  readOnly
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onIncrement(pizza.id)}
                >
                  +
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesTable;