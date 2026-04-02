'use client';
import { useReducer, useEffect, useCallback } from "react";
import { RawPost, TransactionRecord, AsyncState } from "../types";
import { mapPost } from "../utils/filter";

type Action =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: TransactionRecord[] }
    | { type: "FETCH_ERROR"; payload: string };

function reducer(
    _state: AsyncState<TransactionRecord[]>,
    action: Action
): AsyncState<TransactionRecord[]> {
    switch (action.type) {
        case "FETCH_START":
            return { status: "loading" };
        case "FETCH_SUCCESS":
            return { status: "success", data: action.payload };
        case "FETCH_ERROR":
            return { status: "error", message: action.payload };
        default:
            return { status: "idle" };
    }
}

// ErrorState Testing Block
// To test the error state, uncomment the hook below and comment out the real useTransactions export at the bottom.
// export function useTransactions() {
//     return {
//         state: { status: "error" as const, message: "Failed to fetch transactions. Please try again." },
//         retry: () => console.log("retry clicked — error state is simulated"),
//     };
// }


export function useTransactions() {
    const [state, dispatch] = useReducer(reducer, { status: "idle" });

    const fetchTransactions = useCallback(async () => {
        dispatch({ type: "FETCH_START" });
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!res.ok) throw new Error(`HTTP error — status: ${res.status}`);
            const raw: RawPost[] = await res.json();
            dispatch({ type: "FETCH_SUCCESS", payload: raw.map(mapPost) });
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                payload: err instanceof Error ? err.message : "Unknown error occurred",
            });
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return { state, retry: fetchTransactions };
}