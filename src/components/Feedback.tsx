import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Per favore, inserisci il tuo feedback");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          { 
            content: feedback,
            user_id: session?.user?.id
          }
        ]);

      if (error) throw error;

      toast.success("Grazie per il tuo feedback!");
      setFeedback("");
    } catch (error) {
      toast.error("Si è verificato un errore. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
        <h3 className="font-semibold mb-2">Il tuo feedback è importante</h3>
        <Textarea
          placeholder="Condividi la tua esperienza con noi..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-2"
        />
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="w-full"
        >
          Invia Feedback
        </Button>
      </div>
    </div>
  );
};