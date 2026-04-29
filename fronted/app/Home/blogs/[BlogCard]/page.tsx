
import { Suspense } from "react";
import Blogserver from "./Blogserver";
import Commentserver from "./CommentServer";
import BlogSkeleton from "./Loading";

type BlogCardProps = {
  params: Promise<{
    Blogcard: string;
  }>;
};

const BlogCard = async ({ params }: BlogCardProps) => {

  const paramsData = await params;

  const id = paramsData.Blogcard;
  
  console.log(id);


  return (

    <div className="space-y-8">  

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Blog Post</h1>

      </div>


      <Suspense fallback={<BlogSkeleton />}>
        <Blogserver Id={id} />
      </Suspense>

      <Suspense   fallback={<p>Loading comments...</p>}>
        <Commentserver Id={id} />
      </Suspense>
    </div>
  );
};

export default BlogCard;



