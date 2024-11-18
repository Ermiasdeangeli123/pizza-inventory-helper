import CostSuggestions from "@/components/costs/CostSuggestions";
import WasteReport from "@/components/costs/WasteReport";
import SupplierPrices from "@/components/costs/SupplierPrices";

const Costs = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Gestione Costi</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <CostSuggestions />
        <WasteReport />
        <div className="md:col-span-2">
          <SupplierPrices />
        </div>
      </div>
    </div>
  );
};

export default Costs;