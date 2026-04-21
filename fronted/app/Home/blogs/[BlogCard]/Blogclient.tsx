"use client";

import React from "react";

type Blog = {
  title: string;
  subTitle: string;
  content: string;
  category: string;
  image: string;
  isPublished: boolean;
  contentSource: string;

  aiAnalysis: {
    words: number;
    sentences: number;
    paragraphs: number;
    avgSentenceLength: string;
    totalScore: number;
    verdict: string;
  };

  createdAt: string;
  updatedAt: string;
};

type BlogClientProps = {
  blog: Blog;
};

const Blogclient = ({ blog }: BlogClientProps) => {


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
     
      <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mb-4">
        {blog.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight mb-3">
        {blog.title}
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-6">
        {blog.subTitle}
      </p>

      {/* Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[450px] object-cover rounded-2xl mb-8"
      />

      

      {/* Content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      
    </div>
  );
};

export default Blogclient;