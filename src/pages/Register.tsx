import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Registrazione completata con successo!");
    navigate("/profits");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input type="text" placeholder="Nome" required />
          </div>
          <div>
            <Input type="email" placeholder="Email" required />
          </div>
          <div>
            <Input type="password" placeholder="Password" required />
          </div>
          <div>
            <Input type="password" placeholder="Conferma Password" required />
          </div>
          <Button type="submit" className="w-full">Registrati</Button>
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