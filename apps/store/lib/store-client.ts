import "server-only";

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

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ApiPaginationResponse<T> = {
  success: boolean;
  data: T;
  meta: {
    pagination: Pagination;
  };
};

export type ProductsResponse = ApiPaginationResponse<Product[]>;

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
    getProducts: async (
      params?: GetProductsParams,
    ): Promise<ProductsResponse> => {
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
  };
}

export const storeClient = createStoreClient();
