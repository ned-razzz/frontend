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

  const downloadFile = () => {
    //Test Data
    const fileContent = "Hello, this is the content of the file!";
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // 3. 파일 강제 다운로드 처리
    const link = document.createElement("a");
    link.href = url;
    link.download = "dummy-file.txt"; // 다운로드할 파일 이름
    link.click();

    // 4. URL 메모리 해제
    URL.revokeObjectURL(url);
  };

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
          <div onClick={downloadFile} className="w-full h-full border-black border" />
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
