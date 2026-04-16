"use cache";
import "server-only";

import { cacheLife, cacheTag } from "next/cache";

const baseUrl = process.env.STORE_API_BASE_URL;

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
};

export type ProductStock = {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiPaginationResponse<T> = ApiResponse<T> & {
  meta: {
    pagination: Pagination;
  };
};

export type ProductResponse = ApiResponse<Product>;
export type ProductsResponse = ApiPaginationResponse<Product[]>;
export type ProductStockResponse = ApiResponse<ProductStock>;

export type ProductCategory =
  | "bottles"
  | "cups"
  | "mugs"
  | "desk"
  | "stationery";

export type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: ProductCategory;
  search?: string;
  featured?: boolean;
};

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
  };
}

export const storeClient = createStoreClient();
