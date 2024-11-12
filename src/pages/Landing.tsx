import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    toast.success("Benvenuto! Iniziamo a gestire la tua pizzeria.");
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Gestisci la Tua Pizzeria con Facilità
          </h1>
          <p className="text-xl text-orange-900/70 mb-8">
            La soluzione completa per gestire inventario, costi e profitti della tua pizzeria
          </p>
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 transition-colors"
          >
            Inizia Ora
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
            <h3 className="text-2xl font-semibold mb-4 text-red-700">Gestione Inventario</h3>
            <p className="text-orange-900/70">
              Tieni traccia di tutti i tuoi ingredienti in tempo reale. Mai più scorte esaurite o sprechi.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
            <h3 className="text-2xl font-semibold mb-4 text-red-700">Controllo Costi</h3>
            <p className="text-orange-900/70">
              Monitora e ottimizza i costi degli ingredienti. Massimizza i tuoi margini di profitto.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
            <h3 className="text-2xl font-semibold mb-4 text-red-700">Analisi Profitti</h3>
            <p className="text-orange-900/70">
              Visualizza report dettagliati sui tuoi profitti e identifica opportunità di crescita.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-red-800">Perché Scegliere PizzaBot?</h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="text-red-600 mr-2">✓</span>
              <span className="text-orange-900/80">Interfaccia intuitiva e facile da usare</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-600 mr-2">✓</span>
              <span className="text-orange-900/80">Aggiornamenti in tempo reale dell'inventario</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-600 mr-2">✓</span>
              <span className="text-orange-900/80">Calcolo automatico dei profitti</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-600 mr-2">✓</span>
              <span className="text-orange-900/80">Supporto clienti dedicato</span>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 transition-colors"
          >
            Inizia a Gestire la Tua Pizzeria
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;