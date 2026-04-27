import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { apiRequest, GetProductsParams } from "../api";

function createStoreClient() {
  return {
    getProduct: async (id: string) => {
      "use cache";

      cacheLife("products");
      cacheTag("products", `product-${id}`);

      return apiRequest((client) => client.getProduct({ path: { id } }));
    },
    getProducts: async (query?: GetProductsParams) => {
      "use cache";

      cacheLife("products");
      cacheTag("products");

      return apiRequest((client) => client.listProducts({ query }));
    },
    getProductStock: async (id: string) => {
      "use cache";

      cacheLife("stock");
      cacheTag("stock", `stock-${id}`);

      return apiRequest((client) => client.getProductStock({ path: { id } }));
    },
    getPromotions: async () => {
      // NOTE: Not caching the response because we don't want to
      // cache invalid promotions.
      return apiRequest((client) => client.getActivePromotion());
    },
    getCategories: async () => {
      "use cache";

      cacheLife("categories");
      cacheTag("categories");

      return apiRequest((client) => client.listCategories());
    },
    createCart: () => {
      return apiRequest((client) => client.createCart());
    },
    getCart: (token: string) => {
      return apiRequest((client) =>
        client.getCart({ headers: { "x-cart-token": token } }),
      );
    },
    addCartItem: (token: string, productId: string, quantity: number) => {
      return apiRequest((client) =>
        client.addItemToCart({
          body: { productId, quantity },
          headers: { "x-cart-token": token },
        }),
      );
    },
    updateCartItem: (token: string, itemId: string, quantity: number) => {
      return apiRequest((client) =>
        client.updateCartItem({
          body: { quantity },
          headers: { "x-cart-token": token },
          path: { itemId },
        }),
      );
    },
    removeCartItem: (token: string, itemId: string) => {
      return apiRequest((client) =>
        client.removeCartItem({
          headers: { "x-cart-token": token },
          path: { itemId },
        }),
      );
    },
  };
}

export const storeClient = createStoreClient();
