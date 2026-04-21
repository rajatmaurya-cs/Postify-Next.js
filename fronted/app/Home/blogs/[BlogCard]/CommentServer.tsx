import api from "@/lib/axios";
import CommentClient from "./CommentClient";

type BlogId = {
  Id: string;
};

type CreatedBy = {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
};

type Comment = {
  _id: string;
  content: string;
  blogId: string;
  createdBy: CreatedBy;
  riskLevel: "SAFE" | "MODERATE" | "HIGH";
  isApproved: boolean;
  moderatedBy: string | null;
  moderatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CommentResponse = {
  success: boolean;
  message: string;
  comments: Comment[];
};

const Commentserver = async ({ Id }: BlogId) => {
  const { data } = await api.get<CommentResponse>(
    `https://postifybackend-six.vercel.app/api/comment/allcomment/${Id}`
  );

  console.log("The CommentServer.tsx is:",data);

  return (
    <div>
      <CommentClient comments={data.comments} />
    </div>
  );
};

export default Commentserver;