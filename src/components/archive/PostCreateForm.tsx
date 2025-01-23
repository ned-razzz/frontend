"use client";

import React, { ChangeEvent, useState } from "react";
import { supabase } from "~/src/lib/supabase";
import { FileRecord, PostRecord } from "~/src/app/api/archive/posts/route";
import crypto from "crypto";
import { useRouter } from "next/navigation";

const PostCreateForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const router = useRouter();

  // file select
  const selectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      throw new Error("No file selected");
    }
    setFile(event.target.files[0]);
  };

  // file upload to supabase storage
  const uploadFile = async () => {
    // file null check
    if (!file) {
      throw new Error("No file selected");
    }

    //need to create a unique identifier for the file
    const hash = crypto.createHash("sha256");
    hash.update(file.name + Date.now().toString());
    const fileIdentifier = `${hash.digest("hex")}`;

    // upload to supabase storage
    const { data, error } = await supabase.storage
      .from("project-lamp")
      .upload(`archive/${fileIdentifier}`, file);

    // error check
    if (error) {
      throw error;
    }

    return { url: data.path, name: file.name };
  };

  // upload file metadata to supabase
  const uploadPost = async (fileData: FileRecord) => {
    const postData: PostRecord = {
      title: title,
      description: description === "" ? null : description,
      tags: tags.split(",").map((tag) => tag.trim()),
      files: [fileData],
    };

    const response = await fetch("/api/archive/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error("Failed to create post: " + error.msg);
    }
  };

  // execute upload
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const fileData = await uploadFile();
      await uploadPost(fileData);
      router.replace("/archive");
    } catch (error: unknown) {
      console.error("Failed to create post: ", error);
    }
  };

  return (
    <form className="flex flex-col items-start gap-2" onSubmit={submitForm}>
      <input
        className="block w-full mb-2"
        type="file"
        onChange={selectFile}
        accept="image/*,video/*,.pdf,.hwp"
      />
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
      <button type="submit">등록</button>
    </form>
  );
};

export default PostCreateForm;
