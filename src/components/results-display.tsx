import { type BrandAssets } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LandingPagePreview } from '@/components/landing-page-preview';
import { Lightbulb, Palette, CheckCircle, Target, FileText, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoSuggestions } from '@/components/logo-suggestions';
import { BrandColors } from '@/components/brand-colors';
import { TargetAudience } from '@/components/target-audience';

type ResultsDisplayProps = {
  assets: BrandAssets;
};


export function ResultsDisplay({ assets }: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {assets.startupName}
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-foreground/80">
         {assets.taglines[0]}
        </p>
      </div>

      <Tabs defaultValue="pitch" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-14">
            <TabsTrigger value="pitch" className="h-10 text-lg font-headline">
                <FileText className="mr-2"/>
                Pitch Details
            </TabsTrigger>
            <TabsTrigger value="website" className="h-10 text-lg font-headline">
                <Code className="mr-2"/>
                Website Code
            </TabsTrigger>
        </TabsList>
        <TabsContent value="pitch" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> Elevator Pitch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{assets.landingPageCopy.bodyText}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><CheckCircle className="text-primary"/> The Problem</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{assets.problem}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Palette className="text-primary"/> Brand Colors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BrandColors/>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><CheckCircle className="text-primary"/> Unique Value Proposition</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{assets.solution}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Target className="text-primary"/> Target Audience</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TargetAudience assets={assets} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Palette className="text-primary"/> Logo Ideas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LogoSuggestions assets={assets}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="website" className="mt-6">
            <LandingPagePreview assets={assets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
