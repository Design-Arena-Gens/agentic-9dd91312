import type { Expense, Query } from './types'
import { format, parseISO } from 'date-fns'

export function filterExpenses(expenses: Expense[], query: Query): Expense[] {
  const text = query.text.trim().toLowerCase()
  return expenses.filter((e) => {
    const d = parseISO(e.date)
    const year = String(d.getFullYear())
    const month = String(d.getMonth() + 1).padStart(2, '0')

    const matchesText =
      text.length === 0 ||
      e.note?.toLowerCase().includes(text) ||
      e.category.toLowerCase().includes(text)

    const matchesCategory = query.category === 'All' || e.category === query.category
    const matchesMonth = query.month === 'All' || query.month === month
    const matchesYear = query.year === 'All' || query.year === year

    return matchesText && matchesCategory && matchesMonth && matchesYear
  })
}

export function getTotalsByCategory(expenses: Expense[]): { labels: string[]; values: number[] } {
  const map = new Map<string, number>()
  for (const e of expenses) {
    map.set(e.category, (map.get(e.category) ?? 0) + e.amount)
  }
  const labels = Array.from(map.keys())
  const values = labels.map((k) => Number(map.get(k)?.toFixed(2) ?? 0))
  return { labels, values }
}

export function getMonthlySeries(expenses: Expense[]): { labels: string[]; values: number[] } {
  const map = new Map<string, number>()
  for (const e of expenses) {
    const key = format(parseISO(e.date), 'yyyy-MM')
    map.set(key, (map.get(key) ?? 0) + e.amount)
  }
  const labels = Array.from(map.keys()).sort()
  const values = labels.map((k) => Number(map.get(k)?.toFixed(2) ?? 0))
  return { labels, values }
}

export function getSummary(expenses: Expense[]) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const count = expenses.length
  const uniqueDays = new Set(expenses.map((e) => e.date)).size
  const avgPerDay = uniqueDays ? total / uniqueDays : 0
  return { total, count, avgPerDay }
}
