import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  Plus,
  Trash2,
  Edit2,
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react'
import { useProject } from '@/contexts/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { EXPENSE_CATEGORIES } from '@/types'
import type { Expense } from '@/types'

export function Budget() {
  const { currentProject, expenses, createExpense, updateExpense, deleteExpense, updateProject } = useProject()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [expenseType, setExpenseType] = useState<'expense' | 'invoice' | 'offer'>('expense')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDate, setExpenseDate] = useState('')
  const [expenseCategory, setExpenseCategory] = useState<string>(EXPENSE_CATEGORIES[0])
  const [expenseNote, setExpenseNote] = useState('')
  const [newBudget, setNewBudget] = useState('')

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Kein Projekt ausgewählt</p>
      </div>
    )
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remainingBudget = currentProject.budget - totalExpenses
  const budgetUsedPercent = currentProject.budget > 0
    ? Math.min(100, Math.round((totalExpenses / currentProject.budget) * 100))
    : 0

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {}
    expenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount
    })
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [expenses])

  const handleAddExpense = () => {
    setEditingExpense(null)
    setExpenseType('expense')
    setExpenseAmount('')
    setExpenseDate(format(new Date(), 'yyyy-MM-dd'))
    setExpenseCategory(EXPENSE_CATEGORIES[0])
    setExpenseNote('')
    setDialogOpen(true)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setExpenseType(expense.type)
    setExpenseAmount(expense.amount.toString())
    setExpenseDate(format(expense.date, 'yyyy-MM-dd'))
    setExpenseCategory(expense.category)
    setExpenseNote(expense.note || '')
    setDialogOpen(true)
  }

  const handleSaveExpense = async () => {
    if (!expenseAmount || !expenseDate || !currentProject) return

    if (editingExpense) {
      await updateExpense(editingExpense.id, {
        type: expenseType,
        amount: parseFloat(expenseAmount),
        date: new Date(expenseDate),
        category: expenseCategory,
        note: expenseNote || undefined,
      })
    } else {
      await createExpense({
        projectId: currentProject.id,
        type: expenseType,
        amount: parseFloat(expenseAmount),
        date: new Date(expenseDate),
        category: expenseCategory,
        note: expenseNote || undefined,
      })
    }

    setDialogOpen(false)
  }

  const handleDeleteExpense = async (expenseId: string) => {
    await deleteExpense(expenseId)
  }

  const handleUpdateBudget = async () => {
    if (!newBudget || !currentProject) return
    await updateProject(currentProject.id, { budget: parseFloat(newBudget) })
    setBudgetDialogOpen(false)
  }

  const typeLabels: Record<string, string> = {
    expense: 'Ausgabe',
    invoice: 'Rechnung',
    offer: 'Angebot',
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Budget</h1>
          <p className="text-muted-foreground">
            {expenses.length} Einträge erfasst
          </p>
        </div>
        <Button variant="accent" onClick={handleAddExpense}>
          <Plus className="w-4 h-4 mr-2" />
          Neuer Eintrag
        </Button>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Gesamtbudget</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setNewBudget(currentProject.budget.toString())
                    setBudgetDialogOpen(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">
                  {currentProject.budget.toLocaleString('de-DE')} €
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Ausgaben</span>
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-destructive">
                  {totalExpenses.toLocaleString('de-DE')} €
                </span>
              </div>
              <Progress
                value={budgetUsedPercent}
                className={`h-2 mt-3 ${budgetUsedPercent > 90 ? '[&>div]:bg-destructive' : ''}`}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {budgetUsedPercent}% des Budgets verwendet
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Verbleibend</span>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-destructive' : 'text-success'}`}>
                  {remainingBudget.toLocaleString('de-DE')} €
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      {categoryTotals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ausgaben nach Kategorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryTotals.map(([category, amount]) => {
                  const percent = Math.round((amount / totalExpenses) * 100)
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          {amount.toLocaleString('de-DE')} € ({percent}%)
                        </span>
                      </div>
                      <Progress value={percent} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Expense List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alle Einträge</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {expenses.length > 0 ? (
              <ul className="divide-y">
                {expenses.map((expense) => (
                  <li
                    key={expense.id}
                    className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                          {expense.amount.toLocaleString('de-DE')} €
                        </span>
                        <Badge
                          variant={
                            expense.type === 'expense'
                              ? 'destructive'
                              : expense.type === 'invoice'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {typeLabels[expense.type]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{expense.category}</span>
                        <span>·</span>
                        <span>{format(expense.date, 'dd.MM.yyyy', { locale: de })}</span>
                        {expense.note && (
                          <>
                            <span>·</span>
                            <span className="truncate">{expense.note}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditExpense(expense)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Keine Einträge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Erfassen Sie Ihre erste Ausgabe oder Rechnung
                </p>
                <Button variant="accent" onClick={handleAddExpense}>
                  <Plus className="w-4 h-4 mr-2" />
                  Neuer Eintrag
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingExpense ? 'Eintrag bearbeiten' : 'Neuer Eintrag'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Art</Label>
              <Select value={expenseType} onValueChange={(v) => setExpenseType(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Ausgabe</SelectItem>
                  <SelectItem value="invoice">Rechnung</SelectItem>
                  <SelectItem value="offer">Angebot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Betrag (€)</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-date">Datum</Label>
                <Input
                  id="expense-date"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Kategorie</Label>
              <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-note">Notiz (optional)</Label>
              <Textarea
                id="expense-note"
                value={expenseNote}
                onChange={(e) => setExpenseNote(e.target.value)}
                placeholder="z.B. Rechnung Nr. 12345"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="accent" onClick={handleSaveExpense}>
              {editingExpense ? 'Speichern' : 'Erstellen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Budget Dialog */}
      <Dialog open={budgetDialogOpen} onOpenChange={setBudgetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Budget anpassen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-budget">Neues Budget (€)</Label>
              <Input
                id="new-budget"
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="0"
                min="0"
                step="1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBudgetDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="accent" onClick={handleUpdateBudget}>
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
