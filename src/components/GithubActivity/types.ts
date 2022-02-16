export type ContainerState = {
  user: {
    name: string,
    url: string,
    repositories: RespositoryType[],
  } | null,
  username: string,
  error: boolean,
  ignoreRepositories: string[],
  useCache: boolean,
  cacheExpiration: number,
}

export type CommitType = {
  id: string,
  committedDate: string,
  message: string,
};

export type RespositoryType = {
  name: string,
  id: string,
  url: string,
  description: string,
  commits: CommitType[],
  commitsTotalCount: number,
  commitListUrl: string,
}

export type UserDataType = {
  name: string,
  url: string,
  repositories: RespositoryType[]
};