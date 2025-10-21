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
      niche: "",
      problem: "",
      solution: "",
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Define Your Vision</CardTitle>
        <CardDescription>Provide details about your startup to generate your brand assets.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niche / Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sustainable Fashion" {...field} />
                  </FormControl>
                  <FormDescription>What market does your startup operate in?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The Problem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the problem your startup is solving..." {...field} rows={3} />
                  </FormControl>
                  <FormDescription>What pain point are you addressing?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Solution</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe how your startup solves the problem..." {...field} rows={3} />
                  </FormControl>
                  <FormDescription>How do you solve this problem uniquely?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., To make sustainable fashion accessible to everyone." {...field} />
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
                    <FormLabel>Unique Value Proposition (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., High-quality, eco-friendly clothing at affordable prices." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Brand Identity
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
