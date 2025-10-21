'use client';

import { useState } from 'react';
import { generateBrandAssets, type BrandAssets } from '@/app/actions';
import { BrandForm } from '@/components/brand-form';
import { ResultsDisplay } from '@/components/results-display';
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [assets, setAssets] = useState<BrandAssets | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setAssets(null);
    try {
      const result = await generateBrandAssets(formData);
      setAssets(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Failed to generate brand assets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Brand Visionary
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Turn your startup idea into a full-fledged brand identity. Fill out the form below to get started.
        </p>
      </div>

      <div className="mt-12 mx-auto max-w-4xl">
        <BrandForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
      
      {isLoading && (
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-headline text-2xl text-primary">Generating your brand...</p>
            <p className="text-foreground/70">This might take a moment. We're brewing up something special for you!</p>
        </div>
      )}

      {assets && (
        <div className="mt-12">
          <ResultsDisplay assets={assets} />
        </div>
      )}
    </main>
  );
}
