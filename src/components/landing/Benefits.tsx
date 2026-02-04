import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, PiggyBank, Brain } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Zeit sparen',
    description:
      'Alle Informationen an einem Ort. Kein Suchen mehr in Excel-Tabellen, E-Mails oder Papierstapeln.',
  },
  {
    icon: PiggyBank,
    title: 'Kosten im Griff',
    description:
      'Mit dem Budgetmonitor behalten Sie jede Ausgabe im Blick und vermeiden böse Überraschungen.',
  },
  {
    icon: Brain,
    title: 'Stressfrei bauen',
    description:
      'Klare Struktur und übersichtliche Aufgaben nehmen Ihnen den Stress aus dem Bauprojekt.',
  },
]

export function Benefits() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Warum hauspilot?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Konzentrieren Sie sich auf das Wesentliche – wir kümmern uns um die Organisation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white border-0 card-shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
