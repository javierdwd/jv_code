import Profile from "./components/Profile"
import Links from "./components/Links"

export function App() {
  return (
    <div class="l-page-wrapper">
      <main class="l-content">
        <Profile />

        <Links />

        {/* <module href="/github_activity.html"></module> */}
      </main>
    </div>
  );
}