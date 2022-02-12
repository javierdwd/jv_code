import { useLayoutEffect, useState } from "react";
import GithubActivity from "jv_code_github_activity";

export default function GitHubActivity() {
  const [showWidget, setShowWidget] = useState(false);

  useLayoutEffect(() => {
    let io: IntersectionObserver | null = null;
    const widgetContainer = document.getElementById('github-activity-root') as HTMLElement;

    if (window.IntersectionObserver) {
      io = new IntersectionObserver(entries =>{
        let widget = Array.from(entries).find(x => x.target === widgetContainer);

        if(widget && widget.isIntersecting === true) {
          setShowWidget(true);

          if(io) {
            io.unobserve(widgetContainer);
            io.disconnect();
          }
        }
      });

      io.observe(widgetContainer);
    } else {
      setShowWidget(true);
    }

    return () => {
      if(io) {
        io.unobserve(widgetContainer);
        io.disconnect();
      }
    }
  }, []);

  return (
    <section class="l-section l-section--fullsize l-section--center l-section--column l-github-activity">
      <h1 class="l-section__title">Github latest' activity</h1>

      <div id="github-activity-root">
        {showWidget && (
          <GithubActivity login="javierdwd" />
        )}
      </div>
    </section>
  );
};