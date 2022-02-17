export function LatestUpdatedRepos({ data }: { data: any }) {
  return (
    Array.isArray(data) ? (
      <div className="p-2" id="latest-updated-repos">
        <h3 className="inline-flex border-b-4 text-2xl mb-6">
          Latest Updated Repos
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data
            .filter((i: { isFork: any }) => !i.isFork)
            .slice(0, 5)
            .map((i: any, index: number) => (
              <a
                className="ring-2 ring-gray-400 dark:ring-gray-300 p-3 rounded-md text-xs hover:shadow-md hover:transition-transform hover:scale-[1.02] hover:duration-300"
                title={i.description}
                key={index}
                href={`https://github.com/${i.nameWithOwner}`}
                target={"_blank"}
              >
                <h3 className="mb-2 font-bold">{i.nameWithOwner}</h3>
                <p className="truncate mb-2">{i.description}</p>
                <div className="flex gap-2 text-gray-500 justify-end">
                  <span>{i.stargazerCount} stars</span>
                  <span>{i.forkCount} forks</span>
                </div>
              </a>
            ))}
          <a
            href="https://github.com/arisris"
            target={"_blank"}
            className="flex justify-center items-center font-bold hover:underline gap-2 animate-pulse hover:animate-none"
          >
            <span>See More</span>
            <span>&raquo;</span>
          </a>
        </div>
      </div>
    ) : null
  );
}
