import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Le password non coincidono");
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            restaurant_name: restaurantName
          },
          emailRedirectTo: `${window.location.origin}/profits`
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('email') || signUpError.message.includes('Email')) {
          toast.error("Per lo sviluppo, è necessario abilitare la registrazione nella console Supabase. Vai su Authentication > Settings e disabilita 'Confirm email'.");
        } else {
          toast.error(signUpError.message);
        }
        return;
      }

      toast.success("Registrazione completata con successo! Controlla la tua email per confermare.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input 
              type="text"
              placeholder="Nome Pizzeria" 
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required 
            />
          </div>
          <div>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <Input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div>
            <Input 
              type="password" 
              placeholder="Conferma Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registrazione in corso..." : "Registrati"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Hai già un account?{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            Accedi
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;