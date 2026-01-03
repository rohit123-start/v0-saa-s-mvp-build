import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">WorkBoard</h1>
          <p className="text-muted-foreground">Sign in to your organization</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
