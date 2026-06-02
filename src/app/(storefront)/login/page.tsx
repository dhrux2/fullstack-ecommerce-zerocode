import LoginForm from '@/components/LoginForm'

export const metadata = {
  title: 'Login - ZERO CODE',
  description: 'Sign in to your ZERO CODE account.',
}

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center px-6">
      <LoginForm />
    </div>
  )
}
