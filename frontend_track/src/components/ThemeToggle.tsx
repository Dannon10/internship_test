"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
    dark: boolean;
    setDark: (value: boolean) => void;
}

export default function ThemeToggle({ dark, setDark }: ThemeToggleProps) {
    const [iconRotated, setIconRotated] = useState(false);

    const handleThemeToggle = () => {
        setDark(!dark);
        setIconRotated((r) => !r);
    };

    useEffect(() => {
        document.body.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <button
            onClick={handleThemeToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${dark
                    ? "bg-[#161924] border-white/8 text-[#9ca3af] hover:text-[#e2e4ea]"
                    : "bg-white border-[#E5E5E5] text-[#7D7D7D] hover:text-[#323C47]"
                }`}
        >
            <span
                className="transition-transform duration-500"
                style={{ transform: iconRotated ? "rotate(360deg)" : "rotate(0deg)" }}
            >
                {dark ? <Sun size={15} /> : <Moon size={15} />}
            </span>
        </button>
    );
}
