'use client';
import { type BrandAssets } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export function LogoSuggestions({ assets }: { assets: BrandAssets }) {
    return (
        <div className="space-y-3">
            {assets.logoSuggestions.map((suggestion, index) => (
                <Card key={index} className="bg-secondary/50 dark:bg-slate-800/50 border-dashed dark:border-slate-700">
                    <CardContent className="p-4 flex items-start gap-3">
                        <Lightbulb className="text-yellow-500 h-5 w-5 mt-1 shrink-0"/>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{suggestion}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
