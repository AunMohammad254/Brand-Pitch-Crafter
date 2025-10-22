
'use client';

import { useEffect, useState } from 'react';
import { type BrandAssets } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MyPitchesPage() {
  const [pitches, setPitches] = useState<BrandAssets[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedPitches = JSON.parse(localStorage.getItem('savedPitches') || '[]') as BrandAssets[];
    setPitches(savedPitches);
  }, []);

  const deletePitch = (pitchId: string) => {
    const updatedPitches = pitches.filter(p => p.id !== pitchId);
    setPitches(updatedPitches);
    localStorage.setItem('savedPitches', JSON.stringify(updatedPitches));
    toast({
        title: "Pitch Deleted",
        description: "The pitch has been removed from your saved list.",
    })
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

      {pitches.length === 0 ? (
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
