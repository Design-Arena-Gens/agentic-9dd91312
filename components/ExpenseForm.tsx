'use client'

import { useState } from 'react'
import { useExpenseStore } from '@/lib/store'
import { z } from 'zod'
import { format } from 'date-fns'

const schema = z.object({
  date: z.string().min(1),
  amount: z.string().transform((v) => Number(v)).refine((n) => !isNaN(n) && n > 0, 'Enter a positive number'),
  category: z.string().min(1),
  note: z.string().optional(),
})

export function ExpenseForm() {
  const addExpense = useExpenseStore((s) => s.addExpense)
  const [form, setForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    amount: '',
    category: 'General',
    note: '',
  })
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parse = schema.safeParse(form)
    if (!parse.success) {
      setError(parse.error.issues[0]?.message ?? 'Invalid input')
      return
    }
    const values = parse.data
    addExpense({
      date: values.date,
      amount: Number(values.amount),
      category: values.category.trim(),
      note: values.note?.trim() || undefined,
    })
    setForm({ date: format(new Date(), 'yyyy-MM-dd'), amount: '', category: 'General', note: '' })
    setError(null)
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-5 gap-3" onSubmit={onSubmit}>
      <div>
        <label className="label">Date</label>
        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="label">Amount</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          className="input"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="label">Category</label>
        <input
          type="text"
          className="input"
          placeholder="e.g., Food, Transport"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="label">Note</label>
        <input
          type="text"
          className="input"
          placeholder="optional note"
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
        />
      </div>
      <div className="md:col-span-5 flex items-end gap-3">
        <button type="submit" className="btn btn-primary">Add Expense</button>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    </form>
  )
}
