"use client";

import React from "react";

const SearchSect: React.FC = () => {
  //search posts by title
  const searchByTitle = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      
    } catch (error: unknown) {
      console.error("Failed to search posts by title: ", error);
    }
  };

  //search posts by tags
  const searchByTags = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
    } catch (error: unknown) {
      console.error("Failed to search posts by title: ", error);
    }
  };

  return (
    <section className="mb-5 ">
      <h2 className="text-lg">제목 검색</h2>
      <form onSubmit={searchByTitle}>
        <input className="h-8" type="text" placeholder="제목을 입력하세요" />
        <button type="submit">검색</button>
      </form>
      <h2 className="text-lg">태그 검색</h2>
      <form onSubmit={searchByTags}>
        <input className="h-8 grow" type="text" placeholder="태그를 입력하세요" />
        <button type="submit">검색</button>
      </form>
    </section>
  );
};

export default SearchSect;
