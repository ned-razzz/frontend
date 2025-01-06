import { Prisma } from "@prisma/client";

// Post component data type
export type PostFullyLoaded = Prisma.PostGetPayload<{
  include: {
    tags: { select: { tag_id: true; name: true } };
    files: { select: { file_id: true; name: true; url: true } };
  };
}>;
