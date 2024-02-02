import { getApi } from "@/components/commonUtils/apiUtils";
import { getNextLink } from "@/components/commonUtils/helperFunctions";
import { UserDetail } from "@/components/commonUtils/typeInterface";
import LandingCompnent from "@/components/landingComponent/LandingComponent";

async function allUserData() {
  let userList: UserDetail[] = [];
  let next: string = ''
  try {
    const { data, headers} = await getApi("/users", true);

    if(data?.length > 0) {
      userList = [...data];
    }
    if (headers) {
      next = getNextLink(headers, 'next')
    }
  } catch (error) {
    console.log(error);
  }
  return {
    userList,
    nextLink: next
  };
}
export default async function Home() {
  const { userList, nextLink } = await allUserData();
  const limit = 8;
  return (
    <div>
      {userList?.length > 0 ? (
        <LandingCompnent userList={userList} limit={limit} nextLink = {nextLink}/>
      ) : (
        <div className="w-screen min-h-screen">
          <h1 className="w-fit mt-10 mx-auto font-bold text-3xl">
            Sorry we are unable to fetch data. Please try again later
          </h1>
        </div>
      )}
    </div>
  );
}
