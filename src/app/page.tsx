import { getApi } from "@/components/commonUtils/apiUtils";
import { UserDetail } from "@/components/commonUtils/typeInterface";
import LandingCompnent from "@/components/landingComponent/LandingComponent";

async function allUserData() {
  let userList: UserDetail[] = [];
  try {
    const res = await getApi("/users");
    if (res?.length > 0) userList = [...res];
  } catch (error) {
    console.log(error);
  }
  return {
    userList,
  };
}
export default async function Home() {
  const { userList } = await allUserData();
  const limit = 8;
  return (
    <div className="m-8 w-fit flex flex-wrap gap-8">
      {userList?.length > 0 ? (
        <LandingCompnent userList={userList} limit={limit} />
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
