import { ProductCard } from "@/components/product-card";
import { storeClient } from "@/lib/server/store-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage() {
  const products = await storeClient.getProducts();

  return (
    <div className="container flex flex-col gap-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
