"use client";

import { ErrorMessage } from "@/components/error-message";
import { Button } from "@workspace/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product error boundary caught:", error);
  }, [error]);

  return (
    <ErrorMessage
      title="Could not load this product"
      message={error.message || "This product is unavailable right now."}
      digest={error.digest}
      onTryAgain={reset}
      additionalButton={
        <Button variant="outline" render={<Link href="/search" />}>
          Browse products
        </Button>
      }
    />
  );
}
