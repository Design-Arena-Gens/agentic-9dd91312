export type Expense = {
  id: string
  date: string // ISO date string (yyyy-MM-dd)
  amount: number
  category: string
  note?: string
}

export type Query = {
  text: string
  category: string
  month: string
  year: string
}
