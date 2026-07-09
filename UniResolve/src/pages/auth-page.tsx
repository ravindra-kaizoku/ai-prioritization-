import { zodResolver } from '@hookform/resolvers/zod'
import { BrainCircuit, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/features/auth/use-auth'
import type { UserRole } from '@/types/domain'

const schema = z.object({ name: z.string().min(2).optional(), email: z.email(), password: z.string().min(6), studentId: z.string().optional() })
type AuthValues = z.infer<typeof schema>

export function AuthPage({ mode = 'login' }: { mode?: 'login' | 'register' }) {
  const [role, setRole] = useState<UserRole>('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const form = useForm<AuthValues>({ resolver: zodResolver(schema), defaultValues: { email: 'student@uniresolve.edu', password: 'password123' } })

  async function onSubmit(values: AuthValues) {
    setLoading(true)
    setError('')
    try {
      if (mode === 'register') await register({ name: values.name ?? 'New User', email: values.email, password: values.password, role, studentId: values.studentId })
      else await login(values.email, values.password, role)
      navigate(role === 'admin' ? '/admin' : '/student')
    } catch {
      setError('Authentication failed. Please check the credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="flex items-center justify-center bg-primary p-8 text-white">
        <div className="max-w-xl">
          <div className="mb-8 flex size-14 items-center justify-center rounded-md bg-white/15"><BrainCircuit className="size-8" /></div>
          <h1 className="text-4xl font-bold tracking-tight">UniResolve</h1>
          <p className="mt-4 text-lg text-blue-50">AI-powered complaint classification, prioritization, and department routing for university grievance teams.</p>
          <div className="mt-8 grid gap-3 text-sm text-blue-50 sm:grid-cols-2">
            {['NLP classification', 'Priority queue', 'JWT access control', 'Analytics reports'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md bg-white/10 p-3"><ShieldCheck className="size-4" />{item}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{mode === 'register' ? 'Create account' : 'Welcome back'}</CardTitle>
            <CardDescription>Choose a role and continue to the complaint dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-md bg-muted p-1">
              {(['student', 'admin'] as UserRole[]).map((item) => (
                <button key={item} className={`rounded-md px-3 py-2 text-sm font-semibold capitalize ${role === item ? 'bg-white text-primary shadow-soft' : 'text-muted-foreground'}`} onClick={() => setRole(item)} type="button">
                  {item}
                </button>
              ))}
            </div>
            <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
              {mode === 'register' && <Input placeholder="Full name" {...form.register('name')} />}
              <Input placeholder="Email address" type="email" {...form.register('email')} />
              <Input placeholder="Password" type="password" {...form.register('password')} />
              {mode === 'register' && role === 'student' && <Input placeholder="Student ID" {...form.register('studentId')} />}
              {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <Button disabled={loading} type="submit">{loading ? 'Please wait...' : mode === 'register' ? 'Register' : 'Login'}</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {mode === 'register' ? 'Already registered?' : 'New student?'} <Link className="font-semibold text-primary" to={mode === 'register' ? '/login' : '/register'}>{mode === 'register' ? 'Login' : 'Create account'}</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
