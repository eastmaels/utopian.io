import * as React from 'react';
import { Icon } from 'antd';

const CategoryIcon = ({type}) => {
  switch (type) {
    case 'ideas':
      return <Icon type="bulb" />;
    case 'development':
      return <Icon type="code" />;
    case 'bug-hunting':
      return <Icon type="eye-o" />;
    case 'documentation':
      return <Icon type="book" />;
    case 'translations':
      return <Icon type="flag" />;
    case 'analysis':
      return <Icon type="dot-chart" />;
    case 'graphics':
      return <Icon type="layout" />;
    case 'social':
      return <Icon type="share-alt" />;
  }
};

export default CategoryIcon;
