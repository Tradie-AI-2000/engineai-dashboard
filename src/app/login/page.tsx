'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

/**
 * Client-side validation for the login form. Mirrors what Supabase will
 * enforce server-side, but runs synchronously so the user gets a branded
 * inline error instead of the browser's native HTML5 validation tooltip
 * (which breaks the Tech Noir aesthetic).
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Identifier is required.' })
    .email({ message: 'Identifier must be a valid email address.' }),
  password: z.string().min(1, { message: 'Access code is required.' }),
})

/**
 * Map Supabase auth error messages to short, branded user-facing strings.
 *
 * Supabase returns network failures (placeholder URL, offline, DNS, etc)
 * as `{ error: { message: "Failed to fetch" } }`, not as a thrown
 * exception, so the same return path handles both bad-credentials and
 * service-unreachable failures. The original code surfaced raw
 * `error.message` which leaked browser-internal copy ("FAILED TO FETCH")
 * into the cockpit aesthetic and gave the user no useful diagnosis.
 */
function mapAuthError(rawMessage: string): string {
  const m = rawMessage.toLowerCase()
  if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('network request failed')) {
    return 'Authentication service unreachable. Check your connection and retry.'
  }
  if (m.includes('invalid login credentials') || m.includes('invalid credentials')) {
    return 'Invalid credentials. Verify your identifier and access code.'
  }
  if (m.includes('email not confirmed')) {
    return 'Email not verified. Check your inbox for the confirmation link.'
  }
  if (m.includes('rate limit') || m.includes('too many')) {
    return 'Too many attempts. Wait a moment before retrying.'
  }
  // Branded fallback rather than leaking raw provider copy.
  return 'Authentication failed. Please try again.'
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Client-side validate before hitting the network.
    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      // Show the first issue — short and direct, brand-friendly.
      setError(parsed.error.issues[0].message)
      return
    }

    setLoading(true)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      })

      if (authError) {
        setError(mapAuthError(authError.message))
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      // signInWithPassword should not throw, but guard anyway.
      setError(mapAuthError(err instanceof Error ? err.message : 'unknown'))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1f2228] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1f2228] border border-white/10 p-8 rounded-none">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-light font-mono text-white tracking-tighter mb-2 uppercase">COMMAND AUTHORISATION</h1>
          <p className="text-xs font-mono uppercase text-white/40">Executive Credentials Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label htmlFor="login-email" className="text-xs font-mono uppercase text-white/40 block">Identifier (Email)</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
              className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all font-mono text-sm rounded-none"
              placeholder="operator@engineai.co.nz"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="text-xs font-mono uppercase text-white/40 block">Access Code (Password)</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
              className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all font-mono text-sm rounded-none"
            />
          </div>

          {error && (
            <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono uppercase rounded-none">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-background font-mono font-light py-3 uppercase tracking-[0.1em] hover:bg-gold/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-none"
          >
            {loading ? 'Validating...' : 'Initialise Session'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] font-mono uppercase text-white/20 leading-relaxed">
            Unauthorised access is strictly prohibited. All attempts are logged and audited via the Supervisor Agent.
          </p>
        </div>
      </div>
    </div>
  )
}
