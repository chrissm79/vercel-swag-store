import { storeClient } from "@/lib/server/store-client";
import { Skeleton } from "@workspace/ui/skeleton";

export async function PromoBanner() {
  const { data: promotions } = await storeClient.getPromotions();

  if (!promotions.active) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container py-4">
        <p className="text-center text-sm">
          <span className="font-bold">{promotions.title}: </span>
          {promotions.description}{" "}
          <span className="italic">
            (Use code <span className="font-bold">{promotions.code}</span> at
            checkout)
          </span>
        </p>
      </div>
    </div>
  );
}

export function PromoBannerSkeleton() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container py-4">
        <Skeleton className="h-5 w-1/2 mx-auto" />
      </div>
    </div>
  );
}
