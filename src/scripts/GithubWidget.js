import React from 'react';
import ReactDOM from 'react-dom';
import GithubActivity from 'jv_code_github_activity';

ReactDOM.render(
  React.createElement(GithubActivity, {
    login: 'javierdwd'
  }),
  document.getElementById('github-activity-root')
);