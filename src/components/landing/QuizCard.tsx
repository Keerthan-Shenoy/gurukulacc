'use client';
import Link from 'next/link';

interface QuizCardProps {
    title: string;
    tag: string;
    href: string;
    color: string;
    icon: React.ReactNode;
}

export function QuizCard({ title, tag, href, color, icon }: QuizCardProps) {
    return (
        <Link href={href} className="group block w-full max-w-[280px]">
            <div 
                className="relative drop-shadow-xl w-full h-full overflow-hidden rounded-xl bg-card/50 group"
                style={{'--card-color': color} as React.CSSProperties}
            >
                <div className="absolute w-64 h-56 bg-[var(--card-color)]/20 blur-[70px] -left-1/4 -top-1/4 transition-all duration-500 group-hover:bg-[var(--card-color)]/40" />
                <div className="relative z-[1] flex flex-col items-center justify-center h-full">
                    <div 
                        className="w-full h-[120px] rounded-t-xl flex items-center justify-end p-6 text-white/80 transition-transform duration-300 ease-in-out group-hover:-translate-y-1"
                        style={{ backgroundColor: color }}
                    >
                        {icon}
                    </div>
                    <div className="relative w-full h-auto bg-card/80 backdrop-blur-sm rounded-b-xl p-5 -mt-2 text-card-foreground flex-grow flex flex-col">
                        <p className="text-lg font-bold">{tag}</p>
                        <h3 className="text-2xl font-semibold mt-1 mb-2 flex-grow">{title}</h3>
                        <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Click to start quiz &rarr;</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
