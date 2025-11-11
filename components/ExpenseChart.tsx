'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export function ExpenseChart({
  totalsByCategory,
  monthlySeries,
}: {
  totalsByCategory: { labels: string[]; values: number[] }
  monthlySeries: { labels: string[]; values: number[] }
}) {
  const donutData = {
    labels: totalsByCategory.labels,
    datasets: [
      {
        data: totalsByCategory.values,
        backgroundColor: [
          '#60a5fa',
          '#34d399',
          '#f472b6',
          '#f59e0b',
          '#a78bfa',
          '#fca5a5',
          '#22d3ee',
        ],
        borderColor: '#0f172a',
      },
    ],
  }

  const lineData = {
    labels: monthlySeries.labels,
    datasets: [
      {
        label: 'Monthly Total',
        data: monthlySeries.values,
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96,165,250,0.2)',
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">By Category</h3>
        {totalsByCategory.labels.length > 0 ? (
          <Doughnut data={donutData} />
        ) : (
          <div className="text-slate-400 text-sm">Add expenses to see the chart.</div>
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-3">Monthly Trend</h3>
        {monthlySeries.labels.length > 0 ? (
          <Line data={lineData} />
        ) : (
          <div className="text-slate-400 text-sm">Add expenses to see the chart.</div>
        )}
      </div>
    </div>
  )
}
