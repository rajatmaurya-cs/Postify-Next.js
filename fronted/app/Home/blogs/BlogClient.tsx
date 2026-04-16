"use client";
import { useState } from "react";
import useBlogsInfinite from "@/hooks/useBlogsInfinite";

export default function BlogClient({ initialData }) {

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");

  const { data, fetchNextPage, hasNextPage } = useBlogsInfinite({
    category: "All",
    search,
    initialData,
  });

  const blogs = data?.pages?.flatMap((p) => p.blogs) || [];

  return (
    <section>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORY */}
      <div>
        {["All", "Tech", "AI", "Design"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* BLOGS */}
      {blogs.map((blog) => (
        <div key={blog._id}>{blog.title}</div>
      ))}

      {/* LOAD MORE */}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          Load More
        </button>
      )}

    </section>
  );
}