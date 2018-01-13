
import React from 'react';
import { Link } from 'react-router-dom';

import './EmptyFeed.less';


const Text = ({ type, text }) => {
  if (type === 'tasks') return (
    <div className="EmptyFeed">
      <h3>
        No task requests yet.
      </h3>
    </div>
  );

  if (type) {
    if (type.indexOf("task") > -1) return (
      <div className="EmptyFeed">
      <h3>
        No task requests yet.
      </h3>
    </div>
    );
  }

  if (type === 'blog') return (
    <div className="EmptyFeed">
      <h3>
        No blog posts found. {' '}
        <Link to="/write">
          Add Blog Post
        </Link>
        .
      </h3>
    </div>
  );
  
  if (type === 'project') return (
    <div className="EmptyFeed">
      <h3>
        No projects found.
      </h3>
    </div>
  );

  if (text) return (
    <div className="EmptyFeed">
      <h3>
        {text}.
      </h3>
    </div>
  );

  return (<div className="EmptyFeed">
    <h3>
      No contributions found. {' '}
      <Link to="/write">
        Add Contribution
      </Link>
      .
    </h3>
  </div>)
};

const EmptyFeed = ({ type, text }) =>
  (<Text type={type} text={text} />);

export default EmptyFeed;
