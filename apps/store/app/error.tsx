"use client";

import { ErrorMessage } from "@/components/error-message";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Store error boundary caught:", error);
  }, [error]);

  return (
    <ErrorMessage
      title="Something went wrong"
      message={error.message || "An unexpected error occurred."}
      digest={error.digest}
      onTryAgain={reset}
    />
  );
}
