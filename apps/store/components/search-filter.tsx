"use client";

import { useParamValue } from "@/hooks/use-category-param";
import { Category } from "@/lib/api";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
} from "@workspace/ui/combobox";
import { useRouter } from "next/navigation";

type SearchFilterProps = {
  categories: Category[];
};

export function SearchFilter({ categories }: SearchFilterProps) {
  const router = useRouter();
  const { param: category, updateParam: updateCategory } = useParamValue({
    name: "category",
    onChange: (params) => {
      router.push(`/search?${params.toString()}`);
    },
  });
  const value = categories.find((c) => c.slug === category)?.name ?? "";

  return (
    <div className="flex gap-4">
      <Combobox<string>
        items={categories}
        value={category}
        onValueChange={(value) => updateCategory(value)}
      >
        <ComboboxInput
          placeholder="Filter by category"
          value={value}
          showClear
        />
        <ComboboxContent>
          {categories.map((category) => (
            <ComboboxItem key={category.slug} value={category.slug}>
              {category.name}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
