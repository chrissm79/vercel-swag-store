export function AppFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container py-8">
        <Copyright />
      </div>
    </footer>
  );
}

async function Copyright() {
  "use cache";

  return (
    <p className="text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Vercel Swag Store. All rights reserved.
    </p>
  );
}
