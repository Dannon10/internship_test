"use client";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
    dark: boolean;
}

export default function SearchBar({ value, onChange, dark }: SearchBarProps) {
    return (
        <div className="flex-1 relative">
            <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#ABABAB]"
                aria-hidden="true"
            />
            <input
                type="text"
                aria-label="Search transactions"
                placeholder="Search by reference or description…"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full h-10 pl-9 pr-4 rounded-lg border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4340DA]/30 ${
                    dark
                        ? "bg-[#161924] border-white/8 text-[#e2e4ea] placeholder-[#4b5563]"
                        : "bg-white border-[#E5E5E5] text-[#323C47] placeholder-[#ABABAB]"
                }`}
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                        dark
                            ? "text-[#4b5563] hover:text-[#e2e4ea]"
                            : "text-[#ABABAB] hover:text-[#323C47]"
                    }`}
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
}