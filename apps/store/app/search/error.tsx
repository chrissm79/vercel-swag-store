"use client";

import { ErrorMessage } from "@/components/error-message";
import { Button } from "@workspace/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function SearchErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Search error boundary caught:", error);
  }, [error]);

  return (
    <ErrorMessage
      title="Could not load products"
      message={error.message || "Search results are unavailable right now."}
      digest={error.digest}
      onTryAgain={reset}
      additionalButton={
        <Button variant="outline" render={<Link href="/" />}>
          Return home
        </Button>
      }
    />
  );
}
