'use client'

import { Suspense, useMemo, useState } from 'react'
import { ExpenseForm } from '@/components/ExpenseForm'
import { ExpenseTable } from '@/components/ExpenseTable'
import { Filters } from '@/components/Filters'
import { SummaryCards } from '@/components/SummaryCards'
import { ExpenseChart } from '@/components/ExpenseChart'
import { useExpenseStore } from '@/lib/store'
import { filterExpenses, getMonthlySeries, getTotalsByCategory } from '@/lib/stats'

export default function Page() {
  // Client page to keep things simple for localStorage
  const expenses = useExpenseStore((s) => s.expenses)
  const [query, setQuery] = useState({
    text: '',
    category: 'All',
    month: 'All',
    year: 'All',
  })

  const filtered = useMemo(() => filterExpenses(expenses, query), [expenses, query])
  const totalsByCategory = useMemo(() => getTotalsByCategory(filtered), [filtered])
  const monthlySeries = useMemo(() => getMonthlySeries(filtered), [filtered])

  return (
    <main className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-4">
            <ExpenseForm />
          </div>
          <div className="card p-4">
            <Filters query={query} onChange={setQuery} />
          </div>
          <div className="card p-0 overflow-hidden">
            <ExpenseTable expenses={filtered} />
          </div>
        </div>
        <div className="space-y-6">
          <SummaryCards expenses={filtered} />
          <div className="card p-4">
            <ExpenseChart totalsByCategory={totalsByCategory} monthlySeries={monthlySeries} />
          </div>
        </div>
      </div>
    </main>
  )
}
