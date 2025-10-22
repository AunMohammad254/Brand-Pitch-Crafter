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
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading) {
    return <Loader2 className="h-5 w-5 animate-spin" />;
  }

  if (user) {
    return (
      <>
        <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <UserIcon className="h-4 w-4"/>
            {user.email}
        </span>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <Link href="/login">
      <Button variant="ghost" size="sm">
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </Link>
  );
}
