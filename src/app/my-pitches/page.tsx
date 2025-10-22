'use client';

import { useEffect, useState, useMemo } from 'react';
import { type BrandAssets } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function MyPitchesPage() {
  const { toast } = useToast();
  const { user, isUserLoading, firestore } = useFirebase();
  const router = useRouter();

  const pitchesQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'users', user.uid, 'startups');
  }, [firestore, user]);

  const { data: pitches, isLoading: isLoadingPitches } = useCollection<BrandAssets>(pitchesQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const deletePitch = async (pitchId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(firestore, 'users', user.uid, 'startups', pitchId));
      toast({
          title: "Pitch Deleted",
          description: "The pitch has been removed from your saved list.",
      });
    } catch (error) {
        console.error("Error deleting pitch:", error);
        toast({
            title: "Error",
            description: "Could not delete the pitch. Please try again.",
            variant: "destructive",
        })
    }
  }

  if (isUserLoading || isLoadingPitches) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          My Pitches
        </h1>
        <Link href="/">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Pitch
            </Button>
        </Link>
      </div>

      {(!pitches || pitches.length === 0) ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-xl">
            <h2 className="font-headline text-xl font-semibold text-slate-700">No Saved Pitches Yet</h2>
            <p className="mt-2 text-slate-500">Start by generating a new pitch to see it here.</p>
            <div className="mt-6">
                <Link href="/">
                    <Button size="lg">Generate Your First Pitch</Button>
                </Link>
            </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pitches.map((pitch) => (
            <Card key={pitch.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{pitch.startupName}</CardTitle>
                <CardDescription>{pitch.taglines[0]}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-slate-600 line-clamp-3">{pitch.problem}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">{(pitch as any).niche || 'General'}</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/pitch/${pitch.id}`}>View Pitch</Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deletePitch(pitch.id!)}>
                    <Trash2 className="h-4 w-4 text-slate-500"/>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// We need a unique ID on brand assets
declare module '@/app/actions' {
    interface BrandAssets {
        id?: string;
    }
}
