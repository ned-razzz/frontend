import React from "react";
import ArchiveUploadForm from '~/src/components/archive/ArchiveUploadForm';

const ArchiveUpload: React.FC = () => {
  return (
    <>
      <h1 className="mb-4">자료 등록</h1>
      <ArchiveUploadForm />
    </>
  );
}

export default ArchiveUpload;