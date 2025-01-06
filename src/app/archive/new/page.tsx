import React from "react";
import PostCreateForm from "~/src/components/archive/PostCreateForm";

const ArchiveUpload: React.FC = () => {
  return (
    <>
      <h1 className="mb-4">자료 등록</h1>
      <PostCreateForm />
    </>
  );
};

export default ArchiveUpload;
