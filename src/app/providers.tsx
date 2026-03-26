"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import type { UserCondition } from "@/lib/flashProperty/types";
import {
  createUserCondition,
  fetchUserConditions,
} from "@/lib/actions/flashPropertyActions";

type FlashPropertyContextValue = {
  userConditions: UserCondition[];
  addUserCondition: (draft: Omit<UserCondition, "id" | "createdAt">) => void;
  resetToMock: () => void;
};

const FlashPropertyContext = createContext<FlashPropertyContextValue | null>(
  null,
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [userConditions, setUserConditions] = useState<UserCondition[]>([]);

  React.useEffect(() => {
    fetchUserConditions().then(setUserConditions);
  }, []);

  const value = useMemo<FlashPropertyContextValue>(
    () => ({
      userConditions,
      addUserCondition: (draft) => {
        void createUserCondition(draft).then((created) => {
          setUserConditions((prev) => [...prev, created]);
        });
      },
      resetToMock: () => {
        void fetchUserConditions().then(setUserConditions);
      },
    }),
    [userConditions],
  );

  return (
    <FlashPropertyContext.Provider value={value}>
      <div className="min-h-screen bg-background text-foreground">{children}</div>
    </FlashPropertyContext.Provider>
  );
}

export function useFlashProperty() {
  const ctx = useContext(FlashPropertyContext);
  if (!ctx) throw new Error("useFlashProperty must be used within Providers");
  return ctx;
}

