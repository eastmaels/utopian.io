import * as React from 'react';
import { Icon } from 'antd';

const CategoryIcon = ({type}) => {
  switch (type) {
    case 'sub-projects':
      return <Icon type="copy" />;
    case 'task-ideas':
    case 'ideas':
      return <Icon type="bulb" />;
    case 'task-development':
    case 'development':
      return <Icon type="code" />;
    case 'task-bug-hunting':
    case 'bug-hunting':
      return <Icon type="eye-o" />;
    case 'task-translations':
    case 'translations':
      return <Icon type="flag" />;
    case 'task-analysis':
    case 'analysis':
      return <Icon type="dot-chart" />;
    case 'task-graphics':
    case 'graphics':
      return <Icon type="layout" />;
    case 'task-social':
    case 'social':
      return <Icon type="share-alt" />;
    case 'task-documentation':
    case 'documentation':
      return <Icon type="book" />;
    case 'tutorials':
      return <Icon type="file-unknown" />;
    case 'video-tutorials':
      return <Icon type="video-camera" />;
    case 'copywriting':
      return <Icon type="edit" />;
  }
};

export default CategoryIcon;
