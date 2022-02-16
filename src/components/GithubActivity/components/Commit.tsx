import { CommitType } from "../types"

export default function Commit(props: CommitType) {
  const { message } = props;

  return (
    <div className="c-git-commit">
      <div className="c-git-commit__message" title={message}>
        {message}
      </div>
    </div>
  );
};