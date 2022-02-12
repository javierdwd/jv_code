import Profile from "./components/Profile"
import Links from "./components/Links"
import GitHubActivity from "./components/GitHubActivity"

export function App() {
  return (
    <div class="l-page-wrapper">
      <main class="l-content">
        <Profile />

        <Links />

        <GitHubActivity />
      </main>
    </div>
  );
}