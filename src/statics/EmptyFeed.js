import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './EmptyFeed.less';

const EmptyFeed = () =>
  (<div className="EmptyFeed">
    <h3>
      No contributions found. {' '}
      <Link to="/write">
        Write a Contributor Report
      </Link>
      .
    </h3>
  </div>);

export default EmptyFeed;
