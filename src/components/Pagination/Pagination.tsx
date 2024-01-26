"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useReducer } from "react";
import Button from "../button/Button";

type PaginationProps = {
  totalCount: number;
  limit: number;
  pageLimitDisplay?: number;
  startIndex: number;
};

export default function Pagination({
  totalCount,
  limit,
  pageLimitDisplay = 3,
  startIndex,
}: PaginationProps) {
  const totalPageCount = Math.ceil(totalCount / limit);
  const router = useRouter();
  const pathName = usePathname()
  const searchParam = useSearchParams();
  const page = searchParam?.get("page") || "1";
  const currPageNo = parseInt(page as string);

  type actions = {
    type: string;
  };

  type indexState = {
    startIndex: number;
  };

  const pageReducerFunc = (state: indexState, action: actions) => {
    switch (action.type) {
      case "Next":
        router.push(`${pathName}?page=${currPageNo + 1}`);
        return { ...state, startIndex: state.startIndex + 1 };

      case "Prev":
        router.push(`${pathName}?page=${currPageNo - 1}`);
        return { ...state, startIndex: state.startIndex - 1 };

      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(pageReducerFunc, { startIndex });

  const renderPagination = () => {
    const data = [];
    for (
      let index = state.startIndex;
      index <= totalPageCount && index <= state.startIndex + (pageLimitDisplay - 1);
      index++
    ) {
      data.push(
        <Button
          variant={`${currPageNo === index ? "primary" : "outline-primary"} font-bold`}
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
          onClick={() => dispatch({ type: "Prev" })}
          disabled={state.startIndex <= 1}
        />
        {renderPagination()}
        <Button
          variant="outline-primary font-bold"
          label=">"
          onClick={() => dispatch({ type: "Next" })}
          disabled={state.startIndex + (pageLimitDisplay - 1) >= totalPageCount}
        />
      </div>
    </div>
  );
}
