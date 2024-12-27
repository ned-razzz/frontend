import { Post, Tag } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PostCard from "~/src/components/archive/PostCard";

async function getTags() {
  try {
    const response = await fetch("http://localhost:3000/api/archive/tags");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { tags } = await response.json();
    return tags as Tag[];
  } catch (error) {
    console.error("Failed to fetch tags:", error);
  }
}

async function getPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/archive/posts");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { posts }: { posts: (Post & { tags: Tag[] })[] } = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

const Archive: React.FC = async () => {
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
          <PostCard key={post.post_id} data={post} className="mb-3" />
        ))}
      </section>
    </>
  );
};

export default Archive;
