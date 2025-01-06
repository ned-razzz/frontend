-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_post_id_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
