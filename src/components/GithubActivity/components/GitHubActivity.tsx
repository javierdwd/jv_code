import { useMemo } from "preact/hooks";

import { RespositoryType } from "../types";

import User from "./User";
import Repository from "./Repository";
import useContainer from "../useContainer";

export default function GitHubActivity() {
  const {
    error,
    user,
    username,
  } = useContainer();

  const repositories: RespositoryType[] = useMemo(() => {
    return user?.repositories.slice(0, 2) || [];
  }, [user]);

  return (
    <div className="c-git-activity">
      {error && <div class="c-git-activity__error-msg">Unexpected error. Data could not be loaded.</div>}

      {!error && user && (
        <User user={user} username={username} />
      )}

      {repositories.length ? (
        <section className="c-git-activity__repositories">
          {
            repositories.map(repository => <Repository key={repository.id} {...repository} />)
          }
        </section>
      ) : <div className="c-git-activity__loading">Loading...</div> }
    </div>
  )
};