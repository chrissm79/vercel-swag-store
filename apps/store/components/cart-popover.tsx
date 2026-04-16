"use client";

import { removeFromCart, updateCartItem } from "@/actions/cart";
import { getItemCount, getSubtotal } from "@/lib/cart-utils";
import { type CartItem } from "@/lib/server/cart-session";
import { currencyFormatter } from "@/lib/string-utils";
import { Button } from "@workspace/ui/button";
import { ButtonGroup } from "@workspace/ui/button-group";
import { Icon } from "@workspace/ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/popover";
import { Separator } from "@workspace/ui/separator";
import Image from "next/image";

type CartPopoverProps = {
  cart: CartItem[];
};

export function CartPopover({ cart }: CartPopoverProps) {
  const itemCount = getItemCount(cart);
  const subtotal = getSubtotal(cart);
  const currency = cart[0]?.currency ?? "USD";
  const formatter = currencyFormatter(currency);

  const handleUpdate = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    await updateCartItem(productId, quantity);
  };

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
  };

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Open cart"
        className="relative flex items-center"
      >
        <Icon name="cart" className="size-5 text-muted-foreground" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 size-4 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
            {itemCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="p-4">
          <h2 className="font-semibold text-sm">Your Cart</h2>
        </div>
        <Separator />
        {cart.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Your cart is empty.
          </div>
        ) : (
          <>
            <ul className="max-h-80 overflow-y-auto divide-y divide-border">
              {cart.map((item) => (
                <li key={item.productId} className="flex gap-3 p-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover bg-muted shrink-0"
                    />
                  )}
                  <div className="flex-1 flex flex-col gap-2 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatter.format(item.price)} each
                        </p>
                      </div>
                      <p className="text-sm font-semibold tabular-nums">
                        {formatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <ButtonGroup className="h-8">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-8 rounded-none"
                          onClick={() =>
                            handleUpdate(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <span
                            aria-hidden
                            className="leading-none font-medium"
                          >
                            −
                          </span>
                        </Button>
                        <div className="flex min-w-8 items-center justify-center border border-input border-x-0 bg-background px-2 text-xs font-medium tabular-nums">
                          {item.quantity}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="size-8 rounded-none"
                          onClick={() =>
                            handleUpdate(item.productId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <span
                            aria-hidden
                            className="leading-none font-medium"
                          >
                            +
                          </span>
                        </Button>
                      </ButtonGroup>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemove(item.productId)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Icon name="trash" className="size-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Separator />
            <div className="p-4 flex items-center justify-between bg-muted">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm font-semibold tabular-nums">
                {formatter.format(subtotal)}
              </span>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
