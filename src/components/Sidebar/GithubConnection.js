import React from 'react';
import GithubBtn from '../../components/Button/Github';
import Avatar from '../Avatar';

import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as Actions from '../../../src/actions/constants'

import './GithubConnection.less';

const GithubRepos = ({ user }) => {
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

  return (
    <div className="GithubRepos">
      <div className="GithubRepos__container">
        <h4 className="GithubRepos__title"><Icon type="github"/> Github Connection</h4>
        {user && user.github && user.github.account && (user.github.scopeVersion >= RequiredScopeVersion) ? <div className="GithubRepos__githubinfo">
            {user.github.avatar_url && <Avatar username={user.github.avatar_url} size={45} />}
            <span><a target="_blank" href={`https://github.com/${user.github.account}`}>{user.github.account}</a></span>
          </div> : <div>
            <br/> <b>Get the best out of Utopian!</b> Connecting to Github lets you:
            <ul className="GithubRepos__bulleted">
              <li className="GithubRepos__bulletedLi"><span>Seamlessly sync your projects and contributions with the Github feed</span></li>
              <li className="GithubRepos__bulletedLi"><span>Create task requests for your repositories</span></li>
            </ul>
            Click the button below to connect.
          </div>}
        <div className="GithubRepos__divider"></div>
        <div className="GithubRepos__repos">
        {user && user.github && (user.github.scopeVersion >= RequiredScopeVersion) && user.repos && user.repos.length ? <div>
            <ul style={{listStyleType: "none"}}>
              {user.repos.map(repo => (
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
        }
        </div>
        <GithubBtn />
      </div>
    </div>
  )
}

export default GithubRepos;
