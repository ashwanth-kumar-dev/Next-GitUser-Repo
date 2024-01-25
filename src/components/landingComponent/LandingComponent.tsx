"use client"
import Link from "next/link";
import CardComponent from "../card/CardComponent";
import Button from "../button/Button";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import { UserDetail } from "../commonUtils/typeInterface";

type UserListProps = {
  userList: UserDetail[];
  limit?: number
};
export default function LandingCompnent({ userList, limit = 8 }: UserListProps) {

    const searchParam = useSearchParams()
    const page = searchParam?.get('page') || '1'
    const currPageNo = parseInt(page as string)
  return (
    <>
      {userList &&
        userList.map((e, index) => {
          if( index >= (currPageNo - 1)*limit && index < currPageNo * limit)
          return (
            <CardComponent
              key={e?.id}
              cardTitle={e?.login}
              cardDescription={<Link href={e?.html_url} className="text-lg">{e?.html_url}</Link>}
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
        <Pagination totalCount={userList?.length || 0} startIndex={currPageNo} limit={limit}/>
    </>
  );
}
