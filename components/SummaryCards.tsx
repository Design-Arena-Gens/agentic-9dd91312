'use client'

import type { Expense } from '@/lib/types'
import { getSummary } from '@/lib/stats'

export function SummaryCards({ expenses }: { expenses: Expense[] }) {
  const { total, count, avgPerDay } = getSummary(expenses)
  const cards = [
    { label: 'Total Spent', value: `$${total.toFixed(2)}` },
    { label: 'Entries', value: String(count) },
    { label: 'Avg / Day', value: `$${avgPerDay.toFixed(2)}` },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="card p-4">
          <div className="text-slate-400 text-sm">{c.label}</div>
          <div className="text-2xl font-semibold">{c.value}</div>
        </div>
      ))}
    </div>
  )
}
