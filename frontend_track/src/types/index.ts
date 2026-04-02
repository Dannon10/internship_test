// Raw API shape from jsonplaceholder
export interface RawPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Domain model 
export interface TransactionRecord {
    transactionId: number;
    accountId: number;
    reference: string;
    description: string;
}

// Discriminated union for async state 
export type AsyncState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string };

// Filter state
export interface FilterState {
    searchQuery: string;
    accountId: number | null;
}

// Pagination state
export interface PaginationState {
    currentPage: number;
    pageSize: number;
}

// Extended types for bonus features
export type SortDirection = "asc" | "desc";