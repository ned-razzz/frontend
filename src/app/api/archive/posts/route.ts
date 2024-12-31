import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/src/lib/prisma";
import { replacerBigint } from "~/src/lib/utils/replacerBigint";

export interface PostRecord {
  title: string;
  description: string | null;
  tags: string[];
  files: FileRecord[];
}

export interface FileRecord {
  name: string;
  url: string;
}

// add record Post table and File table
// if tag does not exist, add tag to Tag table
export const POST = async (req: NextRequest) => {
  const { title, description, tags, files }: PostRecord = await req.json();

  const tagListCreate = tags.map((tag) => ({
    where: { name: tag },
    create: { name: tag },
  }));

  try {
    await prisma.post.create({
      data: {
        title,
        description,
        files: {
          createMany: {
            data: files,
          },
        },
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
      include: {
        tags: {
          select: { tag_id: true, name: true },
        },
        files: {
          select: { file_id: true, name: true, url: true },
        },
      },
    });

    const postsJson = JSON.stringify(posts, replacerBigint);

    return new NextResponse(postsJson, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ status: 500, message: "Error fetching posts" });
  }
};
