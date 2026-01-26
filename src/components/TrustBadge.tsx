import React from 'react';

interface TrustBadgeProps {
    icon?: React.ReactNode;
    text: string;
    subtext?: string;
}

export function TrustBadge({ icon, text, subtext }: TrustBadgeProps) {
    return (
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full shadow-sm">
            {icon && <div className="text-yellow-500">{icon}</div>}
            <div className="flex flex-col leading-none">
                <span className="font-semibold text-sm">{text}</span>
                {subtext && <span className="text-xs text-muted-foreground opacity-80">{subtext}</span>}
            </div>
        </div>
    );
}
