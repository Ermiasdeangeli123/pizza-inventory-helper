import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { 
  Clock, 
  TrendingUp, 
  DollarSign,
  Smartphone,
  Calendar,
  ChartBar,
  ClipboardList,
  Calculator,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import FAQSection from "@/components/landing/FAQSection";
import { HowItWorks } from "@/components/landing/HowItWorks";

const Landing = () => {
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    toast.success("Benvenuto! Iniziamo a gestire la tua pizzeria.");
    window.location.href = "/register";
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Inserisci un'email valida");
      return;
    }

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) throw error;

      toast.success("Grazie per l'iscrizione! Ti terremo aggiornato.");
      setEmail("");
    } catch (error) {
      toast.error("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const features = [
    {
      icon: ChartBar,
      title: "Dashboard Vendite",
      description: "Analizza le tue vendite giornaliere, settimanali e mensili"
    },
    {
      icon: ClipboardList,
      title: "Gestione Scorte",
      description: "Traccia gli ingredienti in tempo reale e ricevi notifiche di riordino"
    },
    {
      icon: Calculator,
      title: "Analisi dei Costi",
      description: "Calcola i costi per ogni pizza e ottimizza i margini"
    },
    {
      icon: Lightbulb,
      title: "Consigli per Risparmio",
      description: "Suggerimenti per ridurre i costi e migliorare la produttività"
    }
  ];

  const benefits = [
    {
      title: "Riduzione Sprechi",
      description: "Riduzione del 20% degli sprechi grazie al monitoraggio degli ingredienti"
    },
    {
      title: "Aumento Profitti",
      description: "Aumento del 15% nei profitti ottimizzando le tue operazioni"
    },
    {
      title: "Risparmio Tempo",
      description: "Risparmio di tempo con report automatizzati e dashboard intuitive"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Ottimizza la tua Pizzeria con Tracciapizza
          </h1>
          <p className="text-xl text-orange-900/70 mb-8">
            Riduci i Costi, Aumenta i Profitti, e Semplifica la Gestione del Tuo Inventario
          </p>
          <p className="text-lg text-orange-900/70 mb-12">
            La piattaforma completa per monitorare ingredienti, vendite e costi operativi. 
            Scopri come aumentare la produttività del tuo ristorante.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 transition-colors"
              onClick={handleGetStarted}
            >
              Prova Gratis
            </Button>
          </div>

          {/* Problem Section */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-orange-100 mb-16">
            <h2 className="text-3xl font-bold mb-4 text-red-800">
              Stanco di sprechi e margini di profitto ridotti?
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Gestire una pizzeria può essere complicato, soprattutto quando si tratta di tenere 
              sotto controllo i costi degli ingredienti, monitorare l'inventario e ottimizzare i profitti. 
              Tracciapizza è qui per aiutarti!
            </p>
          </div>

          {/* Solution Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-red-800">Cosa offre Tracciapizza:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
                <h3 className="text-xl font-semibold mb-2 text-red-700">Gestione dell'Inventario</h3>
                <p className="text-orange-900/70">Traccia in tempo reale le scorte e riduci gli sprechi.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
                <h3 className="text-xl font-semibold mb-2 text-red-700">Analisi dei Costi degli Ingredienti</h3>
                <p className="text-orange-900/70">Ottimizza l'acquisto e l'uso degli ingredienti per migliorare i margini di profitto.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
                <h3 className="text-xl font-semibold mb-2 text-red-700">Report di Vendita Intelligenti</h3>
                <p className="text-orange-900/70">Scopri quali pizze performano meglio e prendi decisioni basate sui dati.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
                <h3 className="text-xl font-semibold mb-2 text-red-700">Suggerimenti di Ottimizzazione</h3>
                <p className="text-orange-900/70">Ricevi consigli personalizzati per migliorare la gestione del tuo ristorante.</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-red-800">Benefici per i Ristoranti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
                  <h3 className="text-xl font-semibold mb-2 text-red-700">{benefit.title}</h3>
                  <p className="text-orange-900/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <HowItWorks />

          {/* Add spacing before FAQ Section */}
          <div className="my-16"></div>

          {/* FAQ Section */}
          <FAQSection />
          
          {/* Newsletter Section */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-red-800">
              Resta Aggiornato
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Iscriviti alla nostra newsletter per ricevere consigli sulla gestione della tua pizzeria
            </p>
            <form onSubmit={handleWaitlist} className="flex gap-4 justify-center">
              <Input
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm"
              />
              <Button type="submit">Iscriviti</Button>
            </form>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 transition-colors"
            >
              Inizia Ora la Prova Gratuita
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;