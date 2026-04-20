import Blogserver from "./Blogserver";

type BlogCardProps = {
  params: Promise<{
    BlogCard: string;
  }>;
};

const BlogCard = async ({ params }: BlogCardProps) => {
  const paramsData = await params;
  const id = paramsData.BlogCard;
  console.log(id);

  return (
    <div>
      <Blogserver Id={id} />
    </div>
  );
};

export default BlogCard;