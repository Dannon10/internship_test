interface Props { dark: boolean; }

export default function LoadingSkeleton({ dark }: Props) {
    const base = dark ? "bg-white/[0.06]" : "bg-gray-200";

    return (
        <div role="status" aria-label="Loading transactions" aria-busy="true">
            <div className="mb-5">
                <div className={`animate-pulse h-3 w-40 rounded ${base}`} />
            </div>

            <div className={`rounded-2xl border overflow-hidden ${dark ? "border-white/5" : "border-[#EBEBEB]"}`}>
                <div className={`py-3.5 px-6 border-b flex gap-8 ${dark ? "bg-[#13161f] border-white/5" : "bg-[#FAFAFA] border-[#EBEBEB]"}`}>
                    {["w-20", "w-8", "w-16", "w-24"].map((w, i) => (
                        <div key={i} className={`animate-pulse h-2.5 ${w} rounded ${base}`} />
                    ))}
                </div>

                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        aria-hidden="true"
                        className={`py-4 px-6 grid grid-cols-[0.5fr_80px_100px_3fr] gap-4 items-center border-b last:border-0 ${dark ? "border-white/5" : "border-[#F5F5F5]"}`}
                    >
                        <div className={`animate-pulse h-6 w-14 rounded-full ${base}`} />
                        <div className={`animate-pulse h-3 w-28 rounded ${base}`} />
                        <div className={`animate-pulse h-3 w-16 rounded ${base}`} />
                        <div className={`animate-pulse h-3 rounded ${base}`} />
                    </div>
                ))}
            </div>

            <span className="sr-only">Loading transaction records…</span>
        </div>
    );
}