import Link from "next/link";
import React from "react";
import Post from "~/src/components/archive/Post";
import { supabase } from "~/src/lib/supabase";


/**
 * Converts a timestamptz string to a date string in the format YYYY-MM-DD.
 * @param {string} timestamptz - The timestamptz string to convert.
 * @returns {string} - The formatted date string.
 */
export function formatDate(timestamptz: string): string {
  const date = new Date(timestamptz);
  const year = date.getFullYear().toString().slice(2, 4);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

async function fetchTags() {
  const { data, error } = await supabase
    .from('tags')
    .select();

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data.map((tag) => ({ 
    id: tag.tag_id, 
    name: tag.name 
  }));
}

async function fetchRecords() {
  const { data, error } = await supabase
    .from('records')
    .select(`
      record_id, 
      title, 
      description, 
      created_at,
      updated_at,
      tags(tag_id, name)
      `);

  if (error) {
    console.error('Error fetching :', error);
    return [];
  }

  return data.map((record) => ({
    recordId: record.record_id, 
    title: record.title,
    description: record.description,
    createdAt: formatDate(record.created_at),
    updatedAt: formatDate(record.updated_at),
    tags: record.tags.map((tag) => ({ 
      id: tag.tag_id, 
      name: tag.name 
    }))
  }));
}

const Archive: React.FC = async () => {
  const tags = await fetchTags();
  console.log(tags);
  const records = await fetchRecords();

  return (
    <>
      <aside className="mb-5">
        <h2 className="text-lg">태그 목록</h2>
        <ul className="text-sm">
          {tags.map(tag => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </aside>
      <section className="mb-5">
        <Link href="/archive/new" className="p-2 border-2 border-black">자료 등록</Link>
      </section>
      <section>
        {records.map(record => (
          <Post 
            key={record.recordId} 
            record={record}
            className="mb-3" 
          />
        ))}
      </section>
    </>
  );
}

export default Archive;
