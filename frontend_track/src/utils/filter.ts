import { RawPost, TransactionRecord, FilterState, PaginationState, SortDirection } from "../types";

export const PAGE_SIZE = 10;

// Transform raw API shape into domain model
export function mapPost(post: RawPost): TransactionRecord {
    return {
        transactionId: post.id,
        accountId: post.userId,
        reference: post.title,
        description: post.body,
    };
}

export function applyFilters(
    transactions: TransactionRecord[],
    filters: FilterState,
    pagination: PaginationState,
    sortDirection: SortDirection
): { results: TransactionRecord[]; totalPages: number; totalFilteredCount: number } {
    let results = [...transactions];

    // Search across reference and description
    if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        results = results.filter(
            (t) =>
                t.reference.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query)
        );
    }

    // Filter by Account ID
    if (filters.accountId !== null) {
        results = results.filter((t) => t.accountId === filters.accountId);
    }

    // Sort by transaction ID
    results.sort((a, b) =>
        sortDirection === "asc"
            ? a.transactionId - b.transactionId
            : b.transactionId - a.transactionId
    );

    const totalFilteredCount = results.length;
    const totalPages = Math.max(1, Math.ceil(totalFilteredCount / pagination.pageSize));

    // Paginate
    const start = (pagination.currentPage - 1) * pagination.pageSize;
    const paginated = results.slice(start, start + pagination.pageSize);

    return { results: paginated, totalPages, totalFilteredCount };
}

export function getUniqueAccountIds(transactions: TransactionRecord[]): number[] {
    return [...new Set(transactions.map((t) => t.accountId))].sort((a, b) => a - b);
}