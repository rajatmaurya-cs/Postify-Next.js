"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const fetchBlog = async (Id: string) => {

  const { data } = await api.get(`/blog/blogbyid/${Id}`, {

    params: { blogId: Id },
    
  });

  return data.blog;
};

export const useBlog = (Id: string, initialData?: any) => {
  return useQuery({
    queryKey: ["blog", Id],
    queryFn: () => fetchBlog(Id),

   
    initialData,

    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};