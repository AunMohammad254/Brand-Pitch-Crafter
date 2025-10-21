'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  idea: z.string().min(20, { message: "Please describe your startup vision in at least 20 characters." }),
});

type BrandFormProps = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

export function BrandForm({ onSubmit, isLoading }: BrandFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: "I want to build an AI-Powered Medical app that creates Personalized Medical plans with real-time form correction using there computer/Phone,targeting busy professionals who want effective home treatment",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    // A bit of a hack to conform to the existing `generateBrandAssets` signature
    const formData = new FormData();
    const idea = values.idea;
    // Simple split for problem/solution. A more robust implementation might be needed.
    const parts = idea.split(/, |\. /);
    const problem = parts[1] || 'Problem not specified.';
    const solution = parts[0];
    
    formData.append('niche', "AI-powered medical app");
    formData.append('problem', problem);
    formData.append('solution', solution);
    formData.append('mission', 'To make home treatment effective and accessible.');
    formData.append('valueProposition', 'Real-time form correction for personalized medical plans.');

    onSubmit(formData);
  }

  return (
    <Card className="w-full bg-white shadow-xl shadow-slate-900/10 border border-slate-200/80 rounded-2xl">
      <CardHeader>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xs py-1 px-3 rounded-full self-start">
            STEP 1
        </div>
        <CardTitle className="font-headline text-2xl tracking-tight text-slate-800 pt-2">Describe Your Startup Vision</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="idea"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., An AI-powered app that creates personalized medical plans with real-time form correction..." 
                      {...field} 
                      rows={4}
                      className="text-base leading-relaxed bg-slate-50 border-slate-300 focus:bg-white focus:ring-purple-500 focus:border-purple-500" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center pt-2">
              <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-white">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Complete Startup Package
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
