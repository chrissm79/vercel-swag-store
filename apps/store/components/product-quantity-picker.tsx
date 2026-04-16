"use client";

import { Button } from "@workspace/ui/button";

type ProductQuantityPickerProps = {
  max: number;
  quantity: number;
  onChange: (quantity: number) => void;
};

export function ProductQuantityPicker({
  max,
  quantity,
  onChange,
}: ProductQuantityPickerProps) {
  const clamp = (n: number) => Math.min(max, Math.max(1, n));

  return (
    <>
      <input type="hidden" name="quantity" value={quantity} />
      <div className="flex w-full max-w-48 items-stretch">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-none border-r-0"
          onClick={() => onChange(clamp(quantity - 1))}
          disabled={quantity <= 1}
        >
          <span aria-hidden className="leading-none font-medium">
            −
          </span>
        </Button>
        <div className="flex min-w-12 flex-1 items-center justify-center border border-input bg-background px-3 text-sm font-medium tabular-nums shadow-xs">
          {quantity}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-none border-l-0"
          onClick={() => onChange(clamp(quantity + 1))}
          disabled={quantity >= max}
        >
          <span aria-hidden className="leading-none font-medium">
            +
          </span>
        </Button>
      </div>
    </>
  );
}
