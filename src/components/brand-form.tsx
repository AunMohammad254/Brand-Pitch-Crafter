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
  niche: z.string().min(3, { message: "Niche must be at least 3 characters." }),
  problem: z.string().min(20, { message: "Please describe the problem in at least 20 characters." }),
  solution: z.string().min(20, { message: "Please describe your solution in at least 20 characters." }),
  mission: z.string().optional(),
  valueProposition: z.string().optional(),
});

type BrandFormProps = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

export function BrandForm({ onSubmit, isLoading }: BrandFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      niche: "AI-powered medical app",
      problem: "Busy professionals want effective home treatment but struggle with real-time form correction.",
      solution: "An app that uses a device's camera for real-time feedback on exercises and treatments.",
      mission: "",
      valueProposition: "",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string);
      }
    });
    onSubmit(formData);
  }

  return (
    <Card className="w-full shadow-lg border-2 border-primary/10 rounded-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl tracking-tight">Describe Your Startup Vision</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="niche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Niche / Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sustainable Fashion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Mission (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., To make sustainable fashion accessible to everyone." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">The Problem</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the problem your startup is solving..." {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Your Solution</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe how your startup solves the problem..." {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="valueProposition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Unique Value Proposition (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., High-quality, eco-friendly clothing at affordable prices." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            

            <div className="text-center pt-4">
              <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto font-bold text-lg rounded-full shadow-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105">
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
