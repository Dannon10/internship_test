import { Suspense } from "react";
import Home from "./Home";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-[#7D7D7D]">Loading…</span>
      </div>
    }>
      <Home />
    </Suspense>
  );
}
