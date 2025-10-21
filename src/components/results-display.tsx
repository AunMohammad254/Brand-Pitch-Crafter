import { type BrandAssets } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LandingPagePreview } from '@/components/landing-page-preview';
import { Lightbulb, Palette, CheckCircle, Target } from 'lucide-react';

type ResultsDisplayProps = {
  assets: BrandAssets;
};

const SectionCard = ({ icon, title, description, children }: { icon: React.ReactNode, title: string, description?: string, children: React.ReactNode }) => (
    <Card className="h-full">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="rounded-full border border-primary/20 bg-primary/10 p-3 text-primary">
                {icon}
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </div>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)

export function ResultsDisplay({ assets }: ResultsDisplayProps) {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Your New Brand: <span className="text-accent">{assets.startupName}</span>
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-foreground/80">
          Here is the complete brand identity generated for your startup.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SectionCard icon={<Lightbulb />} title="Taglines">
          <div className="flex flex-wrap gap-3">
            {assets.taglines.map((tagline, index) => (
              <Badge key={index} variant="secondary" className="text-base font-normal px-4 py-2 rounded-lg">
                {tagline}
              </Badge>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard icon={<CheckCircle />} title="Problem & Solution">
          <div className="space-y-4">
            <div>
              <h3 className="font-headline text-lg font-semibold text-accent">The Problem</h3>
              <p className="mt-1 text-foreground/90">{assets.problem}</p>
            </div>
            <Separator/>
            <div>
              <h3 className="font-headline text-lg font-semibold text-accent">Our Solution</h3>
              <p className="mt-1 text-foreground/90">{assets.solution}</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard icon={<Palette />} title="Logo Design Suggestions">
            <ul className="space-y-3 list-disc list-inside text-foreground/90">
                {assets.logoSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </SectionCard>
      </div>
      
      <SectionCard icon={<Target />} title="Target Audience Analysis">
        <div className="space-y-4 text-foreground/90">
            <div>
                <h4 className="font-headline text-md font-semibold text-accent">Demographics</h4>
                <p>{assets.targetAudience.demographics}</p>
            </div>
            <div>
                <h4 className="font-headline text-md font-semibold text-accent">Psychographics</h4>
                <p>{assets.targetAudience.psychographics}</p>
            </div>
            <div>
                <h4 className="font-headline text-md font-semibold text-accent">Behavioral Patterns</h4>
                <p>{assets.targetAudience.behavioralPatterns}</p>
            </div>
            <div>
                <h4 className="font-headline text-md font-semibold text-accent">Marketing Channels</h4>
                <p>{assets.targetAudience.marketingChannels}</p>
            </div>
        </div>
      </SectionCard>

      <Separator />

      <div>
        <div className="text-center mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Landing Page Preview
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-foreground/80">
                A glimpse of how your landing page could look with the generated copy.
            </p>
        </div>
        <LandingPagePreview assets={assets} />
      </div>
    </div>
  );
}
