'use client';

import { useSearchParams } from 'next/navigation';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { type BrandAssets } from '@/app/actions';
import { ResultsDisplay } from '@/components/results-display';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PitchPage({ params }: { params: { pitchId: string } }) {
  const { firestore, user } = useFirebase();

  const pitchRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid, 'startups', params.pitchId);
  }, [firestore, user, params.pitchId]);

  const { data: pitch, isLoading } = useDoc<BrandAssets>(pitchRef);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!pitch) {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Pitch Not Found
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            The pitch you are looking for does not exist or you do not have permission to view it.
            </p>
            <div className="mt-8">
            <Link href="/my-pitches">
                <Button>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to My Pitches
                </Button>
            </Link>
            </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/my-pitches">
            <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Back to My Pitches
            </Button>
            </Link>
        </div>
        <ResultsDisplay assets={pitch} />
    </div>
  );
}