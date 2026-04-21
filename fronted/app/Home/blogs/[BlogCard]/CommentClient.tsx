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
};

type Props = {
  comments: Comment[];
};

const CommentClient = ({ comments }: Props) => {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Comments ({comments.length})
      </h2>

      <div className="space-y-5">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={comment.createdBy.avatar}
                alt={comment.createdBy.fullName}
                className="w-11 h-11 rounded-full object-cover border"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  {comment.createdBy.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {comment.createdBy.email}
                </p>
              </div>
            </div>

            {/* Comment Content */}
            <p className="text-gray-700 leading-relaxed text-[15px]">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentClient;