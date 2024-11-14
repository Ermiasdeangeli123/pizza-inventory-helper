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
import { MinusIcon, PlusIcon } from "lucide-react";

interface SalesTableProps {
  pizzas: Pizza[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const SalesTable = ({ pizzas, onIncrement, onDecrement }: SalesTableProps) => {
  return (
    <div className="overflow-hidden">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pizza</TableHead>
              <TableHead className="text-right">Vendute</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pizzas.map((pizza) => (
              <TableRow key={pizza.id}>
                <TableCell className="min-w-[120px] font-medium">{pizza.name}</TableCell>
                <TableCell className="text-right min-w-[160px]">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onDecrement(pizza.id)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center">
                      {pizza.count || 0}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onIncrement(pizza.id)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;