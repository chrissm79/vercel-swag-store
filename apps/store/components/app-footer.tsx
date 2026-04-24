"use client";

import { Suspense } from "react";

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container py-8">
        <Suspense>
          <Copyright />
        </Suspense>
      </div>
    </footer>
  );
}

function Copyright() {
  return (
    <p className="text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Vercel Swag Store. All rights reserved.
    </p>
  );
}
