'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ArrowRight } from 'lucide-react'

export default function LoginForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              full_name: name,
            }
          },
        })
        if (error) throw error
        alert('Check your email for the confirmation link.')
      }
      router.push('/')
      router.refresh()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-12">
        <h1 className="font-outfit text-4xl uppercase tracking-tighter mb-2">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>
        <p className="font-nohemi text-sm text-[var(--color-sec-600)]">
          {isLogin
            ? 'Enter your details to access your account.'
            : 'Join to gain access to exclusive drops.'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-6">
        {!isLogin && (
          <div className="space-y-1">
            <label className="font-outfit text-xs uppercase tracking-widest text-[var(--color-sec-800)]">
              Full Name
            </label>
            <input
              type="text"
              required={!isLogin}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-[var(--color-sec-400)] py-3 px-1 font-nohemi text-lg focus:outline-none focus:border-[var(--color-primary-dark)] transition-colors placeholder:text-[var(--color-sec-400)]"
              placeholder="John Doe"
            />
          </div>
        )}
        <div className="space-y-1">
          <label className="font-outfit text-xs uppercase tracking-widest text-[var(--color-sec-800)]">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--color-sec-400)] py-3 px-1 font-nohemi text-lg focus:outline-none focus:border-[var(--color-primary-dark)] transition-colors placeholder:text-[var(--color-sec-400)]"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="font-outfit text-xs uppercase tracking-widest text-[var(--color-sec-800)]">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--color-sec-400)] py-3 px-1 font-nohemi text-lg focus:outline-none focus:border-[var(--color-primary-dark)] transition-colors placeholder:text-[var(--color-sec-400)]"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="text-red-500 font-nohemi text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 group relative overflow-hidden bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] rounded-full h-14 flex items-center justify-center disabled:opacity-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <span className="font-outfit text-xs uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </span>
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-nohemi text-sm text-[var(--color-sec-600)] hover:text-[var(--color-primary-dark)] transition-colors underline underline-offset-4"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}
