import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './Blog.less';

const Blog = () => (
  <div className={`Blog`}>
    <b>
      <Icon type="paper-clip" /> Blog Post </b>
  </div>
);

export default Blog;
