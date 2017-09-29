import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const EmptyFeed = () =>
  (<div className="text-center">
    <h3>
      No Contribution Reports for this project yet. <b>Be the first!</b>{' '}
      <Link to="/write">
        Write a Contributor Report
      </Link>
      .
    </h3>
  </div>);

export default EmptyFeed;
