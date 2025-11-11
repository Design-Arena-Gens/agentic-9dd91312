'use client'

import { useExpenseStore } from '@/lib/store'
import type { Expense } from '@/lib/types'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Pencil, Trash2, Save, X } from 'lucide-react'

export function ExpenseTable({ expenses }: { expenses: Expense[] }) {
  const deleteExpense = useExpenseStore((s) => s.deleteExpense)
  const updateExpense = useExpenseStore((s) => s.updateExpense)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Expense>>({})

  function startEdit(e: Expense) {
    setEditingId(e.id)
    setDraft({ ...e })
  }

  function save() {
    if (!editingId) return
    const { date, amount, category, note } = draft
    if (!date || !amount || !category) return
    updateExpense(editingId, {
      date,
      amount: Number(amount),
      category: String(category),
      note: note?.toString() || undefined,
    })
    setEditingId(null)
    setDraft({})
  }

  function cancel() {
    setEditingId(null)
    setDraft({})
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900/60">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3 text-left">Note</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-slate-400">No expenses yet.</td>
            </tr>
          )}
          {expenses.map((e) => (
            <tr key={e.id} className="hover:bg-slate-900/40">
              <td className="px-4 py-3 align-top">
                {editingId === e.id ? (
                  <input type="date" className="input" value={String(draft.date)} onChange={(ev) => setDraft((d) => ({ ...d, date: ev.target.value }))} />
                ) : (
                  <span>{format(parseISO(e.date), 'PP')}</span>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                {editingId === e.id ? (
                  <input type="text" className="input" value={String(draft.category)} onChange={(ev) => setDraft((d) => ({ ...d, category: ev.target.value }))} />
                ) : (
                  <span className="inline-flex items-center rounded-full bg-blue-600/20 text-blue-300 px-2 py-0.5">{e.category}</span>
                )}
              </td>
              <td className="px-4 py-3 text-right align-top">
                {editingId === e.id ? (
                  <input type="number" step="0.01" className="input text-right" value={String(draft.amount)} onChange={(ev) => setDraft((d) => ({ ...d, amount: Number(ev.target.value) }))} />
                ) : (
                  <span>${e.amount.toFixed(2)}</span>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                {editingId === e.id ? (
                  <input type="text" className="input" value={draft.note ?? ''} onChange={(ev) => setDraft((d) => ({ ...d, note: ev.target.value }))} />
                ) : (
                  <span className="text-slate-300">{e.note ?? '-'}</span>
                )}
              </td>
              <td className="px-4 py-3 text-right align-top">
                {editingId === e.id ? (
                  <div className="inline-flex gap-2">
                    <button className="btn btn-primary" onClick={save} type="button"><Save className="w-4 h-4 mr-1" />Save</button>
                    <button className="btn" onClick={cancel} type="button"><X className="w-4 h-4 mr-1" />Cancel</button>
                  </div>
                ) : (
                  <div className="inline-flex gap-2">
                    <button className="btn" onClick={() => startEdit(e)} type="button"><Pencil className="w-4 h-4 mr-1" />Edit</button>
                    <button className="btn text-red-300 hover:bg-red-500/10" onClick={() => deleteExpense(e.id)} type="button"><Trash2 className="w-4 h-4 mr-1" />Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
