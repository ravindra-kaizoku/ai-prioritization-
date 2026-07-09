import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import type { AnalyticsSummary } from '@/types/domain'

const colors = ['#2563eb', '#0ea5e9', '#38bdf8', '#60a5fa', '#93c5fd', '#1d4ed8']

export function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)

  useEffect(() => {
    void api.getAnalytics().then(setSummary)
  }, [])

  if (!summary) return <div className="rounded-md border bg-white p-6">Loading analytics...</div>

  return (
    <div className="grid gap-6">
      <div><h2 className="text-2xl font-bold text-slate-950">Analytics & Reports</h2><p className="text-muted-foreground">Category load, priority spread, and monthly resolution trend.</p></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Complaints by Category</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={summary.byCategory}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Priority Distribution</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={summary.byPriority} dataKey="value" nameKey="name" outerRadius={105} label>{summary.byPriority.map((item, index) => <Cell key={item.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Monthly Trend</CardTitle></CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={summary.trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="complaints" fill="#2563eb" radius={[6, 6, 0, 0]} /><Bar dataKey="resolved" fill="#38bdf8" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
