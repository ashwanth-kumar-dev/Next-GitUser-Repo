"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Button from "../button/Button";

type PaginationProps = {
  totalCount?: number;
  limit: number;
  pageNo: number;
  pageLimitDisplay?: number;
  totalPageCount?: number;
};

export default function Pagination({
  totalCount = 1,
  limit,
  pageNo,
  pageLimitDisplay = 5,
  totalPageCount,
}: PaginationProps) {
  const totalPage = totalPageCount || Math.ceil(totalCount / limit) || 1;
  const router = useRouter();
  const pathName = usePathname();
  const currPageNo = pageNo;
  const startIndex = currPageNo - (pageLimitDisplay - 1) / 2;
  const finalIndex = currPageNo + (pageLimitDisplay - 1) / 2;


  const pageFunc = (type: string = "") => {
    switch (type) {
      case "Next":
        router.push(`${pathName}?page=${currPageNo + 1}`);
        break;

      case "Prev":
        router.push(`${pathName}?page=${currPageNo - 1}`);
        break;

      default:
        break;
    }
  };

  const renderPagination = () => {
    const data = [];
    let minLimit: number = 1;
    let maxLimit: number = pageLimitDisplay;

    if (
      startIndex <= 1 &&
      finalIndex >= totalPage
    ) {
      minLimit = 1;
      maxLimit = pageLimitDisplay;
    } else if (
      !(
        startIndex <= 1 ||
        totalPage <= pageLimitDisplay
      ) &&
      finalIndex < totalPage
    ) {
      minLimit = startIndex;
      maxLimit = finalIndex;
    } else if (finalIndex >= totalPage) {
      minLimit = totalPage - (pageLimitDisplay - 1);
      maxLimit = totalPage;
    }
    for (
      let index = minLimit;
      index <= totalPage && index <= maxLimit;
      index++
    ) {
      data.push(
        <Button
          variant={`${
            currPageNo === index ? "primary" : "outline-primary"
          } font-bold`}
          label={index?.toString()}
          onClick={() => router.push(`${pathName}?page=${index}`)}
          key={index}
        />
      );
    }
    return data;
  };

  return (
    <div className="w-full p-5">
      <div className="float-right relative w-fit bottom-8 ">
        <Button
          variant="outline-primary font-bold "
          label="<"
          onClick={() => pageFunc("Prev")}
          disabled={startIndex <= 1}
        />
        {renderPagination()}
        <Button
          variant="outline-primary font-bold"
          label=">"
          onClick={() => pageFunc("Next")}
          disabled={finalIndex >= totalPage}
        />
      </div>
    </div>
  );
}
