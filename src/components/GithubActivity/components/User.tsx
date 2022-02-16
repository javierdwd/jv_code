type Props = {
  user: {
    name: string,
    url: string,
  },
  username: string,
}

export default function User({ user, username } : Props) {
  return (
    <div className="c-git-activity__user c-git-user">
      <span className="c-git-user__name">{user.name}</span>

      <a
        href={user.url}
        className="c-git-user__url"
        rel="noopener noreferrer"
        target="_blank">
        <span className="c-git-user__login">{username}</span>
      </a>
    </div>
  );
}