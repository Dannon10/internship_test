"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    dark: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, dark }: PaginationProps) {
    const btn = `w-10 h-10 rounded-full border text-sm font-medium flex items-center justify-center transition-all duration-200`;
    const inactive = dark
        ? "border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-[#161924] hover:bg-[#1f2230]"
        : "border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 bg-white hover:bg-gray-100";
    const active = "bg-[#4340DA] border-[#4340DA] text-white shadow-md";
    const disabled = "opacity-40 cursor-not-allowed pointer-events-none";

    const pages: (number | "…")[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
            pages.push(i);
        } else if (pages[pages.length - 1] !== "…") {
            pages.push("…");
        }
    }

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`${btn} ${inactive} ${currentPage === 1 ? disabled : ""}`}
            >
                <ChevronLeft size={16} />
            </button>

            {pages.map((p, i) =>
                p === "…" ? (
                    <span
                        key={`e${i}`}
                        className={`px-2 text-sm ${dark ? "text-gray-600" : "text-gray-400"}`}
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p as number)}
                        aria-label={`Page ${p}`}
                        aria-current={currentPage === p ? "page" : undefined}
                        className={`${btn} ${currentPage === p ? active : inactive}`}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`${btn} ${inactive} ${currentPage === totalPages ? disabled : ""}`}
            >
                <ChevronRight size={16} />
            </button>
        </nav>
    );
}
