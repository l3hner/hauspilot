import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Ist hauspilot wirklich kostenlos?',
    answer:
      'Ja, hauspilot ist zu 100% kostenlos. Alle Funktionen stehen Ihnen uneingeschränkt zur Verfügung. Es gibt keine versteckten Kosten oder Premium-Features.',
  },
  {
    question: 'Muss ich eine App installieren?',
    answer:
      'Nein, hauspilot läuft komplett im Browser. Sie können es auf jedem Gerät nutzen – PC, Tablet oder Smartphone. Einfach einloggen und loslegen.',
  },
  {
    question: 'Wie sicher sind meine Daten?',
    answer:
      'Ihre Daten werden sicher in der Cloud gespeichert und verschlüsselt übertragen. Wir nehmen Datenschutz ernst und halten uns an die DSGVO.',
  },
  {
    question: 'Kann ich mehrere Bauprojekte verwalten?',
    answer:
      'Ja, Sie können beliebig viele Projekte anlegen und zwischen ihnen wechseln. Perfekt, wenn Sie mehrere Bauprojekte gleichzeitig betreuen.',
  },
  {
    question: 'Wie funktioniert der Bauphasen-Tracker?',
    answer:
      'hauspilot unterteilt Ihr Bauprojekt in 10 Standardphasen – von der Erstberatung bis zur Übergabe. Für jede Phase können Sie Aufgaben anlegen, abhaken und Ihren Fortschritt verfolgen.',
  },
  {
    question: 'Kann ich hauspilot auch während der Bauphase starten?',
    answer:
      'Absolut! Sie können jederzeit einsteigen und Ihre aktuelle Bauphase als Startpunkt wählen. Tragen Sie einfach Ihre bisherigen Daten nach.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
            >
              Häufige Fragen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Hier finden Sie Antworten auf die wichtigsten Fragen.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-border/50 px-6 card-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
