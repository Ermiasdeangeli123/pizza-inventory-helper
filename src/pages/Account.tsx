import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  currency: string;
}

const Account = () => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    last_name: "",
    currency: "EUR"
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!session?.user?.id) throw new Error("No user ID");

        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, currency")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            currency: data.currency || "EUR"
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
          first_name: profile.first_name,
          last_name: profile.last_name,
          currency: profile.currency,
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

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Il Tuo Profilo</h1>
        
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="first_name">Nome</Label>
            <Input
              id="first_name"
              type="text"
              value={profile.first_name || ""}
              onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Cognome</Label>
            <Input
              id="last_name"
              type="text"
              value={profile.last_name || ""}
              onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label>Valuta</Label>
            <RadioGroup
              value={profile.currency}
              onValueChange={(value) => setProfile({ ...profile, currency: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="EUR" id="eur" />
                <Label htmlFor="eur">Euro (€)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CHF" id="chf" />
                <Label htmlFor="chf">Franco Svizzero (CHF)</Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={updateProfile}>
            Aggiorna Profilo
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Account;