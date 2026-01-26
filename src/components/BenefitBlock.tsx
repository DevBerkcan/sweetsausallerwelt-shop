import React from 'react';

interface BenefitBlockProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export function BenefitBlock({ title, description, icon }: BenefitBlockProps) {
    return (
        <div className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl">
                {icon || (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
