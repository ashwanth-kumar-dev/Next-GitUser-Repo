import { getApi } from "@/components/commonUtils/apiUtils";
import { UserDetail } from "@/components/commonUtils/typeInterface";
import LandingCompnent from "@/components/landingComponent/LandingComponent";

async function allUserData() {
  let userList: UserDetail[] = [];
  try {
    const res = await getApi("/users");
    userList = [...res];
  } catch (error) {
    console.log(error);
  }
  return {
    userList,
  };
}
export default async function Home() {
  const { userList } = await allUserData();
  const limit = 8
  return (
    <div className="m-8 w-fit flex flex-wrap gap-8">
      <LandingCompnent userList={userList} limit={limit}/>
    </div>
  );
}
