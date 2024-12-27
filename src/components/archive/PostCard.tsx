"use client";
// import Image from 'next/image';
import { useState } from "react";
import Detail from "./DetailCard";
import { Post, Tag } from "@prisma/client";

interface PostProps {
  className?: string;
  data: Post & { tags: Tag[] };
}

const PostCard: React.FC<PostProps> = ({ className, data }) => {
  const [isDetail, setIsDetail] = useState(false);

  function toggleDetail() {
    setIsDetail(!isDetail);
  }

  return (
    <article className={`${className} border-t-2 border-b-2 p-3`}>
      <section className="flex flex-row">
        <section className="flex-1">
          <h3>{data.title}</h3>
          <p className="flex flex-row gap-2">
            {data.tags.map((tag) => (
              <span key={tag.tag_id}>#{tag.name}</span>
            ))}
          </p>
        </section>
        <section className="w-20 flex items-center justify-center">
          <div className="w-full h-full border-black border" />
        </section>
      </section>
      {/* 자세히 보기 섹션 */}
      {isDetail && (
        <section>
          <Detail
            description={data.description}
            createdAt={data.created_at}
            updatedAt={data.updated_at}
          />
        </section>
      )}
      <button onClick={toggleDetail}>{isDetail ? "닫기" : "자세히 보기"}</button>
    </article>
  );
};

export default PostCard;
