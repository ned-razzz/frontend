import { NextResponse } from "next/server";
import { prisma } from "~/src/lib/prisma";

export const GET = async () => {
  try {
    const tags = await prisma.tag.findMany();

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
