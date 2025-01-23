import { Tag } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "~/src/lib/prisma";

export const GET = async () => {
  try {
    // get tags list that only have connections of post.
    const tags: Tag[] = await prisma.$queryRaw`
      SELECT t.tag_id, t.name
      FROM "_PostToTag" pt
        JOIN "Tag" t ON pt."B" = t.tag_id
      GROUP BY t.tag_id;
    `;

    // formatted tag_id to string: cannot serealize BigInt to JSON
    const formattedTags = tags.map((tag) => ({
      ...tag,
      tag_id: tag.tag_id.toString(),
    }));

    return NextResponse.json({ tags: formattedTags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ status: 500, message: "Error fetching tags" });
  }
};
