import { getCartSession } from "@/lib/server/cart-session";
import { Icon } from "@workspace/ui/icon";

export async function UserCart() {
  const cart = await getCartSession();

  return (
    <div className="relative">
      <Icon name="cart" className="size-5 text-muted-foreground" />
      <span className="absolute -top-2 -right-2 size-4 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </span>
    </div>
  );
}
