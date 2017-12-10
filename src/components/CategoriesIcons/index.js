import * as React from 'react';
import { Icon } from 'antd';
import "../../styles/custom.less";
import "../../styles/fonts.less";

const CategoryIcon = ({type}) => {
  switch (type) {
    case 'sub-projects':
      return <Icon style={{}} type="copy" />;
    case 'blog':
      return <Icon style={{}} type="paper-clip" />;
    case 'task-ideas':
    case 'ideas':
      return <Icon style={{}} type="bulb" />;
    case 'task-development':
    case 'development':
      return <Icon style={{}} type="code" />;
    case 'task-bug-hunting':
    case 'bug-hunting':
      return <Icon style={{}} type="eye-o" />;
    case 'task-translations':
    case 'translations':
      return <Icon style={{}} type="flag" />;
    case 'task-analysis':
    case 'analysis':
      return <Icon style={{}} type="dot-chart" />;
    case 'task-graphics':
    case 'graphics':
      return <Icon style={{}} type="layout" />;
    case 'task-social':
    case 'social':
      return <Icon style={{}} type="share-alt" />;
    case 'task-documentation':
    case 'documentation':
      return <Icon style={{}} type="book" />;
    case 'tutorials':
      return <Icon style={{}} type="file-unknown" />;
    case 'video-tutorials':
      return <Icon style={{}} type="video-camera" />;
    case 'copywriting':
      return <Icon style={{}} type="edit" />;
  }
};

export default CategoryIcon;
