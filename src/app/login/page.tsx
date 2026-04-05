'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('Connection failure. Initialise retry.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-primary/10 p-8 rounded-sm shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary tracking-tighter mb-2">COMMAND AUTHORISATION</h1>
          <p className="text-xs font-mono uppercase text-muted-foreground">Executive Credentials Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-primary/60 block">Identifier (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background border border-primary/20 p-3 text-muted focus:border-primary outline-none transition-colors font-mono text-sm"
              placeholder="operator@engineai.co.nz"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-primary/60 block">Access Code (Password)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-background border border-primary/20 p-3 text-muted focus:border-primary outline-none transition-colors font-mono text-sm"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono uppercase">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-mono font-bold py-3 uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Validating...' : 'Initialise Session'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="text-[10px] font-mono uppercase text-muted-foreground/40 leading-relaxed">
            Unauthorised access is strictly prohibited. All attempts are logged and audited via the Supervisor Agent.
          </p>
        </div>
      </div>
    </div>
  )
}
