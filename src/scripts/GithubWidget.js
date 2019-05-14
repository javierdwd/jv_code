import React from 'react';
import ReactDOM from 'react-dom';
import GithubActivity from 'jv_code_github_activity';

let widgetContainer = document.getElementById('github-activity-root');

function initWidget(node) {
  ReactDOM.render(
    React.createElement(GithubActivity, {
      login: 'javierdwd'
    }),
    node
  );
};

if (window.IntersectionObserver) {
  const io = new IntersectionObserver(entries =>{
    let widget = Array.from(entries).find(x => x.target === widgetContainer);

    if(widget && widget.isIntersecting === true) {
      initWidget(widgetContainer);

      io.unobserve(widgetContainer);
      io.disconnect();
    }
  });

  io.observe(document.getElementById('github-activity-root'));
  io.observe(document.querySelector('.c-avatar'));
} else {
  initWidget(widgetContainer);
}

