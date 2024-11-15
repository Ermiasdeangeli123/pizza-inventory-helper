import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Posso personalizzare il menu?",
      answer: "Sì, puoi aggiungere, modificare e rimuovere pizze dal menu in qualsiasi momento, incluse ricette e prezzi."
    },
    {
      question: "Come posso monitorare i profitti?",
      answer: "Tracciapizza calcola automaticamente i costi degli ingredienti e i margini di profitto per ogni pizza venduta."
    },
    {
      question: "L'app è facile da usare?",
      answer: "Assolutamente! Tracciapizza è stata progettata per essere estremamente intuitiva. Con un'interfaccia semplice e chiara, anche chi non è esperto di tecnologia può gestire facilmente la propria pizzeria."
    },
    {
      question: "Come gestisce l'inventario?",
      answer: "L'app tiene traccia automaticamente di tutti gli ingredienti, aggiornando le quantità dopo ogni vendita e avvisandoti quando le scorte sono basse."
    },
    {
      question: "Posso vedere le statistiche delle vendite?",
      answer: "Sì, hai accesso a statistiche dettagliate sulle vendite, inclusi i periodi più redditizi e le pizze più popolari."
    },
    {
      question: "Supporta più dispositivi?",
      answer: "Tracciapizza funziona su smartphone, tablet e computer, permettendoti di gestire la tua pizzeria ovunque tu sia."
    },
    {
      question: "Quanto tempo mi farà risparmiare?",
      answer: "Molti nostri clienti risparmiano fino a 10 ore a settimana grazie all'automazione della gestione dell'inventario e delle vendite."
    },
    {
      question: "Come funziona il supporto clienti?",
      answer: "Offriamo supporto via email e chat per aiutarti con qualsiasi domanda o problema tu possa avere."
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-800">
        Domande Frequenti
      </h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-red-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;