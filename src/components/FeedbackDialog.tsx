import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
}

export function FeedbackDialog({ open, onOpenChange, type }: FeedbackDialogProps) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("feedback").insert({
        content,
        rating,
        feedback_type: type,
      });

      if (error) throw error;

      toast.success("Grazie per il tuo feedback!");
      onOpenChange(false);
      setContent("");
      setRating(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Si è verificato un errore nell'invio del feedback");
    }
  };

  const questions = {
    inventory: "Come potremmo migliorare la gestione dell'inventario?",
    general: "Cosa potremmo fare per migliorare la tua esperienza?",
    costs: "Hai riscontrato difficoltà nel tenere traccia dei costi?",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Il tuo feedback è importante</DialogTitle>
          <DialogDescription>
            Aiutaci a migliorare TracciaPizza con il tuo feedback
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <Label>Come valuteresti la tua esperienza?</Label>
            <RadioGroup
              value={rating?.toString()}
              onValueChange={(value) => setRating(parseInt(value))}
              className="flex space-x-4"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                  <Label htmlFor={`rating-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label>{questions[type as keyof typeof questions]}</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
              placeholder="Scrivi qui il tuo feedback..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!content || !rating}>
            Invia Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}