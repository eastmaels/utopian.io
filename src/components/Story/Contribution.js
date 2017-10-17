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

const Contribution = ({type, full_name, platform, id }) => (
  <div className={`Contribution ${type}`}>
    <b>
      <Icon type={icon(type)} /> Contribution for</b>:
    <Link to={`/project/${full_name}/${platform}/${id}/all`}>
      {' '} <Icon type='github' /> {full_name}
    </Link>
  </div>
);

export default Contribution;
