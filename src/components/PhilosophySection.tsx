export function PhilosophySection() {
    return (
        <section className="w-full py-32 md:py-48 bg-black text-white overflow-hidden relative">
            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.03] whitespace-nowrap select-none pointer-events-none uppercase tracking-tighter">
                Premium Sweets
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
                        <div className="w-full md:w-1/3">
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-4 block">Unsere Mission</span>
                            <h2 className="text-4xl md:text-5xl font-black leading-none uppercase tracking-tighter mb-8 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                                Geschmack ohne Grenzen
                            </h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-xl md:text-3xl font-medium text-white/80 leading-tight tracking-tight mb-8">
                                Jede Box ist eine Einladung zu einer Entdeckungsreise. Wir kuratieren handverlesene Leckereien aus allen Kontinenten – von traditionellem Baklava bis zur modernen Dubai-Schokolade.
                            </p>
                            <p className="text-sm md:text-lg text-white/50 leading-relaxed font-bold uppercase tracking-widest">
                                Qualität, Exklusivität und pure Freude am Naschen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
