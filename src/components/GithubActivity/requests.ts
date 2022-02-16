import { UserDataType, RespositoryType, CommitType } from "./types"

const ENDPOINT = 'https://wt-7aae5801f0beb40510fbf7db372fc5c9-0.sandbox.auth0-extend.com/jv_code_git_repositories';

type GetUserRepositoriesType = (object: {
  useCache: boolean,
  cacheExpiration: number,
  ignoreRepositories: string[],
}) => Promise<UserDataType>;

export const getUserRepositories: GetUserRepositoriesType = async ({
  useCache = true,
  cacheExpiration = 24,
  ignoreRepositories = []
}) => {
  const cacheEnabled = useCache && window.localStorage;
  let localData;

  if(cacheEnabled) {
    localData = window.localStorage.getItem('gb-recent-activity');

    if(localData) {
      localData = JSON.parse(localData) as {
        createdAt: number,
        data: UserDataType,
      };

      let diffHours = Math.abs(localData.createdAt - Date.now()) / 3600000;

      if(diffHours <= cacheExpiration) {
        return localData.data as UserDataType;
      }
    }
  }

  const request = await fetch(`${ENDPOINT}?user=javierdwd`);
  const response = await request.json();

  const data = resolveQuery(response.data, { ignoreRepositories })

  if(!data) {
    throw new Error("Unexpected error");
  }

  if(cacheEnabled && data) {
    window.localStorage.setItem('gb-recent-activity', JSON.stringify({
      createdAt: Date.now(),
      data,
    }));
  }

  return data;
};

type ResolveQueryType = (data: any, options: { ignoreRepositories: string[] }) => UserDataType | false;

export const resolveQuery: ResolveQueryType = (data, options) => {
  const result: UserDataType = {
    name: data.user.name,
    url: data.user.url,
    repositories: []
  };

  if(data.user.repositories) {
    data.user.repositories.edges.forEach(({ node } : { node: any }) => {
      if(options.ignoreRepositories.includes(node.name)) {
        return;
      }

      try {
        const repository: RespositoryType = {
          name: node.name,
          id: node.id,
          url: node.url,
          description: node.description,
          commits: [],
          commitsTotalCount: node.defaultBranchRef.target.history.totalCount,
          commitListUrl: `${node.url}/commits/${node.defaultBranchRef.name}`,
        };

        const latestCommits = node.defaultBranchRef.target.history.edges;

        repository.commits = latestCommits.map(({ node } : { node: CommitType }) => node);

        result.repositories.push(repository);
      } catch(error) {
        return false;
      }
    });
  }

  return result;
};