'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Expense } from './types'

export type ExpenseState = {
  expenses: Expense[]
  addExpense: (e: Omit<Expense, 'id'>) => void
  updateExpense: (id: string, e: Partial<Omit<Expense, 'id'>>) => void
  deleteExpense: (id: string) => void
  clearAll: () => void
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      addExpense: (e) =>
        set((s) => ({ expenses: [{ id: crypto.randomUUID(), ...e }, ...s.expenses] })),
      updateExpense: (id, e) =>
        set((s) => ({
          expenses: s.expenses.map((x) => (x.id === id ? { ...x, ...e } : x)),
        })),
      deleteExpense: (id) => set((s) => ({ expenses: s.expenses.filter((x) => x.id !== id) })),
      clearAll: () => set({ expenses: [] }),
    }),
    { name: 'expenses-store' }
  )
)
