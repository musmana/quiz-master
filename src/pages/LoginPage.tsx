import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from
'../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, User, Shield } from 'lucide-react';
import { cn } from '../lib/utils';
export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    }, 1000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-teal-600 rounded-xl flex items-center justify-center">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue your learning journey
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials.
            </CardDescription>

            {/* Role Toggle */}
            <div className="flex mt-4 bg-slate-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
                  role === 'user' ?
                  'bg-white text-teal-600 shadow-sm' :
                  'text-slate-500 hover:text-slate-700'
                )}>

                <User className="h-4 w-4" />
                User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
                  role === 'admin' ?
                  'bg-white text-teal-600 shadow-sm' :
                  'text-slate-500 hover:text-slate-700'
                )}>

                <Shield className="h-4 w-4" />
                Admin
              </button>
            </div>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {role === 'admin' &&
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                  <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Admin access grants full control over quizzes, users, and
                    analytics. Use{' '}
                    <span className="font-medium">admin@quizmaster.com</span> to
                    sign in.
                  </p>
                </div>
              }
              <Input
                label="Email"
                type="email"
                placeholder={
                role === 'admin' ? 'admin@quizmaster.com' : 'name@example.com'
                }
                required />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-teal-600 hover:text-teal-500">

                    Forgot password?
                  </Link>
                </div>
                <Input type="password" placeholder="••••••••" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" isLoading={isLoading}>
                {role === 'admin' ? 'Sign in as Admin' : 'Sign in'}
              </Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" type="button">
                  Google
                </Button>
                <Button variant="outline" type="button">
                  Facebook
                </Button>
              </div>
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-teal-600 hover:text-teal-500">

                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>);

}