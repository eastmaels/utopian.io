import React from 'react';
import GithubBtn from '../../components/Button/Github';
import Avatar from '../Avatar';
import { FormattedRelative, } from 'react-intl';

import { Icon, Tooltip } from 'antd';
import * as ReactIcon from 'react-icons/lib/md';
import { Link } from 'react-router-dom';
import * as Actions from '../../../src/actions/constants'

import './GithubConnection.less';

const GithubRepos = ({ user, repositories }) => {
  const RequiredScopeVersion = Actions.REQUIRED_SCOPE_VERSION; // REQUIRED GITHUB SCOPE VERSION 

  if (user && user.github && user.github.scopeVersion) {

  } else if (user && user.github) {
    user.github.scopeVersion = 1;
  }

  const iconFor = (repo) => {
    if (repo.owner.login !== user.github.account) {
      return ("solution");
    }
    if (repo.fork) {
      return ("fork");
    }
    return ("github");
  }

  const lastSynced = () => {
    if (!user || !user.github || !user.github.lastSynced) return 'Never';
    if ((user.github.lastSynced) == null) return 'Never';
    return <FormattedRelative value={user.github.lastSynced}/>;
  }

  // console.log("user (GithubConnection:37): ", [user, user.github || false]);

  var repos = (user.repos) || ([]);
  if (repositories && repositories.length) repos = repositories;
  // console.log("repositories: ", repos);

  return (
    <div className="GithubRepos">
      <div className="GithubRepos__container">
        <h4 className="GithubRepos__title"><Icon type="github"/> Github Connection</h4>
        {user && user.github && user.github.account && (user.github.scopeVersion >= RequiredScopeVersion) ? <div className="GithubRepos__githubinfo">
            {user.github.avatar_url && <Avatar username={user.github.avatar_url} size={45} />}
            <span><a target="_blank" href={`https://github.com/${user.github.account}`}>{user.github.account}</a></span>
          </div> : <div>
            <ul className="GithubRepos__bulleted">
              <li className="GithubRepos__bulletedLi"><span>Seamlessly sync your projects and contributions with the Github feed</span></li>
              <li className="GithubRepos__bulletedLi"><span>Create task requests for your repositories</span></li>
            </ul>
          </div>}
        <div className="GithubRepos__divider"></div>
        {(user && user.github && (user.github.scopeVersion >= RequiredScopeVersion) && (repos) && (repos).length) ? <div className="GithubRepos__repos">
        {(user && user.github && (user.github.scopeVersion >= RequiredScopeVersion) && (repos) && (repos).length) ? <div>
            <ul style={{listStyleType: "none"}}>
              {(repos).map(repo => (
                <li key={repo.id}>
                  <Link className="GithubRepos__projectname" to={`/project/${repo.full_name}/github/${repo.id}/all`}>
                    <Icon type={iconFor(repo)}/>  {(repo.owner.login === user.github.account) ? repo.name : <span><span className="GithubRepos__owner">{repo.owner.login}</span><span className="GithubRepos__slash">/</span>{repo.name}</span>}
                  </Link>
                  <span className="task">
                    <small>
                      <Link to={`/write-task/${repo.id}`}>
                        <Icon type="notification"/>
                      </Link>
                    </small>
                  </span>
                </li>
              ))}
            </ul>
          </div> : null
        }</div> : null}
        {(user && user.github && (!(repos) || !(repos).length)) && <span id="GithubRepos__norepos">
          <span>Looking for repositories.. <Icon type="loading" /></span>
        </span>}
        <GithubBtn 
        tooltipTitle={<span><b>Last Synced:</b> {lastSynced()}</span>}
        />
      </div>
    </div>
  )
}

export default GithubRepos;
