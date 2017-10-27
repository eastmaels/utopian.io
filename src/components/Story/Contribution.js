import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './Contribution.less';

const icon = type => {
  switch (type) {
    case 'announcement-ideas':
    case 'ideas':
      return 'bulb';
    case 'announcement-development':
    case 'development':
      return 'code';
    case 'announcement-bug-hunting':
    case 'bug-hunting':
      return 'eye-o';
    case 'announcement-documentation':
    case 'documentation':
      return 'book';
    case 'announcement-translations':
    case 'translations':
      return 'flag';
    case 'announcement-analysis':
    case 'analysis':
      return 'dot-chart';
    case 'announcement-graphics':
    case 'graphics':
      return 'layout';
    case 'announcement-social':
    case 'social':
      return 'share-alt';
  }
};

const categorySlug = type => {
  switch (type) {
    case 'ideas':
      return 'Idea for';
    case 'development':
      return 'Development of';
    case 'bug-hunting':
      return 'Bug in';
    case 'documentation':
      return 'Documentation for';
    case 'translations':
      return 'Translation for';
    case 'analysis':
      return 'Analysis for';
    case 'graphics':
      return 'Design for';
    case 'social':
      return 'Visibility for';
    case 'announcement-ideas':
      return 'Thinkers for';
    case 'announcement-development':
      return 'Developers for';
    case 'announcement-bug-hunting':
      return 'Bug Hunters for';
    case 'announcement-documentation':
      return 'Tech Writers for';
    case 'announcement-translations':
      return 'Translators for';
    case 'announcement-analysis':
      return 'Data Analyst for';
    case 'announcement-graphics':
      return 'Designer';
    case 'social':
      return 'Influencers for';
  }
};

const Contribution = ({type, repository, platform, id }) => (
  <div className={`Contribution ${type}`}>
    <b>
      <Icon type={icon(type)} /> {categorySlug(type)} </b>:
    <Link to={`/project/${repository.full_name}/${platform}/${id}/all`}>
      {' '} <Icon type='github' /> {repository.name}
    </Link>
    {type.indexOf('announcement') > -1 && <Icon type="notification" className="announcement"/> }
  </div>
);

export default Contribution;
