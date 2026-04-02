import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props { message: string; onRetry: () => void; dark: boolean; }

export default function ErrorState({ message, onRetry, dark }: Props) {
    return (
        <div role="alert" aria-live="assertive"
            className={`rounded-2xl border p-16 text-center ${dark ? "bg-[#0d0f16] border-white/5" : "bg-white border-[#EBEBEB]"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? "bg-red-500/10" : "bg-red-50"}`}>
                <AlertTriangle size={20} className="text-red-500" aria-hidden="true" />
            </div>
            <h2 className={`text-sm font-semibold mb-1.5 ${dark ? "text-[#e2e4ea]" : "text-[#323C47]"}`}>Failed to load transactions</h2>
            <p className={`text-xs mb-6 max-w-xs mx-auto leading-relaxed ${dark ? "text-[#6b7280]" : "text-[#7D7D7D]"}`}>{message}</p>
            <button onClick={onRetry} aria-label="Retry"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4340DA] text-white text-sm font-medium hover:bg-[#3533b5] transition-colors active:scale-95">
                <RefreshCw size={14} />Retry
            </button>
        </div>
    );
}
