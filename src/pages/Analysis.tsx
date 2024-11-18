import CostAnalysis from "@/components/dashboard/CostAnalysis";
import WasteReport from "@/components/dashboard/WasteReport";

const Analysis = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analisi</h1>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <CostAnalysis />
        <WasteReport />
      </div>
    </div>
  );
};

export default Analysis;