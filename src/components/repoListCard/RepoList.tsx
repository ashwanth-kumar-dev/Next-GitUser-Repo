import Pagination from "../Pagination/Pagination";
import Button from "../button/Button";
import { RepoDetail } from "../commonUtils/typeInterface";

type RepoDetailSection = {
  repoDetails: RepoDetail[];
  pageNo: number;
  lastPage?: number;
};
export default function RepoList({
  repoDetails,
  pageNo,
  lastPage,
}: RepoDetailSection) {
  const per_page = 5;

  return (
    <section className="p-4 grow">
      <div className="flex gap-2 items-center pb-2">
        <h1 className="text-2xl font-bold">Public Repository List</h1>
        <p className="bg-[#2980b9] rounded-full h-fit text-xl w-fit px-3 font-bold">
          {repoDetails?.length || 0}
        </p>
      </div>
      {repoDetails?.length > 0 &&
        repoDetails.map((e, index) => {
          return (
            <div
              className="flex justify-between border-t-2 border-gray-200 items-center"
              key={index}
            >
              <div className="mr-1 m-2">
                <p className="font-bold text-xl py-2">{e?.name}</p>
                <p className="text-sm text-gray-600 py-2">{e?.description}</p>
                <div className="flex gap-2 items-center py-2">
                  <p className="text-sm font-bold">Language</p>
                  <p className="text-sm text-gray-600">{e?.language}</p>
                </div>
                <div className="flex gap-2 items-center py-2">
                  <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    className="octicon octicon-eye mr-2"
                  >
                    <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path>
                  </svg>
                  <p className="font-semibold text-[gray] text-sm">
                    {e?.watchers}
                  </p>
                  <p className="font-semibold text-sm">Watches</p>
                </div>
              </div>
              <Button
                label="View"
                type="button"
                variant="primary h-fit rounded-lg"
                link={e?.html_url || ""}
              />
            </div>
          );
        })}
      <Pagination
        totalPageCount={lastPage || pageNo || 1}
        pageNo = {pageNo}
        limit={per_page}
      />
    </section>
  );
}
