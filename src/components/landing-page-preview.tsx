'use client';

import { type BrandAssets } from '@/app/actions';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero');
const featureImage = PlaceHolderImages.find(img => img.id === 'feature1');


export function LandingPagePreview({ assets }: { assets: BrandAssets }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const features = assets.landingPageCopy.keyFeatures || [];

  return (
    <Card className="overflow-hidden shadow-2xl transition-all hover:shadow-primary/20 rounded-2xl">
      <CardContent className="p-0">
        <div className="bg-background">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5 font-headline text-2xl font-bold text-primary flex items-center gap-2">
                  <Sparkles/>
                  {assets.startupName}
                </a>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                <a href="#" className="text-sm font-semibold leading-6 text-foreground/90">Features</a>
                <a href="#" className="text-sm font-semibold leading-6 text-foreground/90">Pricing</a>
                <a href="#" className="text-sm font-semibold leading-6 text-foreground/90">About</a>
              </div>
              <div className="lg:flex lg:flex-1 lg:justify-end">
                <Button>{assets.landingPageCopy.callToAction}</Button>
              </div>
            </nav>
          </header>

          <div className="relative isolate pt-14 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in-up">
                    {assets.landingPageCopy.headline}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-foreground/80 animate-fade-in-up [animation-delay:200ms]">
                    {assets.taglines[0] || 'A tagline for your amazing startup'}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg">{assets.landingPageCopy.callToAction}</Button>
                    <Button size="lg" variant="ghost">Learn more <span aria-hidden="true">→</span></Button>
                    </div>
                </div>
                {heroImage && 
                    <div className="mt-16 flow-root sm:mt-24 animate-fade-in-up [animation-delay:600ms]">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            data-ai-hint={heroImage.imageHint}
                            width={1200}
                            height={600}
                            className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                            priority
                        />
                        </div>
                    </div>
                }
                </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-accent to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
          </div>
          
           <div className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                    <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-primary font-headline">Key Features</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">{assets.startupName}</p>
                    <p className="mt-6 text-lg leading-8 text-foreground/80">{assets.landingPageCopy.bodyText}</p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-foreground/80 lg:max-w-none">
                        {features.map((feature, index) => (
                        <div key={index} className="relative pl-9">
                            <dt className="inline font-semibold text-foreground">
                            <Check className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                            {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    </div>
                </div>
                {featureImage &&
                    <Image
                    src={featureImage.imageUrl}
                    alt={featureImage.description}
                    data-ai-hint={featureImage.imageHint}
                    className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    width={600}
                    height={400}
                    />
                }
                </div>
            </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
