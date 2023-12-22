import useSWR, { Fetcher } from "swr";

interface Props<T> {
  url: string;
  fetcher?: Fetcher<T> | ((url: string) => Promise<T>);
}

export const useApi = <T>(props: Props<T>) => {
  const { url, fetcher } = props;
  const { data, error } = useSWR<T, any>(url, fetcher as Fetcher<T>);

  const loading = !data && !error;

  return { data, error, loading };
};
