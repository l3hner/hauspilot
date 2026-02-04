import { motion } from 'framer-motion'
import {
  Layers,
  Calendar,
  Wallet,
  BookOpen,
  TrendingUp,
  Shield,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Layers,
    title: 'Bauphasen-Tracker',
    description:
      'Verfolgen Sie alle 10 Bauphasen mit detaillierten Aufgabenlisten und sehen Sie Ihren Fortschritt auf einen Blick.',
  },
  {
    icon: Calendar,
    title: 'Terminplaner',
    description:
      'Behalten Sie alle wichtigen Termine im Blick – von Baustellenterminen bis zu Behördengängen.',
  },
  {
    icon: Wallet,
    title: 'Budgetmonitor',
    description:
      'Erfassen Sie alle Ausgaben und Rechnungen. So behalten Sie Ihr Budget jederzeit unter Kontrolle.',
  },
  {
    icon: BookOpen,
    title: 'Bautagebuch',
    description:
      'Dokumentieren Sie den Baufortschritt mit Texten und Fotos. Perfekt für die Nachverfolgung.',
  },
  {
    icon: TrendingUp,
    title: 'Dashboard',
    description:
      'Alle wichtigen Informationen auf einen Blick: Fortschritt, nächste Aufgaben, Budget und Termine.',
  },
  {
    icon: Shield,
    title: 'Ratgeber',
    description:
      'Hilfreiche Artikel zu Planung, Finanzierung, Verträgen und Baurecht – immer griffbereit.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Alles, was Sie für Ihren Hausbau brauchen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            hauspilot bietet Ihnen alle Werkzeuge, um Ihr Bauprojekt
            erfolgreich zu managen – komplett kostenlos.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
