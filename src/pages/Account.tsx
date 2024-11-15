import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Account = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fetch user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile;
    }
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async ({ firstName, lastName }: { firstName: string; lastName: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { error } = await supabase
        .from('profiles')
        .update({ first_name: firstName, last_name: lastName })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success("Profilo aggiornato con successo");
    },
    onError: () => {
      toast.error("Errore durante l'aggiornamento del profilo");
    }
  });

  // Update password mutation
  const updatePassword = useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewPassword("");
      toast.success("Password aggiornata con successo");
    },
    onError: () => {
      toast.error("Errore durante l'aggiornamento della password");
    }
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({ firstName, lastName });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("La password deve essere di almeno 6 caratteri");
      return;
    }
    updatePassword.mutate(newPassword);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Caricamento...</div>;
  }

  return (
    <div className="container max-w-4xl py-8">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profilo</TabsTrigger>
          <TabsTrigger value="security">Sicurezza</TabsTrigger>
          <TabsTrigger value="subscription">Abbonamento</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profilo</CardTitle>
              <CardDescription>
                Gestisci le tue informazioni personali
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={profile?.first_name || "Inserisci il tuo nome"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Cognome</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={profile?.last_name || "Inserisci il tuo cognome"}
                  />
                </div>
                <Button type="submit">Aggiorna Profilo</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sicurezza</CardTitle>
              <CardDescription>
                Gestisci la tua password e le impostazioni di sicurezza
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nuova Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Inserisci la nuova password"
                  />
                </div>
                <Button type="submit">Aggiorna Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Abbonamento</CardTitle>
              <CardDescription>
                Gestisci il tuo abbonamento e i pagamenti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium">
                    Stato Abbonamento: {profile?.subscription_status === 'active' ? 'Attivo' : 'Gratuito'}
                  </h3>
                  {profile?.subscription_end_date && (
                    <p className="text-sm text-muted-foreground">
                      Scadenza: {new Date(profile.subscription_end_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button variant="outline" onClick={() => navigate("/pricing")}>
                  Gestisci Abbonamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;