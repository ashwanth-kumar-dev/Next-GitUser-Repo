import Button from "@/components/button/Button";
import { getApi } from "@/components/commonUtils/apiUtils";
import { RepoDetail, UserDetail } from "@/components/commonUtils/typeInterface";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";
import Header from "@/components/header/Header";
import RepoList from "@/components/repoListCard/RepoList";

type UserDetailProps = {
  userDetail: UserDetail;
  repoDetails: RepoDetail[];
  pageNo?: number
};

export default function UserDetails({ userDetail, repoDetails, pageNo }: UserDetailProps) {
  return (
    <>
      <Header />
      <div className="lg:flex p-8 ">
        <section className="text-center w-80 pr-8 mx-auto lg:border-r-4 lg:border-gray-200">
          {userDetail?.avatar_url && (
            <Image
              src={userDetail?.avatar_url}
              height={300}
              width={300}
              alt="card.img"
              className="rounded-full m-auto"
            />
          )}
          <h1 className="text-2xl font-bold py-4">{userDetail?.name}</h1>
          <p className="text-md font-bold text-gray py-4">
            {userDetail?.login}
          </p>
          <div className="flex gap-2 items-center py-4 mx-auto w-fit">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="octicon octicon-link"
            >
              <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
            </svg>
            <Link href={userDetail?.blog || ""} className="underline text-[blue]">{userDetail?.blog || ""}</Link>
          </div>
          <Button
            label={<p className="mx-auto w-60">Follow</p>}
            variant="primary rounded-lg w-60 items-center flex mx-auto"
            link={userDetail?.html_url}
          />
          <div className="flex gap-1 items-center py-4 mx-auto w-fit">
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="octicon octicon-people"
            >
              <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
            </svg>
            {userDetail?.followers}
            <p className="font-bold text-[gray] mr-2">followers</p>
            {userDetail?.following}
            <p className="font-bold text-[gray]">following</p>
          </div>
          {userDetail?.location && (
            <div className="flex gap-3 py-4 items-center mx-auto w-fit">
              <p className="font-bold text-xl ">Location</p>
              <p>{userDetail?.location}</p>
            </div>
          )}

          {userDetail?.company && (
            <>
              <div className="pt-4 pb-1 mx-auto w-fit">
                <p className="font-bold text-xl text-start">
                  Organizations
                </p>
              </div>
              <p className="w-2/3 mx-auto">{userDetail?.company}</p>
            </>
          )}
        </section>
        <RepoList  repoDetails = {repoDetails} pageNo = {pageNo || 1}/>
      </div>
    </>
  );
}

export async function getServerSideProps(context: { params: any, query: any }) {
  // Fetch data from an external API or database
  let userDetail: UserDetail = {
    id: "",
    login: "",
    html_url: "",
    blog: "",
    location: "",
    company: "",
  };
  let repoDetails : RepoDetail[] = [{
    name: "",
    html_url: "",
  }]
  const { params, query } = context;
  const { id } = params;
  const { page = '1' } = query
  try {
    const res = await getApi(`/users/${id}`);
    userDetail = { ...res }; 
    const repoRes = await getApi(`/users/${id}/repos`)
    if( repoRes?.length > 0)
    repoDetails =[...repoRes].filter((e) => e?.visibility === 'public')
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return {
    props: {
      userDetail,
      repoDetails,
      pageNo: parseInt(page)
    },
  };
}
