import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './Contribution.less';

const icon = type => {
  switch (type) {
    case 'ideas':
      return 'bulb';
    case 'development':
      return 'code';
    case 'bug-hunting':
      return 'eye-o';
    case 'documentation':
      return 'book';
    case 'translations':
      return 'flag';
    case 'analysis':
      return 'dot-chart';
    case 'graphics':
      return 'layout';
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
  }
};

const Contribution = ({type, repository, platform, id }) => (
  <div className={`Contribution ${type}`}>
    <b>
      <Icon type={icon(type)} /> {categorySlug(type)} </b>:
    <Link to={`/project/${repository.full_name}/${platform}/${id}/all`}>
      {' '} <Icon type='github' /> {repository.name}
    </Link>
  </div>
);

export default Contribution;
