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
    'type': 'sub-project',
    'slug': 'SUB-PROJECT'
  },
  {
    'type': 'development',
    'slug': 'DEVELOPMENT'
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
    'slug': 'THINKERS'
  },
  {
    'type': 'task-development',
    'slug': 'DEVELOPERS'
  },
  {
    'type': 'task-bug-hunting',
    'slug':	'BUG HUNTERS'
  },
  {
    'type': 'task-documentation',
    'slug': 'TECH WRITERS'
  },
  {
    'type': 'task-translations',
    'slug': 'TRANSLATORS'
  },
  {
    'type': 'task-analysis',
    'slug':	'DATA ANALYSTS'
  },
  {
    'type': 'task-graphics',
    'slug': 'DESIGNERS'
  },
  {
    'type': 'task-social',
    'slug': 'INFLUENCERS'
  }
];

const categorySlug = type => {
  switch (type) {
    case 'ideas':
      return 'SUGGESTION';
    case 'sub-projects':
      return 'SUB-PROJECT';
    case 'development':
      return 'DEVELOPMENT';
    case 'bug-hunting':
      return 'BUG';
    case 'translations':
      return 'TRANSLATION';
    case 'analysis':
      return 'ANALYSIS';
    case 'graphics':
      return 'GRAPHICS';
    case 'social':
      return 'VISIBILITY';
    case 'documentation':
      return 'DOCUMENTATION';
    case 'tutorials':
      return 'TUTORIAL';
    case 'video-tutorials':
      return 'VIDEO TUTORIAL';
    case 'copywriting':
      return 'COPYWRITING';
    case 'blog':
      return 'BLOG POST';
    case 'task-ideas':
      return 'THINKERS';
    case 'task-development':
      return 'DEVELOPERS';
    case 'task-bug-hunting':
      return 'BUG HUNTERS';
    case 'task-documentation':
      return 'TECH WRITERS';
    case 'task-translations':
      return 'TRANSLATORS';
    case 'task-analysis':
      return 'DATA ANALYSTS';
    case 'task-graphics':
      return 'DESIGNERS';
    case 'task-social':
      return 'INFLUENCERS';
  }
};

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
          categorySlug(type)
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
