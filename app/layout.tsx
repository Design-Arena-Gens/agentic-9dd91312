import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Expenses Dashboard',
  description: 'Track and manage your expenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Expenses Dashboard</h1>
            <p className="text-slate-400">Manage expenses, track categories, and view insights.</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
