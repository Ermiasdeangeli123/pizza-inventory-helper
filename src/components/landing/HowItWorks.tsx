import { 
  ClipboardList, 
  LineChart, 
  ShoppingCart, 
  Pizza 
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: "Gestisci l'Inventario",
      description: "Tieni traccia di tutti gli ingredienti, con notifiche automatiche quando le scorte sono basse."
    },
    {
      icon: Pizza,
      title: "Crea il tuo Menu",
      description: "Aggiungi le tue pizze e gestisci le ricette. Il sistema calcola automaticamente i costi degli ingredienti."
    },
    {
      icon: ShoppingCart,
      title: "Lista della Spesa Intelligente",
      description: "Ricevi suggerimenti su cosa acquistare in base alle tue scorte e al consumo previsto."
    },
    {
      icon: LineChart,
      title: "Analisi e Report",
      description: "Monitora vendite, costi e profitti con grafici intuitivi e report dettagliati."
    }
  ];

  return (
    <div className="py-16 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-800">
          Come Funziona Tracciapizza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <step.icon className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-red-700">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};