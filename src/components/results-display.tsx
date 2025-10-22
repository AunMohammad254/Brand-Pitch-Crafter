

'use client'

import { type BrandAssets } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingPagePreview } from '@/components/landing-page-preview';
import { Lightbulb, Palette, CheckCircle, Target, FileText, Code, Copy, MonitorPlay, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type GeneratedCodeProps = {
    assets: BrandAssets;
};

const GeneratedCode = ({ assets }: GeneratedCodeProps) => {
    const { toast } = useToast();
    const code = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MediAI - Personalized Health, Simplified</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(to bottom, #2E9AFF, #003188);
                color: #fff;
                overflow-x: hidden;
            }
        </style>
    </head>
    </html>
    `;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Code Copied!",
            description: "The landing page code has been copied to your clipboard.",
        });
    }

    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                </div>
                <p className="text-sm text-slate-400">Generated Landing Page Code</p>
                <div className="w-16"></div>
            </div>
            <div className="p-4 relative">
                <pre className="text-sm text-slate-300 overflow-x-auto">
                    <code>{code.trim()}</code>
                </pre>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-800/50 border-t border-slate-700">
                 <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500"/> Ready to Deploy</span>
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500"/> Responsive Design</span>
                    <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500"/> Modern Styling</span>
                 </div>
                 <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <MonitorPlay className="mr-2 h-4 w-4"/>
                                Preview Website
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
                            <DialogHeader>
                                <DialogTitle>{assets.startupName} - Landing Page Preview</DialogTitle>
                                <DialogDescription>
                                    This is a live preview of your generated landing page.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex-grow overflow-auto'>
                                <LandingPagePreview assets={assets}/>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button size="sm" onClick={copyToClipboard} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy Code
                    </Button>
                 </div>
            </div>
        </div>
    )
}


export function ResultsDisplay({ assets }: ResultsDisplayProps) {
  const { toast } = useToast();

  const handleSavePitch = () => {
    try {
      const savedPitches = JSON.parse(localStorage.getItem('savedPitches') || '[]') as BrandAssets[];
      const newPitch = { ...assets, id: new Date().toISOString() };
      savedPitches.push(newPitch);
      localStorage.setItem('savedPitches', JSON.stringify(savedPitches));
      toast({
        title: "Pitch Saved!",
        description: `${assets.startupName} has been saved to your pitches.`,
      });
    } catch (error) {
      toast({
        title: "Error Saving Pitch",
        description: "Could not save the pitch to your browser's local storage.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Your Generated Assets
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-slate-600">
         Here's everything we've created for <span className="font-bold text-primary">{assets.startupName}</span>.
        </p>
      </div>

      <div className='flex justify-center'>
        <Button onClick={handleSavePitch}>
          <Save className="mr-2 h-4 w-4" /> Save Pitch
        </Button>
      </div>

      <Tabs defaultValue="pitch" className="w-full max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 h-14 bg-slate-200/80 rounded-xl">
            <TabsTrigger value="pitch" className="h-10 text-lg font-headline data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary rounded-lg">
                <FileText className="mr-2"/>
                Pitch Details
            </TabsTrigger>
            <TabsTrigger value="website" className="h-10 text-lg font-headline data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary rounded-lg">
                <Code className="mr-2"/>
                Website Code
            </TabsTrigger>
        </TabsList>
        <TabsContent value="pitch" className="mt-6">
            <div className="text-center">
                <h3 className="font-headline text-2xl font-bold text-slate-800">{assets.startupName}</h3>
                <p className="mt-1 text-slate-600">{assets.taglines[0]}</p>
            </div>
        </TabsContent>
        <TabsContent value="website" className="mt-6">
            <GeneratedCode assets={assets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
