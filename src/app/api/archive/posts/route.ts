import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/src/lib/prisma";

export interface PostType {
  title: string;
  description: string | null;
  tags: string[];
  file_url: string;
}

export const POST = async (req: NextRequest) => {
  const { title, description, tags, file_url }: PostType = await req.json();

  const tagListCreate = tags.map((tag) => ({
    where: { name: tag },
    create: { name: tag },
  }));

  try {
    await prisma.post.create({
      data: {
        title,
        description,
        file_url,
        tags: {
          connectOrCreate: tagListCreate,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Failed to create post", status: 400 });
  }

  return NextResponse.json({ status: 200 });
};

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: { tags: true },
    });
    console.log(posts);

    const formattedPosts = posts.map((post) => ({
      ...post,
      post_id: post.post_id.toString(),
      tags: post.tags.map((tag) => ({ ...tag, tag_id: tag.tag_id.toString() })),
    }));

    return NextResponse.json({ posts: formattedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ status: 500, message: "Error fetching posts" });
  }
};
