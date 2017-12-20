import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import CategoryIcon from '../CategoriesIcons/index';

import './Blog.less';

const modeClass = fm => {
  if (fm === true) return "yesfull";
  return "nofull";
}

const Blog = ({showPending, showFlagged, showInProgress, fullMode}) => (
  <div className={`Blog ${modeClass(fullMode)}`}>
  
  <span className={`Blog__c-${(fullMode === false) ? 'blog' : "yes-full"}`}><CategoryIcon from="from-story" type={'blog'} className={(fullMode) ? "whitefont" : ""}/></span> BLOG POST &nbsp; 
      {showPending ? 
      <span className="markPullRight">
      <Icon className="markIcon" type="sync"/>
      </span>
      : null}
    {showFlagged ? 
      <span className="markPullRight">
      <Icon className="markIcon" type="exclamation-circle-o"/>
      </span>
      : null}
    {showInProgress ? 
      <span className="markPullRight">
      <Icon className="markIcon" type="safety"/>
      </span>
    : null}
  </div>
);

export default Blog;
