"use client";
import { useState } from 'react'
import { useDashboardblogs } from "../../hooks/useDashboardblogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

type ModeratedBy = {
  _id: string;
  fullName: string;
};

type Blog = {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  isPublished: boolean;
  moderatedBy: ModeratedBy | null;
};

const BlogClient = () => {

  const [deletingBlog, setdeletingBlog] = useState<string | null>(null);

  const LIMIT: number = 5;

  const queryClient = useQueryClient();

  const {
    data: latestBlogs = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useDashboardblogs({
    limit: LIMIT,
    isAdmin: true,
    category: "All",
  });

  const toggleMutation = useMutation({
    mutationFn: async (blogId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/toggle-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogId }),
        }
      );

      const data = await res.json();

      if (!data?.success) {
        throw new Error(data?.message || "Failed to update blog");
      }

      return data;
    },

    onMutate: () => {
      toast.loading("Updating blog status...", {
        id: "toggle",
      });
    },

    onSuccess: (data) => {
      toast.success(data.message || "Updated!", {
        id: "toggle",
      });

      queryClient.invalidateQueries({
        queryKey: ["latest-blogs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to update blog status", {
        id: "toggle",
      });
    },
  });

  const handletoggle = (id: string) => {

     setdeletingBlog(id);

    toggleMutation.mutate(id, {
      onSettled: () => {
        setdeletingBlog(null);
      },
    });

  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <h1 className="text-lg font-medium text-gray-500 animate-pulse">
          Loading blogs...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <h1 className="text-lg font-semibold text-red-600">
          {(error as Error).message || "Something went wrong"}
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {latestBlogs.map((blog: Blog) => (
        <div
          key={blog._id}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-2xl"
        >
          {/* Top Gradient Line */}
          <div
            className={`absolute left-0 top-0 h-1 w-full ${blog.isPublished
                ? "bg-gradient-to-r from-green-400 to-emerald-600"
                : "bg-gradient-to-r from-red-400 to-rose-600"
              }`}
          />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT CONTENT */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-black">
                  {blog.title}
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${blog.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <p className="max-w-3xl text-sm leading-relaxed text-gray-600">
                {blog.subTitle}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-sm text-gray-500">
                <p>
                  📅{" "}
                  <span className="font-medium text-gray-700">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "—"}
                  </span>
                </p>

                <p>
                  👤{" "}
                  <span className="font-medium text-gray-700">
                    {blog.moderatedBy?.fullName || "Not Moderated"}
                  </span>
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <div>
              <button
                disabled={toggleMutation.isPending && deletingBlog == blog._id}
                onClick={() => handletoggle(blog._id)}
                className={`min-w-[140px] rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${blog.isPublished
                    ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                  }`}
              >
                {toggleMutation.isPending && deletingBlog === blog._id
                  ? "Updating..."
                  : blog.isPublished
                    ? "Unpublish"
                    : "Publish"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {isFetching && (
        <div className="flex justify-center">
          <p className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
            Refreshing blogs...
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogClient;