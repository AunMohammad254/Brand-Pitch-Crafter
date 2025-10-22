
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/app';


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { auth, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = (data: LoginFormValues) => {
    setAuthError(null);
    if (isSigningUp) {
      initiateEmailSignUp(auth, data.email, data.password, (error) => {
        let errorMessage = 'An unexpected error occurred. Please try again.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use. Please try signing in.';
        }
        setAuthError(errorMessage);
      });
    } else {
      initiateEmailSignIn(auth, data.email, data.password, (error) => {
        let errorMessage = 'An unexpected error occurred. Please try again.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid email or password. Please try again.';
        }
        setAuthError(errorMessage);
      });
    }
  };
  

  if (isUserLoading || user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100/50 to-indigo-200/50 dark:from-purple-950 dark:to-indigo-950">
      <Card className="w-full max-w-md shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">
            {isSigningUp ? 'Create an Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isSigningUp ? 'Sign up to start creating your startup pitches.' : 'Sign in to access your pitches.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isSigningUp ? <UserPlus /> : <LogIn />}
              {isSigningUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => {
                setIsSigningUp(!isSigningUp);
                setAuthError(null);
              }}
              className="text-primary hover:underline"
            >
              {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
