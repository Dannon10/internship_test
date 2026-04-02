"use client";
import { ArrowLeft } from "lucide-react";
import { TransactionRecord } from "../types";

interface Props { record: TransactionRecord; onBack: () => void; dark: boolean; }

const AVATAR_BG = [
  ["bg-indigo-100", "text-indigo-600"],
  ["bg-violet-100", "text-violet-600"],
  ["bg-sky-100",    "text-sky-600"],
  ["bg-emerald-100","text-emerald-600"],
  ["bg-amber-100",  "text-amber-600"],
  ["bg-rose-100",   "text-rose-600"],
  ["bg-teal-100",   "text-teal-600"],
  ["bg-pink-100",   "text-pink-600"],
  ["bg-cyan-100",   "text-cyan-600"],
  ["bg-orange-100", "text-orange-600"],
];
function avatarClasses(id: number) {
  const [bg, text] = AVATAR_BG[id % AVATAR_BG.length];
  return `${bg} ${text}`;
}
function getInitials(ref: string) {
  const words = ref.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function Field({ label, value, dark }: { label: string; value: string | number; dark: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${dark ? "bg-[#13161f] border-white/5" : "bg-[#FAFAFA] border-[#EBEBEB]"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${dark ? "text-[#4b5563]" : "text-[#ABABAB]"}`}>
        {label}
      </p>
      <p className={`text-sm font-medium ${dark ? "text-[#e2e4ea]" : "text-[#323C47]"}`}>{value}</p>
    </div>
  );
}

export default function TransactionDetail({ record, onBack, dark }: Props) {
  return (
    <div className="max-w-2xl">
      {/* Back */}
      <button
        onClick={onBack}
        aria-label="Back to list"
        className={`inline-flex items-center gap-2 text-sm font-medium mb-7 group transition-colors ${
          dark ? "text-[#6b7280] hover:text-[#e2e4ea]" : "text-[#7D7D7D] hover:text-[#323C47]"
        }`}
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back to records
      </button>

      <div className={`rounded-2xl border p-6 mb-4 flex items-start gap-4 ${
        dark ? "bg-[#0d0f16] border-white/5" : "bg-white border-[#EBEBEB]"
      }`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${avatarClasses(record.accountId)}`}>
          {getInitials(record.reference)}
        </div>
        <div className="min-w-0">
          <h2 className={`text-base font-semibold leading-snug mb-1 ${dark ? "text-[#e2e4ea]" : "text-[#323C47]"}`}>
            {record.reference}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              dark ? "bg-[#4340DA]/15 text-[#8b89f5]" : "bg-[#EEF0FF] text-[#4340DA]"
            }`}>
              Transaction #{record.transactionId}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full ${
              dark ? "bg-white/5 text-[#6b7280]" : "bg-[#F0F0F0] text-[#7D7D7D]"
            }`}>
              Account {record.accountId}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <Field label="Transaction ID" value={record.transactionId} dark={dark} />
        <Field label="Account ID" value={record.accountId} dark={dark} />
        <Field label="Reference" value={record.reference} dark={dark} />
      </div>

      <div className={`rounded-xl border p-5 ${dark ? "bg-[#13161f] border-white/5" : "bg-[#FAFAFA] border-[#EBEBEB]"}`}>
        <p className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${dark ? "text-[#4b5563]" : "text-[#ABABAB]"}`}>
          Full Description
        </p>
        <p className={`text-sm leading-relaxed ${dark ? "text-[#9ca3af]" : "text-[#7D7D7D]"}`}>
          {record.description}
        </p>
      </div>
    </div>
  );
}
