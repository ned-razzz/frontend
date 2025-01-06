import React from "react";
import PostUpdateForm from "~/src/components/archive/PostUpdateForm";

const ArchiveUpdate: React.FC = () => {
  return (
    <>
      <h1 className="mb-4">자료 수정</h1>
      <PostUpdateForm />
    </>
  );
};

export default ArchiveUpdate;
