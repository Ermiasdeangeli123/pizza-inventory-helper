import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import type { ProfilesTable } from "@/integrations/supabase/types/profiles";

interface Profile {
  restaurant_name: string | null;
}

const Account = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    restaurant_name: "",
  });
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!session?.user?.id) throw new Error("No user ID");

        const { data, error } = await supabase
          .from("profiles")
          .select("restaurant_name")
          .eq("id", session.user.id)
          .single<Pick<ProfilesTable['Row'], 'restaurant_name'>>();

        if (error) throw error;

        if (data) {
          setProfile({
            restaurant_name: data.restaurant_name,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session]);

  const updateProfile = async () => {
    try {
      if (!session?.user?.id) throw new Error("No user ID");

      const { error } = await supabase
        .from("profiles")
        .update({
          restaurant_name: profile.restaurant_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (error) throw error;
      toast.success("Profilo aggiornato con successo");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Errore nell'aggiornamento del profilo");
    }
  };

  const updatePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      setNewPassword("");
      toast.success("Password aggiornata con successo");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Errore nell'aggiornamento della password");
    }
  };

  const deleteAccount = async () => {
    try {
      if (!session?.user?.id) throw new Error("No user ID");

      // Delete profile (this will cascade to other user data)
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", session.user.id);

      if (profileError) throw profileError;

      // Sign out
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      navigate("/");
      toast.success("Account eliminato con successo");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Errore nell'eliminazione dell'account");
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Il Tuo Profilo</h1>
        
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="restaurant_name">Nome Pizzeria</Label>
            <Input
              id="restaurant_name"
              type="text"
              value={profile.restaurant_name || ""}
              onChange={(e) => setProfile({ ...profile, restaurant_name: e.target.value })}
              required 
            />
          </div>

          <Button onClick={updateProfile}>
            Aggiorna Profilo
          </Button>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Cambia Password</h2>
            <div className="grid gap-2">
              <Label htmlFor="new_password">Nuova Password</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <Button onClick={updatePassword} className="mt-2">
              Aggiorna Password
            </Button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Elimina Account</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Elimina Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Questa azione non può essere annullata. Eliminerà permanentemente il tuo account
                    e tutti i dati associati.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAccount} className="bg-red-600 hover:bg-red-700">
                    Elimina Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Account;