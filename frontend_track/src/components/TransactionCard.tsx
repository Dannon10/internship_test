"use client";
import { TransactionRecord } from "../types";

interface Props {
    record: TransactionRecord;
    onSelect: (id: number) => void;
    dark: boolean;
    index: number;
}

export default function TransactionCard({ record, onSelect, dark, index }: Props) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(record.transactionId);
        }
    };

    return (
        <div
            role="button"
             style={{ animationDelay: `${index * 40}ms` }}
            tabIndex={0}
            aria-label={`View transaction ${record.transactionId}: ${record.reference}`}
            onClick={() => onSelect(record.transactionId)}
            onKeyDown={handleKeyDown}
            className={`row-enter grid grid-cols-[0.5fr_80px_100px_3fr] gap-4 items-center px-6 py-4 border-b last:border-0 cursor-pointer transition-colors duration-100 group ${dark
                    ? "border-white/5 hover:bg-white/3"
                    : "border-[#F5F5F5] hover:bg-[#F9F9FF]"
                }`}
                >

                <div>
                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${dark
                            ? "bg-[#4340DA]/15 text-[#8b89f5]"
                            : "bg-[#EEF0FF] text-[#4340DA]"
                        }`}>
                        #{record.transactionId}
                    </span>
                </div>

            <div className="flex items-center gap-3 min-w-0">
                <span className={`text-sm font-medium line-clamp-1 group-hover:text-[#4340DA] transition-colors ${dark ? "text-[#e2e4ea]" : "text-[#323C47]"
                    }`}>
                    {record.reference}
                </span>
            </div>

            <span className={`text-sm ${dark ? "text-[#6b7280]" : "text-[#7D7D7D]"}`}>
                Acct {record.accountId}
            </span>

            <span className={`text-sm line-clamp-1 ${dark ? "text-[#6b7280]" : "text-[#7D7D7D]"}`}>
                {record.description}
            </span>
        </div>
    );
}