"use client";
import { AsyncState, TransactionRecord } from "../types";
import TransactionCard from "./TransactionCard";
import LoadingSkeleton from "./states/LoadingSkeleton";
import EmptyState from "./states/EmptyState";
import Pagination from "./Pagination";

interface Props {
    state: AsyncState<TransactionRecord[]>;
    results: TransactionRecord[];
    currentPage: number;
    totalPages: number;
    totalFilteredCount: number;
    onPageChange: (page: number) => void;
    onSelect: (id: number) => void;
    dark: boolean;
}

export default function TransactionList({
    state, results, currentPage, totalPages, onPageChange, onSelect, dark, totalFilteredCount
}: Props) {
    if (state.status === "idle" || state.status === "loading") {
        return <LoadingSkeleton dark={dark} />;
    }

    if (state.status === "success" && results.length === 0) {
        return <EmptyState dark={dark} />;
    }

    if (state.status !== "success") return null;

    return (
        <div>
            <p className={`text-xs mb-5 ${dark ? "text-[#4b5563]" : "text-[#ABABAB]"}`}>
                <span className={dark ? "text-[#9ca3af]" : "text-[#7D7D7D]"}>{totalFilteredCount}</span>
                {" "}record{results.length !== 1 ? "s" : ""} · page {currentPage} of {totalPages}
            </p>

            <div className={`rounded-2xl border overflow-hidden ${dark ? "border-white/5 bg-[#0d0f16]" : "border-[#EBEBEB] bg-white"
                }`}>
                <div className={`grid grid-cols-[0.5fr_80px_100px_3fr] gap-4 px-6 py-3.5 border-b ${dark
                        ? "bg-[#13161f] border-white/5 text-[#4b5563]"
                        : "bg-[#FAFAFA] border-[#EBEBEB] text-[#ABABAB]"
                    }`}>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">ID</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">Reference</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">Account ID</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">Description</span>
                </div>

                <div role="list" aria-label="Transaction records">
                    {results.map((record, index) => (
                        <div key={record.transactionId} role="listitem">
                            <TransactionCard
                                record={record}
                                onSelect={onSelect}
                                dark={dark}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {totalPages > 1 && (
                <div className="py-5">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        dark={dark}
                    />
                </div>
            )}
        </div>
    );
}