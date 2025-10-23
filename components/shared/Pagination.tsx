"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PaginationTransactions({ nofPages = 1 }: { nofPages: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showEllipsis, setShowEllipsis] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1");

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "pageNumber",
      pageNumber > 0 ? `${pageNumber - 1}` : `${pageNumber}`
    );
    router.replace(`?${params.toString()}`);
  };

  const handleNext = () => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "pageNumber",
      pageNumber < nofPages ? `${pageNumber + 1}` : `${pageNumber}`
    );
    router.replace(`?${params.toString()}`);
  };

  const handleCurr = (n: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNumber", `${n}`);
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      // نفحص لو المستخدم وصل لنهاية الشريط
      const isEnd =
        container.scrollWidth - container.scrollLeft <=
        container.clientWidth + 5; // 5px tolerance
      setShowEllipsis(!isEnd); // لو وصل للنهاية → نخفي النقاط
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // نفحص أول مرة عند mount

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Pagination>
      <PaginationContent className="flex items-center">
        {/*//! Prev */}
        <PaginationItem onClick={handlePrev}>
          <PaginationPrevious
            href={`#${pageNumber > 1 ? pageNumber - 1 : pageNumber}`}
          />
        </PaginationItem>


        {/*//! Pages */}
        <div
          ref={scrollRef}
          className="flex py-1 px-1 gap-2 sm:gap-3 max-w-[calc(100vw-150px)] sm:max-w-[400px] overflow-auto custom-scrollbar"
        >
          {Array(nofPages)
            .fill(null)
            .map((_, i) => (
              <PaginationItem
                key={i}
                id={`${i + 1}`}
                onClick={() => handleCurr(i + 1)}
              >
                <PaginationLink
                  href={`#${i + 1}`}
                  isActive={i + 1 === pageNumber}
                  className={`bg-dark-2
                    ${
                      i + 1 === pageNumber &&
                      "bg-dark-3/50 border-none shadow-md shadow-primary-500 text-primary-500"
                    }`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
        </div>

        {/*//! Ellipsis */}
          <PaginationItem className={`transition-all duration-200 max-w-0 overflow-hidden ${showEllipsis && "max-w-[1000px]"}`}>
            <PaginationEllipsis />
          </PaginationItem>

        {/*//! Next */}
        <PaginationItem onClick={handleNext}>
          <PaginationNext
            href={`#${pageNumber < nofPages ? pageNumber + 1 : pageNumber}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
