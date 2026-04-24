import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import {
  CategoriesResponse,
  GetProductsParams,
  ProductResponse,
  ProductsResponse,
  ProductStockResponse,
  PromotionResponse,
} from "./store.types";

const baseUrl = process.env.STORE_API_BASE_URL;

function createStoreClient() {
  return {
    getProduct: async (id: string): Promise<ProductResponse> => {
      "use cache";

      cacheLife("products");
      cacheTag("products", `product-${id}`);

      const response = await fetch(`${baseUrl}/products/${id}`);
      const data: ProductResponse = await response.json();
      return data;
    },
    getProducts: async (
      params?: GetProductsParams,
    ): Promise<ProductsResponse> => {
      "use cache";

      cacheLife("products");
      cacheTag("products");

      const url = new URL(`${baseUrl}/products`);

      for (const [key, value] of Object.entries(params ?? {})) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }

      const response = await fetch(url);
      const data: ProductsResponse = await response.json();
      return data;
    },
    getProductStock: async (id: string): Promise<ProductStockResponse> => {
      "use cache";

      cacheLife("stock");
      cacheTag("stock", `stock-${id}`);

      const response = await fetch(`${baseUrl}/products/${id}/stock`);
      const data: ProductStockResponse = await response.json();
      return data;
    },
    getPromotions: async (): Promise<PromotionResponse> => {
      // NOTE: Not caching the response because we don't want to
      // cache invalid promotions.
      const response = await fetch(`${baseUrl}/promotions`);
      const data: PromotionResponse = await response.json();
      return data;
    },
    getCategories: async (): Promise<CategoriesResponse> => {
      "use cache";

      cacheLife("categories");
      cacheTag("categories");

      const response = await fetch(`${baseUrl}/categories`);
      const data: CategoriesResponse = await response.json();
      return data;
    },
  };
}

export const storeClient = createStoreClient();
