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

  return (
    <div className="GithubRepos">
      <div className="GithubRepos__container">
        <h4 className="GithubRepos__title"><Icon type="github"/> Github Connection</h4>
        {user && user.github && user.github.account && (user.github.scopeVersion >= RequiredScopeVersion) ? <div className="GithubRepos__githubinfo">
            {user.github.avatar_url && <Avatar username={user.github.avatar_url} size={45} />}
            <span><a target="_blank" href={`https://github.com/${user.github.account}`}>{user.github.account}</a></span>
          </div> : <div>
            <b><br/> Get the best out of Utopian! Connect to Github now to seamlessly sync your projects and contributions with the Github feed.</b>
          </div>}
        <div className="GithubRepos__divider"></div>
        { user && user.github && (user.github.scopeVersion >= RequiredScopeVersion) && user.projects && user.projects.length ? <div>
            <ul>
              {user.projects.map(project => (
                <li key={project.id}>
                  <Link className="GithubRepos__projectname" to={`/project/${project.full_name}/github/${project.id}/all`}>
              {(project.fork === false) ? <Icon type="github"/> : <Icon type="fork"/>}  {(project.owner.login === user.name) ? project.name : <span><span className="GithubRepos__owner">{project.owner.login}</span><span className="GithubRepos__slash">/</span>{project.name}</span>}
                  </Link>
                  <span className="task">
                    <small>
                      <Link to={`/write-task/${project.id}`}>
                        <Icon type="notification"/>
                      </Link>
                    </small>
                  </span>
                </li>
              ))}
              {((user.orgProjects) && (user.orgProjects.length >= 1)) ?
              <span><br/><h5 className="GithubRepos__subtitle">Organization Projects</h5><br/></span>
              : null
              }

              {(user.orgProjects && user.orgProjects.length) ? user.orgProjects.map(project => (
                <li key={project.id}>
                  <Link className="GithubRepos__projectname" to={`/project/${project.full_name}/github/${project.id}/all`}>
                  <Icon type="solution"/> {(project.owner.login === user.name) ? project.name : <span><span className="GithubRepos__owner">{project.owner.login}</span><span className="GithubRepos__slash">/</span>{project.name}</span>}
                  </Link>
                  <span className="task">
                    <small>
                      <Link to={`/write-task/${project.id}`}>
                        <Icon type="notification"/>
                      </Link>
                    </small>
                  </span>
                </li>
              ))
            
            : null}
            </ul>
          </div> : null
        }
        <GithubBtn />
      </div>
    </div>
  )
}

export default GithubRepos;
