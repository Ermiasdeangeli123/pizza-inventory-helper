import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Store } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useInventory } from "@/queries/inventoryQueries";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const SupplierPrices = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const { data: inventory = [] } = useInventory();
  const session = useSession();

  const handleAddSupplier = async () => {
    if (!supplierName.trim()) {
      toast.error("Inserisci il nome del fornitore");
      return;
    }

    try {
      const { error } = await supabase
        .from("suppliers")
        .insert([
          {
            name: supplierName,
            user_id: session?.user?.id
          }
        ]);

      if (error) throw error;

      toast.success("Fornitore aggiunto con successo");
      setSupplierName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding supplier:", error);
      toast.error("Errore nell'aggiunta del fornitore");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Gestione Fornitori
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Aggiungi Fornitore
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Fornitore</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Fornitore</Label>
                <Input
                  id="name"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder="Es: Fornitore ABC"
                />
              </div>
              <Button onClick={handleAddSupplier} className="w-full">
                Aggiungi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {/* TODO: Implementare la visualizzazione dei fornitori e dei loro prezzi */}
        <p className="text-gray-500">
          Aggiungi i tuoi fornitori per iniziare a tracciare i prezzi degli ingredienti.
        </p>
      </CardContent>
    </Card>
  );
};

export default SupplierPrices;