import { CommitType } from "../types";

import Commit from './Commit';

type Props = {
  name: string,
  id: string,
  url: string,
  description: string,
  commits: CommitType[],
  commitListUrl: string,
}

export default function Repository(props: Props) {
  const {
    name,
    url,
    description,
    commits,
    commitListUrl,
  } = props;

  return (
    <article className="c-git-activity__repository c-git-repository">
      <h1 className="c-git-repository__name">
        <a
          href={url}
          className="c-git-repository__link"
          rel="noopener noreferrer"
          target="_blank">
          {name}
        </a>
      </h1>
      <p className={"c-git-repository__description"}>
        {description}
      </p>

      {(commits && commits.length) ? (
        <div className="c-git-activity__commits">
          {
            commits.map(commit => <Commit key={commit.id} {...commit} />)
          }
          <a
            href={commitListUrl}
            className="c-git-repository__commits-all"
            rel="noopener noreferrer"
            target="_blank">
            View all
          </a>
        </div>
      ) : null}

    </article>
  );
};