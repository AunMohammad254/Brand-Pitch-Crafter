'use client';

import { useState } from 'react';
import { generateBrandAssets, type BrandAssets } from '@/app/actions';
import { BrandForm } from '@/components/brand-form';
import { ResultsDisplay } from '@/components/results-display';
import { useToast } from "@/hooks/use-toast"
import { Loader2, Bot, Pencil, CheckCircle, FileCheck, Save, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      const resultsSection = document.getElementById('results-section');
      if(resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
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

  const steps = [
    { name: 'Describe Idea', icon: CheckCircle, status: 'complete' },
    { name: 'Generate', icon: CheckCircle, status: 'complete' },
    { name: 'Review & Save', icon: FileCheck, status: 'current' },
  ];

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-300 to-indigo-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="flex flex-col items-start gap-8">
            <div className="w-full">
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to My Pitches
                    </Button>
                </div>
                <div className="flex items-center justify-center p-2 rounded-full bg-slate-100 border border-slate-200 w-full max-w-md mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.name} className="flex items-center">
                            <div className="flex items-center gap-2">
                                <step.icon className={`h-5 w-5 ${step.status === 'complete' ? 'text-green-500' : 'text-slate-400'}`} />
                                <span className={`text-sm font-medium ${step.status === 'complete' ? 'text-slate-700' : 'text-slate-400'}`}>{step.name}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <ChevronRight className="h-5 w-5 text-slate-300 mx-3"/>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-3xl text-center w-full">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                        <Bot className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                    PitchCraft AI
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Transform your startup idea into a complete business package with AI-powered pitch generation and professional website code.
                </p>
            </div>

            <div className="mt-8 mx-auto w-full max-w-4xl">
                <BrandForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
            
            {isLoading && (
                <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center w-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="font-headline text-2xl text-primary">Generating your brand...</p>
                    <p className="text-slate-600">This might take a moment. We're brewing up something special for you!</p>
                </div>
            )}
        </div>
      </div>
      
      {assets && (
        <div id="results-section" className="mt-12 bg-white py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <ResultsDisplay assets={assets} />
          </div>
        </div>
      )}
      
       <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-300 to-indigo-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
    </div>
  );
}
