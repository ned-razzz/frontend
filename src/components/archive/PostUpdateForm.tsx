"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PostToUpdate } from "~/src/app/api/archive/posts/route";

// todo: 나중에 파일까지 변경할 수 있도록 설정
const PostUpdateForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const router = useRouter();

  const updatePost = async () => {
    try {
      const updateData: PostToUpdate = {
        postId: "100",
        title,
        description,
      };

      const response = await fetch(`api/archive/posts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg);
      }
    } catch {
      console.error("Failed to delete post: ");
    }
  };

  // execute upload
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      updatePost();
      router.push("/archive");
    } catch (error) {
      console.error("Failed to create post: ", error);
    }
  };

  return (
    <form className="flex flex-col items-start gap-2" onSubmit={submitForm}>
      <label>자료 제목</label>
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>자료 설명</label>
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>태그</label>
      <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
      <button type="submit">적용</button>
    </form>
  );
};

export default PostUpdateForm;
