import { useLayoutEffect } from "preact/hooks"

import Profile from "./components/Profile"
import Links from "./components/Links"
// import GitHubActivity from "./components/GithubActivity"

import { Analytics } from '@vercel/analytics/react';

export function App() {
  useLayoutEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    let pageWrapper = document.querySelector('.l-page-wrapper');

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        if(!pageWrapper) {
          return;
        }

        if(window.pageYOffset >= (window.innerHeight / 3)) {
          pageWrapper.classList.add('l-page-wrapper--darken-bg');
        } else {
          pageWrapper.classList.remove('l-page-wrapper--darken-bg');
        }
      }, 100);
    });

    return () => {
      if(scrollTimer) {
        clearTimeout(scrollTimer);
      }
    }
  }, []);

  return (
    <div class="l-page-wrapper">
      <main class="l-content">
        <Profile />

        <Links />

        {/* <GitHubActivity /> */}
      </main>

      <Analytics />
    </div>
  );
}