"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { PostFullyLoaded } from "~/src/app/archive/types";

interface DetailProps {
  post: PostFullyLoaded;
}

/**
 * Converts a timestamptz string to a date string in the format YYYY-MM-DD.
 * @param {string} timestamptz - The timestamptz string to convert.
 * @returns {string} - The formatted date string.
 */
function formatDate(timestamptz: Date): string {
  const date = new Date(timestamptz);
  const year = date.getFullYear().toString().slice(2, 4);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

const PostDetail: React.FC<DetailProps> = ({ post }) => {
  const router = useRouter();

  const deletePost = async () => {
    try {
      const params = Object.entries({ postId: post.post_id.toString() });
      const query = new URLSearchParams(params);

      const response = await fetch(`api/archive/posts?${query}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg);
      }

      router.replace("/archive");
    } catch {
      console.error("Failed to delete post");
    }
  };

  return (
    <div>
      <p>{post.description ?? ""}</p>
      <time>
        생성 {formatDate(post.created_at)} / 수정 {formatDate(post.updated_at)}
      </time>
      <div>
        <Link href="/archive/update">수정</Link>
        <button onClick={deletePost}>삭제</button>
      </div>
    </div>
  );
};

export default PostDetail;
