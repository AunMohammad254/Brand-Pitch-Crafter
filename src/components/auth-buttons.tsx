'use client';

import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, LogIn, LogOut, Loader2 } from 'lucide-react';
import { signOut } from 'firebase/auth';

export function AuthButtons() {
  const { user, auth, isUserLoading } = useFirebase();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <UserIcon className="h-4 w-4"/>
            <span className="truncate">{user.email}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full md:w-auto justify-start md:justify-center">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login" className="w-full">
      <Button variant="ghost" size="sm" className="w-full justify-start md:justify-center">
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </Link>
  );
}
