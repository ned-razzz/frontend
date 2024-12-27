import React from "react";

interface DetailProps {
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  // tags: { id: number; name: string; }[];
}

/**
 * Converts a timestamptz string to a date string in the format YYYY-MM-DD.
 * @param {string} timestamptz - The timestamptz string to convert.
 * @returns {string} - The formatted date string.
 */
function formatDate(timestamptz: Date): string {
  const date = new Date(timestamptz);
  const year = date.getFullYear().toString().slice(2, 4);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

const DetailCard: React.FC<DetailProps> = ({ description, createdAt, updatedAt }) => {
  return (
    <div>
      <p>{description ?? ""}</p>
      <time>
        생성 {formatDate(createdAt)} / 수정 {formatDate(updatedAt)}
      </time>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default DetailCard;
