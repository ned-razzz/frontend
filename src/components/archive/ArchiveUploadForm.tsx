"use client";

import React, { ChangeEvent, useState } from "react";
import { supabase } from "~/src/lib/supabase";
import { PostType } from "~/src/app/api/archive/route";

// // 한글을 유니코드로 변환하는 함수
// function encodeToUnicode(str) {
//   return str.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join('')
// }

// // 유니코드를 한글로 변환하는 함수
// function decodeFromUnicode(unicodeStr) {
//   return unicodeStr.split('\\u').slice(1).map(code => String.fromCharCode(parseInt(code, 16))).join('')
// }

const ArchiveUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");

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

    // upload to supabase storage
    const { data, error } = await supabase.storage
      .from("project-lamp")
      .upload(`archive/${file.name}`, file);

    // error check
    if (error) {
      throw error;
    }
    if (data.path ?? false) {
      throw new Error("No file path");
    }

    return data.path;
  };

  // upload file metadata to supabase
  const uploadPost = async (filePath: string) => {
    const postData: PostType = {
      title: title,
      description: description === "" ? null : description,
      tags: tags.split(",").map((tag) => tag.trim()),
      file_url: filePath!,
    };

    const response = await fetch("/api/archive", {
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

    const newPost = await response.json();
    console.log("New post created:", newPost);
  };

  // execute upload
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const filePath = await uploadFile();
      await uploadPost(filePath!);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to create post: ", error.message);
        return;
      }
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

export default ArchiveUploadForm;
