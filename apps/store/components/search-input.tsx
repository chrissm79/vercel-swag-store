"use client";

import { useParamValue } from "@/hooks/use-category-param";
import { Button } from "@workspace/ui/button";
import { Input } from "@workspace/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const currentParams = useSearchParams();
  const { param: query, updateParam: updateQuery } = useParamValue({
    name: "q",
    onChange: (params) => {
      if (params.has("q") && (params.get("q")?.trim().length ?? 0) < 3) {
        params.delete("q");
      }

      if (currentParams.get("q") === params.get("q")) {
        return;
      }

      router.push(`/search?${params.toString()}`);
    },
  });

  const [value, setValue] = useState(query ?? "");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const queryValue = e.target.value;
    setValue(queryValue);

    if (queryValue && queryValue.trim().length > 2) {
      updateQuery(queryValue.trim());
    }
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    updateQuery(value ?? null);
  }

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        name="q"
        value={value}
        onChange={handleChange}
        className="md:min-w-80"
        placeholder="Search products..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
