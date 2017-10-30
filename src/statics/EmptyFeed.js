import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './EmptyFeed.less';


const Text = ({text}) => {
  if (text) return (
    <div className="EmptyFeed">
      <h3>
        {text}
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

const EmptyFeed = ({ text }) =>
  (<Text text={text} />);

export default EmptyFeed;
