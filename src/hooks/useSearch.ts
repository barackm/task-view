import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearch = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return {
    searchParams,
    updateSearch,
  };
};
