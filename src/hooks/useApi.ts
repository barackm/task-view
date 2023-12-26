import useSWR, { Fetcher } from "swr";

interface Props<T> {
  url: string;
  fetcher?: Fetcher<T> | ((url: string) => Promise<T>);
  condition?: boolean;
}

export const useApi = <T>(props: Props<T>) => {
  const { condition = true, url, fetcher } = props;
  const { data, error, mutate } = useSWR<T, any>(
    condition ? url : null,
    fetcher as Fetcher<T>
  );

  const loading = !data && !error && condition;
  return { data, error, loading, mutate };
};
