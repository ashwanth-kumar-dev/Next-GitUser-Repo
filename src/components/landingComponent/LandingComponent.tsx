"use client";
import Link from "next/link";
import CardComponent from "../card/CardComponent";
import Button from "../button/Button";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import { UserDetail } from "../commonUtils/typeInterface";
import { useState } from "react";
import { getApi } from "../commonUtils/apiUtils";
import { getNextLink } from "../commonUtils/helperFunctions";

type UserListProps = {
  userList: UserDetail[];
  limit?: number;
  nextLink?: string;
};
/**
 *
 * @description This is Landing Load the data from based on Infinite scroll concept. This is because the
 *              Link from response headers does n't give rel='last'
 *              This API - https://api.github.com/users does not support us with last link value
 *              whereas this API - https://api.github.com/users/{userName}/repos
 * @returns JSX.Element
 */
export default function LandingCompnent({
  userList,
  limit = 8,
  nextLink = "",
}: UserListProps) {
  const searchParam = useSearchParams();
  const page = searchParam?.get("page") || "1";
  const currPageNo = parseInt(page as string);

  const [userLists, setUserLists] = useState(userList);
  const [nextLinkToLoad, setNextLinkToLoad] = useState(nextLink);

  const handleUserData = async () => {
    try {
      const res = await getApi(
        "/users" + nextLinkToLoad.split("/users")?.[1],
        true
      );
      const { data, headers } = res;
      if (data?.length > 0) setUserLists([...userLists, ...data]);
      if (headers) {
        const trimmedLink = getNextLink(headers, "next");
        setNextLinkToLoad(trimmedLink);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="m-8 w-fit flex flex-wrap gap-8">
        {userLists &&
          userLists.map((e, index) => {
            return (
              <CardComponent
                key={e?.id}
                cardTitle={e?.login}
                cardDescription={
                  <Link href={e?.html_url} className="text-lg">
                    {e?.html_url}
                  </Link>
                }
                cardImage={e?.avatar_url}
                roundedImage={true}
              >
                <Button
                  label="See More"
                  link={`user/${e?.login}`}
                  variant="primary rounded-lg mt-2"
                />
              </CardComponent>
            );
          })}
      </div>
      <Button
        label={<p className="mx-auto w-60">Load More</p>}
        variant="primary rounded-lg w-60 items-center flex mx-auto mt-2"
        onClick={handleUserData}
      />
    </>
  );
}
