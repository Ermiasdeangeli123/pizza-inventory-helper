import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import FAQSection from "@/components/landing/FAQSection";
import Logo from "@/components/Logo";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) throw error;

      toast.success("Grazie! Ti contatteremo presto.");
      setEmail("");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Si è verificato un errore. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <Logo className="h-8 w-8" />
          <span className="sr-only">Pizza Manager</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/login"
          >
            Accedi
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/register"
          >
            Registrati
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Gestisci la tua pizzeria con semplicità
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Monitora ricavi, costi e profitti in tempo reale. Ottimizza il tuo business con un gestionale intuitivo e completo.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form
                  className="flex space-x-2"
                  onSubmit={handleSubmit}
                >
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Inserisci la tua email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "..." : "Unisciti"}
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Unisciti alla lista d'attesa per accedere alla beta.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Caratteristiche Principali
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Tutto ciò di cui hai bisogno per gestire la tua pizzeria in modo efficiente.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <div className="p-2 bg-green-500 text-white rounded-full">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Gestione Finanziaria</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Monitora ricavi, costi e profitti in tempo reale per ogni pizza venduta.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <div className="p-2 bg-blue-500 text-white rounded-full">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Analisi delle Vendite</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Visualizza statistiche dettagliate e trend delle vendite per periodo.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <div className="p-2 bg-purple-500 text-white rounded-full">
                    <svg
                      className=" h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Gestione Inventario</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Tieni traccia degli ingredienti e ricevi notifiche per il riordino.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FAQSection />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Pizza Manager. Tutti i diritti riservati.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Termini di Servizio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Landing;