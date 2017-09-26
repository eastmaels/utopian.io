import React from 'react';
import { FormattedMessage } from 'react-intl';
import './SidebarBlock.less';

const GetBoost = () =>
  (<div className="SidebarBlock">
    <h3 className="SidebarBlock__title">
      <FormattedMessage id="tell_story" defaultMessage="Tell us your story!" />
    </h3>
    <p>
      <FormattedMessage id="tell_story_concept" defaultMessage='Tell us the story behind your contributions to the Open Source community and get rewarded for your hard work!' />
    </p>
  </div>);

export default GetBoost;
