"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransactions } from "../src/hooks/useTransactions";
import { useDebounce } from "../src/hooks/useDebounce";
import { applyFilters, getUniqueAccountIds, PAGE_SIZE } from "../src/utils/filter";
import { FilterState, PaginationState, SortDirection, TransactionRecord } from "../src/types";
import TransactionList from "../src/components/TransactionList";
import TransactionDetail from "../src/components/TransactionDetail";
import ErrorState from "../src/components/states/ErrorState";
import Header from "../src/components/Header";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark", dark);
    }, [dark]);

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
    const [accountId, setAccountId] = useState<number | null>(
        searchParams.get("account") ? parseInt(searchParams.get("account")!, 10) : null
    );

    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get("page") ?? "1", 10)
    );

    const [sortDirection, setSortDirection] = useState<SortDirection>(
        (searchParams.get("sort") as SortDirection) ?? "asc"
    );

    const [selectedId, setSelectedId] = useState<number | null>(
        searchParams.get("id") ? parseInt(searchParams.get("id")!, 10) : null
    );

    const debouncedSearch = useDebounce(searchQuery, 300);
    const { state, retry } = useTransactions();

    useEffect(() => {
        const p = new URLSearchParams();
        if (debouncedSearch) p.set("q", debouncedSearch);
        if (accountId !== null) p.set("account", String(accountId));
        if (currentPage !== 1) p.set("page", String(currentPage));
        if (sortDirection !== "asc") p.set("sort", sortDirection);
        if (selectedId !== null) p.set("id", String(selectedId));
        router.replace(p.toString() ? `?${p.toString()}` : "/", { scroll: false });
    }, [debouncedSearch, accountId, currentPage, sortDirection, selectedId, router]);

    useEffect(() => { setCurrentPage(1); }, [debouncedSearch, accountId]);

    const filters: FilterState = { searchQuery: debouncedSearch, accountId };
    const pagination: PaginationState = { currentPage, pageSize: PAGE_SIZE };

    const transactions = state.status === "success" ? state.data : [];
    const accountIds = getUniqueAccountIds(transactions);
    const { results, totalPages, totalFilteredCount } = applyFilters(transactions, filters, pagination, sortDirection);

    const selectedRecord: TransactionRecord | undefined =
        selectedId !== null ? transactions.find((t) => t.transactionId === selectedId) : undefined;

    const handleSelect = useCallback((id: number) => setSelectedId(id), []);
    const handleBack = useCallback(() => setSelectedId(null), []);

    return (
        <div className={`min-h-screen ${dark ? "bg-[#0d0f16]" : "bg-[#F7F8FA]"}`}>

            {/* Header */}
            <Header
                dark={dark}
                setDark={setDark}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                accountId={accountId}
                accountIds={accountIds}
                onAccountChange={setAccountId}
                sortDirection={sortDirection}
                onSortToggle={() => setSortDirection((d) => (d === "asc" ? "desc" : "asc"))}
            />

            {/* Transactions */}
            <main className="max-w-7xl mx-auto px-8 py-8">
                {selectedRecord ? (
                    <TransactionDetail record={selectedRecord} onBack={handleBack} dark={dark} />
                ) : (
                    <>
                        {state.status === "error" && (
                            <ErrorState message={state.message} onRetry={retry} dark={dark} />
                        )}

                        {state.status !== "error" && (
                            <TransactionList
                                state={state}
                                results={results}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                onSelect={handleSelect}
                                dark={dark}
                                totalFilteredCount={totalFilteredCount}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
