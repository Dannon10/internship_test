import { SearchX } from "lucide-react";

interface Props { dark: boolean; }

export default function EmptyState({ dark }: Props) {
    return (
        <div role="status" aria-live="polite"
            className={`rounded-2xl border p-16 text-center ${dark ? "bg-[#0d0f16] border-white/5" : "bg-white border-[#EBEBEB]"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? "bg-white/5" : "bg-[#F0F0F0]"}`}>
                <SearchX size={20} className={dark ? "text-[#4b5563]" : "text-[#ABABAB]"} aria-hidden="true" />
            </div>
            <h2 className={`text-sm font-semibold mb-1.5 ${dark ? "text-[#e2e4ea]" : "text-[#323C47]"}`}>No records found</h2>
            <p className={`text-xs ${dark ? "text-[#4b5563]" : "text-[#ABABAB]"}`}>Try adjusting your search or clearing the account filter.</p>
        </div>
    );
}
