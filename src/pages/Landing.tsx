import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { initialInventory } from "@/lib/data";

const Landing = () => {
  const navigate = useNavigate();

  const handleAddToInventory = () => {
    // In a real application, this would be handled by a backend
    // For now, we'll just navigate to inventory
    toast.success("Prodotti aggiunti all'inventario!");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Forniture per Pizzerie</h1>
        <p className="text-xl text-gray-600">Ingredienti di alta qualità per la tua pizzeria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialInventory.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">
              {item.quantity} {item.unit} disponibili
            </p>
            <p className="text-lg font-bold mb-4">€{item.costPerUnit.toFixed(2)}/{item.unit}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>✓ Qualità Premium</p>
              <p>✓ Consegna Rapida</p>
              <p>✓ Prezzo Competitivo</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button 
          onClick={handleAddToInventory}
          className="text-lg px-8 py-6"
        >
          Aggiungi Tutti i Prodotti al Tuo Inventario
        </Button>
      </div>
    </div>
  );
};

export default Landing;