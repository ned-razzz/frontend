import { FC } from "react";
import PostCard from "./PostCard";
import { PostFullyLoaded } from "~/src/app/archive/types";

const PostList: FC<{ data: PostFullyLoaded[] }> = ({ data }) => {
  return (
    <section>
      {data?.map((post) => (
        <PostCard key={post.post_id} className="mb-3" post={post} />
      ))}
    </section>
  );
};

export default PostList;
