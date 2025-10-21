
import { type BrandAssets } from '@/app/actions';
import { Badge } from '@/components/ui/badge';

export function TargetAudience({ assets }: { assets: BrandAssets }) {
    const audienceParts = assets.targetAudience.demographics.split(',').map(s => s.trim());
    
    return (
        <div className="flex flex-wrap gap-2">
            {audienceParts.map((part, index) => (
                <Badge key={index} variant="outline">{part}</Badge>
            ))}
        </div>
    )
}
