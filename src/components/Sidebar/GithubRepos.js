import React from 'react';
import GithubBtn from '../../components/Button/Github';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import './GithubRepos.less';

//project/PlenipotentSS/SSStackedPageView/github/17587590/all

const GithubRepos = ({ repos }) => {
  return (
    <div className="GithubRepos">
      <div className="GithubRepos__container">
        <h4 className="GithubRepos__title"><Icon type="github"/> Your Projects</h4>
        <div className="GithubRepos__divider"></div>
        {repos.length ? <div>
            <ul>
              {repos.map(project => (
                <li key={project.id}>
                  <Link to={`/project/${project.full_name}/github/${project.id}/all`}>
                    <Icon type="github"/> {project.full_name}
                  </Link>
                  <p className="announcement">
                    <small>
                      <Link to={`/write-announcement/${project.id}`}>
                        <Icon type="notification"/> Add announcement
                      </Link>
                    </small>
                  </p>
                </li>
              ))}
            </ul>
          </div> :
          <div>No repositories found</div>
        }
        <GithubBtn />
      </div>
    </div>
  )
}

export default GithubRepos;
