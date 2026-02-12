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
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, CheckCircle } from 'lucide-react';
export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-teal-600 rounded-xl flex items-center justify-center">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            We'll send you instructions to reset your password
          </p>
        </div>

        <Card>
          {!isSubmitted ?
          <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Forgot Password?</CardTitle>
                <CardDescription>
                  Enter the email address associated with your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Send Reset Link
                </Button>
                <Link
                to="/login"
                className="flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900">

                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Link>
              </CardFooter>
            </form> :

          <div className="p-6 text-center space-y-6">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  Check your email
                </h3>
                <p className="text-slate-500 text-sm">
                  We've sent a password reset link to{' '}
                  <span className="font-medium text-slate-900">{email}</span>
                </p>
              </div>
              <Button
              className="w-full"
              variant="outline"
              onClick={() => setIsSubmitted(false)}>

                Try another email
              </Button>
              <Link
              to="/login"
              className="flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900">

                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
              </Link>
            </div>
          }
        </Card>
      </div>
    </div>);

}