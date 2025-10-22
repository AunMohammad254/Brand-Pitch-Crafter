'use client'

import { type BrandAssets } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingPagePreview } from '@/components/landing-page-preview';
import { LogoSuggestions } from '@/components/logo-suggestions';
import { BrandColors } from '@/components/brand-colors';
import { TargetAudience } from '@/components/target-audience';
import { Lightbulb, Palette, CheckCircle, Target, FileText, Code, Copy, MonitorPlay, Save, Briefcase, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

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
        <title>${assets.startupName} - ${assets.taglines[0]}</title>
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


export function ResultsDisplay({ assets }: { assets: BrandAssets }) {
  const { toast } = useToast();
  const { firestore, user } = useFirebase();
  const router = useRouter();

  const handleSavePitch = () => {
    if (!user) {
        toast({
            title: "Please sign in",
            description: "You need to be signed in to save a pitch.",
            variant: "destructive",
        });
        router.push('/login');
        return;
    }
    try {
      const startupsCollection = collection(firestore, 'users', user.uid, 'startups');
      addDocumentNonBlocking(startupsCollection, assets);
      
      toast({
        title: "Pitch Saved!",
        description: `${assets.startupName} has been saved to your pitches.`,
      });
      router.push('/my-pitches');
    } catch (error) {
      console.error("Error saving pitch: ", error);
      toast({
        title: "Error Saving Pitch",
        description: "Could not save the pitch to Firestore.",
        variant: "destructive",
      });
    }
  };

  const landingPageCopy = assets.landingPageCopy;

  return (
    <div className="space-y-8">
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
        <TabsContent value="pitch" className="mt-8 space-y-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border">
                <h3 className="font-headline text-4xl font-bold text-slate-800">{assets.startupName}</h3>
                <p className="mt-2 text-lg text-slate-600">{assets.taglines[0]}</p>
                 <div className="mt-4 flex justify-center gap-2">
                    <Badge variant="secondary">Digital Health</Badge>
                    <Badge variant="secondary">3 Target Segments</Badge>
                    <Badge variant="secondary">AI Generated</Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Briefcase className="text-primary"/>
                            Elevator Pitch
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600">{assets.taglines[1]}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Zap className="text-primary"/>
                            Unique Value Proposition
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-slate-600">{assets.landingPageCopy.bodyText}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <AlertTriangle className="text-primary"/>
                            The Problem
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600">{assets.problem}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <ShieldCheck className="text-primary"/>
                            Our Solution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600">{assets.solution}</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Target className="text-primary"/>
                        Target Audience
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 mb-4">{assets.targetAudience.demographics}</p>
                    <TargetAudience assets={assets} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <FileText className="text-primary"/>
                        Landing Page Copy
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-slate-700">Headline</h4>
                            <p className="text-slate-600 p-3 bg-slate-50 rounded-md mt-1">{landingPageCopy.headline}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-700">Subheadline</h4>
                            <p className="text-slate-600 p-3 bg-slate-50 rounded-md mt-1">{assets.taglines[0]}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-700">Call to Action</h4>
                            <p className="text-slate-600 p-3 bg-slate-50 rounded-md mt-1">{landingPageCopy.callToAction}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-700">Key Features</h4>
                             <ul className="text-slate-600 p-3 bg-slate-50 rounded-md mt-1 space-y-1 list-disc list-inside">
                                {landingPageCopy.keyFeatures.map((feature) => (
                                    <li key={feature.name}><strong>{feature.name}:</strong> {feature.description}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Palette className="text-primary"/>
                            Brand Colors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BrandColors />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Lightbulb className="text-primary"/>
                            Logo Ideas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LogoSuggestions assets={assets} />
                    </CardContent>
                </Card>
            </div>

        </TabsContent>
        <TabsContent value="website" className="mt-6">
            <GeneratedCode assets={assets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
