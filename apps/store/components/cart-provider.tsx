"use client";

import { addToCart, removeFromCart, updateCartItem } from "@/actions/cart";
import type {
  CartItemWithProduct,
  CartWithProducts,
  Product,
} from "@/lib/api/generated";
import {
  createContext,
  startTransition,
  use,
  useCallback,
  useMemo,
  useOptimistic,
  useState,
} from "react";

type OptimisticCartAction =
  | { type: "hydrate"; cart: CartWithProducts | null }
  | { type: "add"; product: Product; quantity: number }
  | { type: "update"; itemId: string; quantity: number }
  | { type: "remove"; itemId: string };

type CartContextValue = {
  cart: CartWithProducts | null;
  error: string | null;
  isPending: boolean;
  hydrateCart: (cart: CartWithProducts | null) => void;
  addItem: (product: Product, quantity: number) => void;
  updateItem: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function recalculateCart(cart: CartWithProducts | null) {
  if (!cart) return cart;

  const items = cart.items ?? [];

  return {
    ...cart,
    items,
    totalItems: items.reduce((total, item) => total + (item.quantity ?? 0), 0),
    subtotal: items.reduce((total, item) => total + (item.lineTotal ?? 0), 0),
  };
}

function updateLineTotal(item: CartItemWithProduct, quantity: number) {
  return {
    ...item,
    quantity,
    lineTotal: (item.product?.price ?? 0) * quantity,
  };
}

function addCartItem(
  cart: CartWithProducts | null,
  product: Product,
  quantity: number,
) {
  const existingItems = cart?.items ?? [];
  const existingItem = existingItems.find((item) => item.productId === product.id);

  const items = existingItem
    ? existingItems.map((item) =>
        item.productId === product.id
          ? updateLineTotal(item, (item.quantity ?? 0) + quantity)
          : item,
      )
    : [
        ...existingItems,
        {
          productId: product.id,
          product,
          quantity,
          lineTotal: (product.price ?? 0) * quantity,
        },
      ];

  return recalculateCart({
    ...(cart ?? { currency: product.currency ?? "USD" }),
    items,
  });
}

function optimisticCartReducer(
  cart: CartWithProducts | null,
  action: OptimisticCartAction,
): CartWithProducts | null {
  if (action.type === "hydrate") {
    return action.cart;
  }

  if (action.type === "add") {
    return addCartItem(cart, action.product, action.quantity);
  }

  if (!cart) return cart;

  if (action.type === "remove") {
    return recalculateCart({
      ...cart,
      items: cart.items?.filter((item) => item.productId !== action.itemId) ?? [],
    });
  }

  if (action.type === "update") {
    return recalculateCart({
      ...cart,
      items:
        cart.items?.map((item) =>
          item.productId === action.itemId
            ? updateLineTotal(item, action.quantity)
            : item,
        ) ?? [],
    });
  }

  return cart;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [confirmedCart, setConfirmedCart] = useState<CartWithProducts | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    confirmedCart,
    optimisticCartReducer,
  );

  const runMutation = useCallback(
    async (
      optimisticAction: OptimisticCartAction,
      mutation: () => Promise<CartWithProducts | null>,
      errorMessage: string,
    ) => {
      const rollbackCart = confirmedCart;

      setError(null);
      setPendingCount((count) => count + 1);

      startTransition(() => {
        updateOptimisticCart(optimisticAction);
      });

      try {
        const nextCart = await mutation();
        setConfirmedCart(nextCart);
        startTransition(() => {
          updateOptimisticCart({ type: "hydrate", cart: nextCart });
        });
      } catch {
        setConfirmedCart(rollbackCart);
        startTransition(() => {
          updateOptimisticCart({ type: "hydrate", cart: rollbackCart });
        });
        setError(errorMessage);
      } finally {
        setPendingCount((count) => Math.max(0, count - 1));
      }
    },
    [confirmedCart, updateOptimisticCart],
  );

  const hydrateCart = useCallback(
    (cart: CartWithProducts | null) => {
      setConfirmedCart(cart);
      startTransition(() => {
        updateOptimisticCart({ type: "hydrate", cart });
      });
    },
    [updateOptimisticCart],
  );

  const addItem = useCallback(
    (product: Product, quantity: number) => {
      if (!product.id || quantity < 1) return;

      const productId = product.id;

      void runMutation(
        { type: "add", product, quantity },
        () => addToCart(confirmedCart, { productId, quantity }),
        "Could not add that item. Please try again.",
      );
    },
    [confirmedCart, runMutation],
  );

  const updateItem = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity < 1) return;

      void runMutation(
        { type: "update", itemId, quantity },
        () => updateCartItem(itemId, quantity),
        "Could not update your cart. Please try again.",
      );
    },
    [runMutation],
  );

  const removeItem = useCallback(
    (itemId: string) => {
      void runMutation(
        { type: "remove", itemId },
        () => removeFromCart(itemId),
        "Could not remove that item. Please try again.",
      );
    },
    [runMutation],
  );

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      error,
      isPending: pendingCount > 0,
      hydrateCart,
      addItem,
      updateItem,
      removeItem,
    }),
    [
      optimisticCart,
      error,
      pendingCount,
      hydrateCart,
      addItem,
      updateItem,
      removeItem,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = use(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
