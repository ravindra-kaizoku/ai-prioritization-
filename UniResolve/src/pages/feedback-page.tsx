import type { FormEvent } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await api.submitFeedback({ complaintId: String(data.get('complaintId')), rating: Number(data.get('rating')), comment: String(data.get('comment')) })
    setSubmitted(true)
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader><CardTitle>Feedback</CardTitle><CardDescription>Rate complaint handling quality after resolution.</CardDescription></CardHeader>
      <CardContent>
        {submitted ? <div className="rounded-md bg-green-50 p-4 text-sm font-semibold text-green-700">Feedback submitted successfully.</div> : (
          <form className="grid gap-4" onSubmit={submit}>
            <Input name="complaintId" placeholder="Complaint ID" required />
            <Input name="rating" type="number" min={1} max={5} placeholder="Rating from 1 to 5" required />
            <Textarea name="comment" rows={5} placeholder="Write your feedback" required />
            <Button type="submit">Submit feedback</Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
