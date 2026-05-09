"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PlatformScrollContextValue = {
  activeNavId: string | null;
  setActiveNavId: (id: string | null) => void;
  scrollToSection: (elementId: string) => void;
};

const PlatformScrollContext = createContext<PlatformScrollContextValue | null>(
  null,
);

export function PlatformScrollProvider({ children }: { children: ReactNode }) {
  const [activeNavId, setActiveNavId] = useState<string | null>(null);

  const scrollToSection = useCallback((elementId: string) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNavId(elementId);
    window.setTimeout(() => setActiveNavId(null), 1600);
  }, []);

  const value = useMemo(
    () => ({ activeNavId, setActiveNavId, scrollToSection }),
    [activeNavId, scrollToSection],
  );

  return (
    <PlatformScrollContext.Provider value={value}>
      {children}
    </PlatformScrollContext.Provider>
  );
}

export function usePlatformScroll() {
  const ctx = useContext(PlatformScrollContext);
  if (!ctx) {
    throw new Error("usePlatformScroll requires PlatformScrollProvider");
  }
  return ctx;
}
