"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, X } from "lucide-react";
import Form from "next/form";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState(initialSearch);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handelClear = () => {
    if (initialSearch) {
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      setSearchValue("");
      router.replace(`?${params.toString()}`);
    } else {
      setSearchValue("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-1" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search transactions..."
        className="form-input pl-10 pr-4 py-2 rounded-md focus:outline-1 focus:outline-primary-500"
      />
      <X
        className={`cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 size-9 p-2 text-gray-1 transition-all duration-300 hover:scale-110
          ${initialSearch || searchValue ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45"}
        `}
        onClick={handelClear}
      />
    </form>
  );
}
