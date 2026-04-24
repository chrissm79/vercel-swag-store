import { useSearchParams } from "next/navigation";

export function useParamValue({
  name,
  onChange,
}: {
  name: string;
  onChange?: (params: URLSearchParams) => void;
}) {
  const searchParams = useSearchParams();
  const param = searchParams.get(name);

  function updateParam(value: string | null) {
    const params = new URLSearchParams(searchParams);

    if (value?.trim()) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    onChange?.(params);
  }

  return {
    param,
    updateParam,
  };
}
