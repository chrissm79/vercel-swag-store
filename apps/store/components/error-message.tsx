"use client";

import { Button } from "@workspace/ui/button";
import type { ReactNode } from "react";

type ErrorMessageProps = {
  title: string;
  message: string;
  digest?: string;
  onTryAgain: () => void;
  additionalButton?: ReactNode;
};

export function ErrorMessage({
  title,
  message,
  digest,
  onTryAgain,
  additionalButton,
}: ErrorMessageProps) {
  return (
    <div className="flex h-full items-center justify-center py-12">
      <div className="w-full max-w-lg bg-destructive/5 p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-destructive">{title}</h2>
        <p className="mb-4 text-sm text-destructive/80">{message}</p>
        {digest && (
          <p className="mb-4 font-mono text-xs text-destructive/60">
            Error ID: {digest}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <Button type="button" variant="destructive" onClick={onTryAgain}>
            Try again
          </Button>
          {additionalButton}
        </div>
      </div>
    </div>
  );
}
