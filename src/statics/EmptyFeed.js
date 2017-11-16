import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './EmptyFeed.less';


const Text = ({ type }) => {
  if (type === 'tasks') return (
    <div className="EmptyFeed">
      <h3>
        No tasks requests yet
      </h3>
    </div>
  );

  if (type === 'blog') return (
    <div className="EmptyFeed">
      <h3>
        No blog posts found. {' '}
        <Link to="/write-blog">
          Add Blog Post
        </Link>
        .
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
}

const EmptyFeed = ({ type }) =>
  (<Text type={type} />);

export default EmptyFeed;
