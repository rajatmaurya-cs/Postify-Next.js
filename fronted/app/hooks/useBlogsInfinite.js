import { useInfiniteQuery } from "@tanstack/react-query";

export function useBlogsInfinite({
  category = "All",
  limit = 3,
  initialData,
}) {
  const endpoint =
  
     "http://localhost:3000/api/blog/allblog";

  return useInfiniteQuery({
    queryKey: ["blogs", category, limit],

    queryFn: async ({ pageParam = 1 }) => {

      const url = `${endpoint}?page=${pageParam}&limit=${limit}&category=${category}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();

      if (!data?.success) {
        throw new Error(data?.message || "API error");
      }

      return data;
    },

    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,

    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage.nextPage : undefined,

    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}