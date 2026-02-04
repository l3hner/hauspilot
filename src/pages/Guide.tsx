import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { articles, categoryLabels } from '@/data/articles'
import type { Article } from '@/types'

export function Guide() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const categories = Object.keys(categoryLabels) as Article['category'][]

  if (selectedArticle) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Button
          variant="ghost"
          onClick={() => setSelectedArticle(null)}
          className="-ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </Button>

        <article className="max-w-3xl">
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {categoryLabels[selectedArticle.category]}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{selectedArticle.readTime} Min. Lesezeit</span>
            </div>
          </header>

          <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
            {selectedArticle.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {line.slice(2)}
                  </h1>
                )
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {line.slice(3)}
                  </h2>
                )
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
                    {line.slice(4)}
                  </h3>
                )
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={index} className="ml-4">
                    {line.slice(2)}
                  </li>
                )
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold mt-4">
                    {line.slice(2, -2)}
                  </p>
                )
              }
              if (line.trim() === '') {
                return <br key={index} />
              }
              return (
                <p key={index} className="mb-3">
                  {line}
                </p>
              )
            })}
          </div>
        </article>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Ratgeber</h1>
        <p className="text-muted-foreground">
          Hilfreiche Artikel rund um Ihren Hausbau
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="planung">
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {categoryLabels[category]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const categoryArticles = articles.filter(
              (a) => a.category === category
            )

            return (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {article.readTime} Min.
                            </span>
                          </div>
                          <CardTitle className="text-lg leading-snug">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {article.summary}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </motion.div>
    </div>
  )
}
