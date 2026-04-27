export function currencyFormatter(currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
}

export function formatCents(value: number) {
  return value / 100;
}
