import { fetchBlogs } from "@/lib/api/blogs";
import BlogClient from "./BlogClient";

export default async function BlogSection() {
  const initialData = await fetchBlogs({
    category: "All",
    search: "",
    page: 1,
    limit: 3,
  });

  return <BlogClient initialData={initialData} />;
}