import { file, file_v1 } from "googleapis/build/src/apis/file";
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
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        file_url,
        tags: {
          connectOrCreate: tagListCreate,
        },
      },
    });

    // Convert BigInt fields to string
    const newPostSerialized = {
      ...newPost,
      post_id: newPost.post_id.toString(),
    };

    return NextResponse.json(newPostSerialized);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Failed to create post", status: 400 });
  }
};
