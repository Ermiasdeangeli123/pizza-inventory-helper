import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { 
  Clock, 
  TrendingUp, 
  CheckCircle2,
  Smartphone,
  Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import FAQSection from "@/components/landing/FAQSection";

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
      icon: Clock,
      title: "Risparmio di Tempo",
      description: "Automatizza la gestione dell'inventario e risparmia fino al 50% del tempo"
    },
    {
      icon: CheckCircle2,
      title: "Zero Errori",
      description: "Elimina gli errori manuali con la digitalizzazione completa"
    },
    {
      icon: TrendingUp,
      title: "Ottimizzazione Scorte",
      description: "Gestione intelligente con avvisi automatici e livelli minimi"
    },
    {
      icon: Calendar,
      title: "Gestione Scadenze",
      description: "Monitora le date di scadenza e riduci gli sprechi con notifiche automatiche"
    },
    {
      icon: Smartphone,
      title: "Accesso Ovunque",
      description: "Controlla il tuo business in tempo reale da qualsiasi dispositivo"
    }
  ];

  const testimonials = [
    {
      quote: "Da quando usiamo PizzaLova, risparmiamo ore ogni settimana nella gestione dell'inventario!",
      author: "Marco B.",
      role: "Proprietario Pizzeria Roma"
    },
    {
      quote: "Finalmente posso vedere in tempo reale quali sono le pizze più redditizie.",
      author: "Laura M.",
      role: "Manager Pizzeria Milano"
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
            La Soluzione Completa per Gestire la tua Pizzeria
          </h1>
          <p className="text-xl text-orange-900/70 mb-8">
            Gestisci il tuo inventario, il menu e i profitti in un'unica app. 
            Ottimizza il tuo business con strumenti professionali pensati per le pizzerie, 
            inclusa la gestione automatica delle scadenze per ridurre gli sprechi.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 transition-colors"
              onClick={handleGetStarted}
            >
              Prova Gratis per 30 Giorni
            </Button>
          </div>

          {/* Video Demo */}
          <div className="aspect-video bg-white rounded-xl shadow-lg mb-16">
            <iframe 
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/your-video-id"
              title="PizzaLova Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-orange-100">
              <feature.icon className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-red-700">{feature.title}</h3>
              <p className="text-orange-900/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">
            Cosa Dicono i Nostri Clienti
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg italic mb-4 text-gray-700">"{testimonial.quote}"</p>
                <p className="font-semibold text-red-700">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>

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
  );
};

export default Landing;
