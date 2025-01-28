import { Tag } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { PostFullyLoaded } from "./types";
import PostList from "~/src/components/archive/PostList";
import SearchSect from "~/src/components/archive/SearchSect";

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
      <section className="mb-5">
        <h2 className="text-lg">태그 검색</h2>
        <ul className="text-sm">
          {tags?.map((tag: Tag) => (
            <li key={tag.tag_id} className="inline-block mr-2">
              {tag.name}
            </li>
          ))}
        </ul>
      </section>
      <SearchSect />
      <section className="mb-5 flex items-center">
        <Link href="/archive/new" className="px-5 py-2 border-2 border-black">
          자료 등록
        </Link>
      </section>
      <PostList data={posts!} />
    </>
  );
};

export default ArchivePage;
