"use client";
import { FC, useState } from "react";
import PostDetail from "./PostDetail";
import { PostFullyLoaded } from "~/src/app/archive/types";

interface PostProps {
  className?: string;
  post: PostFullyLoaded;
}

const PostCard: FC<PostProps> = ({ className, post }) => {
  const [isDetail, setIsDetail] = useState(false);

  function toggleDetail() {
    setIsDetail(!isDetail);
  }

  const getFileBlob = async (url: string) => {
    const queryParams = new URLSearchParams(Object.entries({ fileUrl: url }));
    const response = await fetch(`http://localhost:3000/api/archive/files?${queryParams}`);
    const blob = await response.blob();
    return blob;
  };

  const downloadFile = async () => {
    // get file blob and convert to url
    const fileBlob = await getFileBlob(post.files[0].url);
    const url = URL.createObjectURL(fileBlob);

    // download file to client
    const link = document.createElement("a");
    link.href = url;
    link.download = post.files[0].name;
    link.click();

    // url meomory release
    URL.revokeObjectURL(url);
  };

  return (
    <article className={`${className} border-t-2 border-b-2 p-3`}>
      <section className="flex flex-row">
        <section className="flex-1">
          <h3>{post?.title}</h3>
          <p className="flex flex-row gap-2">
            {post?.tags.map((tag) => (
              <span key={tag.tag_id}>#{tag.name}</span>
            ))}
          </p>
        </section>
        <section className="w-20 flex items-center justify-center">
          <div onClick={downloadFile} className="w-full h-full border-black border" />
        </section>
      </section>
      {/* 자세히 보기 섹션 */}
      {isDetail && (
        <section>
          <PostDetail post={post} />
        </section>
      )}
      <button onClick={toggleDetail}>{isDetail ? "닫기" : "자세히 보기"}</button>
    </article>
  );
};
export default PostCard;
