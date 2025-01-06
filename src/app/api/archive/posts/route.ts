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

export interface PostToUpdate {
  postId: string;
  title: string;
  description: string;
  // tags: string[];
  // files: string[];
}

// get all posts with tags and files
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
    return NextResponse.json({ status: 400, msg: "Error fetching posts" });
  }
};

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

// todo: should save backup data in case of rollback data.
export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");
    if (!postId) {
      throw new Error("Post ID is required");
    }
    console.log("post id : " + postId);

    await prisma.post.delete({
      where: {
        post_id: BigInt(postId),
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ msg: "Failed to delete post: " + error.message, status: 400 });
    }
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { postId, title, description }: PostToUpdate = await req.json();

    const tagNames = ["변경1", "변경2", "태그1"];

    // set works single transaction
    await prisma.$transaction(async (prismaTransact) => {
      // get tags by name
      // if each tag doesn't exist, create tag
      const getTags = await Promise.all(
        tagNames.map(async (name) => {
          return await prismaTransact.tag.upsert({
            where: { name }, // 태그 이름 기준으로 찾기
            update: {}, // 이미 존재하면 아무 작업도 하지 않음
            create: { name }, // 존재하지 않으면 생성
            select: {
              tag_id: true,
            },
          });
        })
      );

      //update post
      await prismaTransact.post.update({
        where: {
          post_id: BigInt(postId),
        },
        data: {
          title: title,
          description: description,
          tags: {
            set: [],
            connect: getTags,
          },
        },
      });
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ msg: "Failed to delete post: " + error.message, status: 400 });
    }
  }
};
