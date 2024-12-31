/*
  Warnings:

  - You are about to drop the column `file_url` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "file_url";

-- CreateTable
CREATE TABLE "File" (
    "file_id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" BIGINT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("file_id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
