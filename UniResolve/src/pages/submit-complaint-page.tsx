import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

const schema = z.object({ title: z.string().min(8), description: z.string().min(30), image: z.instanceof(FileList).optional() })
type ComplaintForm = z.infer<typeof schema>

export function SubmitComplaintPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm<ComplaintForm>({ resolver: zodResolver(schema) })

  async function onSubmit(values: ComplaintForm) {
    setLoading(true)
    const data = new FormData()
    data.append('title', values.title)
    data.append('description', values.description)
    const file = values.image?.item(0)
    if (file) data.append('image', file)
    const complaint = await api.createComplaint(data)
    navigate(`/student/complaints/${complaint.id}`)
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader><CardTitle>Submit Complaint</CardTitle><CardDescription>The AI service classifies the complaint, estimates urgency, and recommends the department.</CardDescription></CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="grid gap-2 text-sm font-semibold">Complaint title<Input placeholder="Example: Hostel water leakage near electrical board" {...form.register('title')} /></label>
          <label className="grid gap-2 text-sm font-semibold">Description<Textarea rows={7} placeholder="Describe the issue, affected location, urgency, and any safety concerns." {...form.register('description')} /></label>
          <label className="grid gap-2 text-sm font-semibold">Upload image<div className="rounded-md border border-dashed bg-slate-50 p-4"><div className="flex items-center gap-3 text-muted-foreground"><UploadCloud className="size-5" /><Input type="file" accept="image/*" {...form.register('image')} /></div></div></label>
          <Button disabled={loading} type="submit">{loading ? 'Submitting...' : 'Submit for AI review'}</Button>
        </form>
      </CardContent>
    </Card>
  )
}
