'use client'

import type { Query } from '@/lib/types'
import { useExpenseStore } from '@/lib/store'

export function Filters({ query, onChange }: { query: Query; onChange: (q: Query) => void }) {
  const categories = Array.from(new Set(useExpenseStore((s) => s.expenses.map((e) => e.category))))
  const years = Array.from(new Set(useExpenseStore((s) => s.expenses.map((e) => e.date.slice(0, 4)))))

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div>
        <label className="label">Search</label>
        <input
          className="input"
          placeholder="search note or category"
          value={query.text}
          onChange={(e) => onChange({ ...query, text: e.target.value })}
        />
      </div>
      <div>
        <label className="label">Category</label>
        <select className="select" value={query.category} onChange={(e) => onChange({ ...query, category: e.target.value })}>
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Month</label>
        <select className="select" value={query.month} onChange={(e) => onChange({ ...query, month: e.target.value })}>
          <option>All</option>
          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Year</label>
        <select className="select" value={query.year} onChange={(e) => onChange({ ...query, year: e.target.value })}>
          <option>All</option>
          {years.sort().map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
