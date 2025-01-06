import { Tag } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PostCard from "~/src/components/archive/PostCard";
import { PostFullyLoaded } from "./types";

const getTags = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/archive/tags`);
    if (!response.ok) {
      throw new Error(`getTags ${response.status}`);
    }
    const { tags } = await response.json();
    return tags as Tag[];
  } catch (error) {
    // if error fetch, return empty data
    if (error instanceof Error) {
      console.error("Failed to fetch tags: ", error.message);
      return [];
    }
  }
};

const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/archive/posts`);
    if (!res.ok) {
      throw new Error(`getPosts ${res.status}`);
    }
    const data: PostFullyLoaded[] = await res.json();
    return data;
  } catch (error) {
    // if error fetch, return empty data
    if (error instanceof Error) {
      console.error("Failed to fetch posts: ", error.message);
      return [];
    }
  }
};

const ArchivePage: React.FC = async () => {
  const tags = await getTags();
  const posts = await getPosts();

  return (
    <>
      <aside className="mb-5">
        <h2 className="text-lg">태그 목록</h2>
        <ul className="text-sm">
          {tags?.map((tag: Tag) => (
            <li key={tag.tag_id}>{tag.name}</li>
          ))}
        </ul>
      </aside>
      <section className="mb-5">
        <Link href="/archive/new" className="p-2 border-2 border-black">
          자료 등록
        </Link>
      </section>
      <section>
        {posts?.map((post) => (
          <PostCard key={post.post_id} className="mb-3" post={post} />
        ))}
      </section>
    </>
  );
};

export default ArchivePage;
