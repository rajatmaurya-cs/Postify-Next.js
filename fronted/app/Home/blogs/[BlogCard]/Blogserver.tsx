import React from "react";
import Blogclient from "./Blogclient";
import api from "../../../../lib/axios";

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

type BlogServerProps = {
  Id: string;
};

const Blogserver = async ({ Id }: BlogServerProps) => {

  console.log("The id is: ",Id);

  const { data: blog } = await api.get<Blog>(`http://localhost:3000/api/blog/blogbyid/${Id}`, {
    params: {
      blogId: Id,
    },
  });

  return (
    <div>
      <Blogclient blog={blog} />
    </div>
  );
};

export default Blogserver;