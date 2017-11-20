import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import CategoryIcon from '../CategoriesIcons';

import './Contribution.less';

const categorySlug = type => {
  switch (type) {
    case 'ideas':
      return 'Suggestion for';
    case 'sub-projects':
      return 'Project for';
    case 'development':
      return 'Development of';
    case 'bug-hunting':
      return 'Bug in';
    case 'translations':
      return 'Translation for';
    case 'analysis':
      return 'Analysis for';
    case 'graphics':
      return 'Design for';
    case 'social':
      return 'Visibility for';
    case 'documentation':
      return 'Documentation for';
    case 'tutorials':
      return 'Tutorial for';
    case 'video-tutorials':
      return 'Video Tutorial for';
    case 'copywriting':
      return 'Copywriting for';
    case 'task-ideas':
      return 'Thinkers for';
    case 'task-development':
      return 'Developers for';
    case 'task-bug-hunting':
      return 'Bug Hunters for';
    case 'task-documentation':
      return 'Tech Writers for';
    case 'task-translations':
      return 'Translators for';
    case 'task-analysis':
      return 'Data Analyst for';
    case 'task-graphics':
      return 'Designer';
    case 'task-social':
    case 'social':
      return 'Influencers for';
  }
};

const Contribution = ({type, repository, platform, id }) => (
  <div className={`Contribution ${type}`}>
    <b>
      <CategoryIcon type={type} /> {categorySlug(type)} </b>&nbsp;
    <Link to={`/project/${repository.full_name}/${platform}/${id}/all`}>
      {' '} <Link to={"https://github.com/" + repository.full_name}><Icon type='github' /></Link> {repository.full_name}
    </Link>
    {type.indexOf('task') > -1 && <Icon type="notification" className="task"/> }
  </div>
);

export default Contribution;
