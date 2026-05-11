"use client";

import { useQuery } from "@tanstack/react-query";

const StatusClient = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-data"],

    queryFn: async () => {
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/BlogDashboard`
      );
      

      if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const json = await res.json();

      console.log("The Response from statsclinet",json)

      if (!json.success) {
        throw new Error(
          json.message || "Failed to load dashboard data"
        );
      }

      const {
        totalBlogs,
        totalComments,
        draftBlogs,
      } = json.stats;

      return {
        totalBlogs,
        totalComments,
        draftBlogs,
      };
    },

    staleTime: 30_000,

    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h1 className="text-lg font-semibold text-gray-600">
          Total Blogs
        </h1>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          {data?.totalBlogs}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h2 className="text-lg font-semibold text-gray-600">
          Total Comments
        </h2>

        <p className="text-4xl font-bold text-green-600 mt-3">
          {data?.totalComments}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h3 className="text-lg font-semibold text-gray-600">
          Draft Blogs
        </h3>

        <p className="text-4xl font-bold text-red-600 mt-3">
          {data?.draftBlogs}
        </p>
      </div>

    </div>
  );
};

export default StatusClient;