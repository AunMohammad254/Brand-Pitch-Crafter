
export function BrandColors() {
    const colors = [
        { name: 'Primary', value: 'hsl(var(--primary))', label: 'Primary' },
        { name: 'Accent', value: 'hsl(var(--accent))', label: 'Accent' },
        { name: 'Secondary', value: 'hsl(var(--secondary))', label: 'Secondary' },
        { name: 'Neutral', value: 'hsl(var(--background))', label: 'Background' },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {colors.map(color => (
                <div key={color.name} className="flex flex-col items-center gap-2">
                    <div style={{ backgroundColor: color.value }} className="w-16 h-16 rounded-full border-2"/>
                    <p className="text-sm font-medium">{color.label}</p>
                </div>
            ))}
        </div>
    )
}
