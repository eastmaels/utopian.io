import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import CategoryIcon from '../CategoriesIcons';

import InlineCategoryEdit from '../Story/InlineCategoryEdit';
import InlineRepoEdit from '../Story/InlineRepoEdit';

import './Contribution.less';

const types = [
  {
    'type': 'ideas',
    'slug': 'SUGGESTION'
  },
  {
    'type': 'development',
    'slug': 'DEVELOPMENT'
  },
  {
    'type': 'graphics',
    'slug': 'GRAPHICS'
  },
  {
    'type': 'bug-hunting',
    'slug':	'BUG'
  },
  {
    'type': 'translations',
    'slug': 'TRANSLATION'
  },
  {
    'type': 'analysis',
    'slug': 'ANALYSIS'
  },
  {
    'type': 'social',
    'slug': 'VISIBILITY'
  },
  {
    'type': 'documentation',
    'slug':	'DOCUMENTATION'
  },
  {
    'type': 'tutorials',
    'slug': 'TUTORIAL'
  },
  {
    'type': 'video-tutorials',
    'slug': 'VIDEO TUTORIAL'
  },
  {
    'type': 'copywriting',
    'slug': 'COPYWRITING'
  },
  {
    'type': 'blog',
    'slug': 'BLOG POST'
  },
  {
    'type': 'task-ideas',
    'slug': 'TASK/THINKERS'
  },
  {
    'type': 'task-development',
    'slug': 'TASK/DEVELOPERS'
  },
  {
    'type': 'task-bug-hunting',
    'slug':	'TASK/BUG HUNTERS'
  },
  {
    'type': 'task-documentation',
    'slug': 'TASK/TECH WRITERS'
  },
  {
    'type': 'task-translations',
    'slug': 'TASK/TRANSLATORS'
  },
  {
    'type': 'task-analysis',
    'slug':	'TASK/DATA ANALYSTS'
  },
  {
    'type': 'task-graphics',
    'slug': 'TASK/DESIGNERS'
  },
  {
    'type': 'task-social',
    'slug': 'TASK/INFLUENCERS'
  }
];

function getCategorySlug(type)
{
  let slugType = types.find( slugType => {
    if(slugType.type == type)
      return true;
    return false;
  });
  return slugType ? slugType.slug : "";
}

const parsedRepoName = (author, name) => {
  if ((author.length + name.length) < 35) {
    return `${author}/${name}`;
  }
  if (author.length > 15) {
    author = author.substr(0, 15) + "...";
  }
  if (name.length > 23) {
    name = name.substr(0, 23) + "...";
  }
  return `${author}/${name}`;
}

const modeClass = fm => {
  if (fm === true) return "yesfull";
  return "nofull";
}

const Contribution = ({
    type,
    repository,
    platform,
    id,
    showVerified,
    showPending,
    showFlagged,
    showInProgress,
    fullMode,
    post,
    user,
    isModerator,
    moderatorAction,
  }) => (
  <div className={`Contribution ${type} ${modeClass(fullMode)}`}>
    <span>

      <span className={`Contribution__c-${(fullMode === false) ? type : "yes-full"}`}>
        <CategoryIcon from="from-story" type={type}/>
        { isModerator ?
          <InlineCategoryEdit
            value={type}
            types={types}
            post={post}
            moderatorAction={moderatorAction}
            user={user}
          /> :
          getCategorySlug(type)
        }
      </span>


      {repository && platform && id ? <span>
        {' '} <b>&middot;</b> {'  '} <a href={`https://github.com/${repository.full_name}`}><Icon type='github' /></a>
        { isModerator ?
          <InlineRepoEdit
              value={parsedRepoName(repository.owner.login, repository.name)}
              post={post}
              moderatorAction={moderatorAction}
              user={user}
          /> :
          <Link to={`/project/${repository.full_name}/${platform}/${id}/all`}>{parsedRepoName(repository.owner.login, repository.name)}</Link>
        }
      </span> : null}
    </span>

    {showPending ?
      <span className="markPullRight">
      <Icon type="sync" className={`${showPending || showFlagged || showInProgress ? 'withStatus' : '' }`}/>
        {type.indexOf('task') > -1 && <span>&nbsp;&nbsp;<b><Icon type="notification" className=""/></b></span> }
      </span>
      : null}
    {showFlagged ?
      <span className="markPullRight">
      <Icon type="markIcon" className={`${showPending || showFlagged || showInProgress ? 'withStatus' : '' }`}/>
        {type.indexOf('task') > -1 && <span>&nbsp;&nbsp;<b><Icon type="notification" className=""/></b></span> }
      </span>
      : null}
    {showInProgress ?
      <span className="markPullRight">
      <Icon type="safety" className={`${showPending || showFlagged || showInProgress ? 'withStatus' : '' }`}/>
        {type.indexOf('task') > -1 && <span>&nbsp;&nbsp;<b><Icon type="notification" className=""/></b></span> }
      </span>
      : null}
    {(!showPending && !showFlagged && !showInProgress && (type.indexOf('task') > -1)) && <span className="markPullRight"><b><Icon type="notification" className=""/></b></span> }
  </div>
);

export default Contribution;
