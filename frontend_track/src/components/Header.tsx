"use client";
import { ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { SortDirection } from "../types";

interface Props {
    dark: boolean;
    setDark: (dark: boolean) => void;
    searchQuery: string;
    onSearchChange: (val: string) => void;
    accountId: number | null;
    accountIds: number[];
    onAccountChange: (id: number | null) => void;
    sortDirection: SortDirection;
    onSortToggle: () => void;
}

export default function Header({
    dark, setDark, searchQuery, onSearchChange,
    accountId, accountIds, onAccountChange,
    sortDirection, onSortToggle,
}: Props) {
    return (
        <header className={`sticky top-0 z-40 border-b ${dark ? "bg-[#0d0f16] border-white/5" : "bg-white border-[#EBEBEB]"}`}>
            <div className="max-w-7xl mx-auto px-8 h-16 flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2.5 shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-lg bg-[#4340DA] flex items-center justify-center shrink-0">
                        <span className="text-white text-[11px] font-bold">TX</span>
                    </div>
                    <span className={`text-sm font-semibold tracking-tight ${dark ? "text-[#e2e4ea]" : "text-[#323C47]"}`}>
                        TaxStreem
                    </span>
                </div>

                <SearchBar value={searchQuery} onChange={onSearchChange} dark={dark} />

                {/* Account dropdown */}
                <div className="relative shrink-0">
                    <select
                        value={accountId ?? ""}
                        onChange={(e) =>
                            onAccountChange(e.target.value === "" ? null : parseInt(e.target.value, 10))
                        }
                        aria-label="Filter by Account ID"
                        className={`h-10 pl-3 pr-8 rounded-lg border text-sm font-medium appearance-none cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4340DA]/30 ${
                            accountId !== null
                                ? "bg-[#4340DA] border-[#4340DA] text-white"
                                : dark
                                    ? "bg-[#161924] border-white/8 text-[#9ca3af]"
                                    : "bg-white border-[#E5E5E5] text-[#7D7D7D]"
                        }`}
                    >
                        <option value="">All Accounts</option>
                        {accountIds.map((id) => (
                            <option key={id} value={id}>Account {id}</option>
                        ))}
                    </select>
                    <ChevronDown
                        size={13}
                        className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 ${accountId !== null ? "text-white" : "text-[#ABABAB]"}`}
                    />
                </div>

                {/* Sort */}
                <button
                    onClick={onSortToggle}
                    aria-label={`Sort by ID ${sortDirection === "asc" ? "descending" : "ascending"}`}
                    className={`h-10 px-4 rounded-lg border text-sm font-medium flex items-center gap-1.5 shrink-0 transition-colors ${
                        dark
                            ? "bg-[#161924] border-white/8 text-[#9ca3af] hover:text-[#e2e4ea]"
                            : "bg-white border-[#E5E5E5] text-[#7D7D7D] hover:text-[#323C47]"
                    }`}
                >
                    Sort {sortDirection === "asc" ? "↑" : "↓"}
                </button>

                <ThemeToggle dark={dark} setDark={setDark} />
            </div>
        </header>
    );
}