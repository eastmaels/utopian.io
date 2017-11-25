import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getIsAuthenticated, getAuthenticatedUser } from '../reducers';
import { getGithubRepo, setGithubRepo } from '../actions/project';

import { Icon } from 'antd';
import SubFeed from './SubFeed';
import LeftSidebar from '../app/Sidebar/LeftSidebar';
import RightSidebar from '../app/Sidebar/RightSidebar';
import TopicSelector from '../components/TopicSelector';
import Affix from '../components/Utils/Affix';
import ScrollToTop from '../components/Utils/ScrollToTop';
import ScrollToTopOnMount from '../components/Utils/ScrollToTopOnMount';

import * as R from 'ramda';

import './Project.less';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    repos: state.repos,
    repo: state.repo,
    user: getAuthenticatedUser(state),
  }),
  { getGithubRepo, setGithubRepo }
)
class Project extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
  };

  componentWillMount () {
    const { repos, repo, match, getGithubRepo, setGithubRepo, history, location } = this.props;
    const { repoId } = match.params;
    const id = parseInt(repoId);
    const projectInState = R.find(R.propEq('id', id))(repos);

    // @UTOPIAN supporting old version where type was not mandatory
    if (!match.params.type) {
      // removing last slash if present to avoid double slashes
      const locationPath = location.pathname.replace(/\/$/, '')
      history.push(`${locationPath}/all`);
      return;
    }

    if(!projectInState) {
      getGithubRepo(id);
      return;
    }

    if (projectInState && (repo && repo.id !== id)) {
      setGithubRepo(projectInState);
    }
  }

  componentWillReceiveProps (nextProps) {
    const { repos, repo, match, setGithubRepo } = this.props;
    const { repoId } = nextProps.match.params;
    const id = parseInt(repoId);
    const projectInState = R.find(R.propEq('id', id))(repos);

    if (projectInState && (repo && repo.id !== id)) {
      setGithubRepo(projectInState);
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { authenticated, match, location, repo, user } = this.props;
    const { repo: projectName } = match.params;
    const isOwner = R.find(R.propEq('id', repo.id))(user.repos || []);

    return (
      <div>
        <Helmet>
          <title>Utopian - {projectName} Open Source Contributions </title>
        </Helmet>
        <ScrollToTop />
        <ScrollToTopOnMount />
        <div className="shifted">
          <div className="feed-layout container">
            <Affix className="leftContainer" stickPosition={77}>
              <div className="left">
                <LeftSidebar />
              </div>
            </Affix>
            <Affix className="rightContainer" stickPosition={77}>
              <div className="right">
                <RightSidebar match={match}/>
              </div>
            </Affix>
            <div className="center">
              <div className="Project">
                <div className="Project__details">
                <h2><Icon type='github' /> { repo.full_name }</h2>
                <p>
                    <a href={ repo.html_url } target="_blank"> { repo.html_url } </a>
                  </p>
                  <hr />
                  {isOwner && <div>
                    <Link to={`/write-task/${repo.id}`}>
                      <Icon type="notification"/> Add task request
                    </Link>
                  </div>}
                </div>
              </div>
              <Route path={`/project/:author/:repo/:platform/:repoId/:type?`} component={SubFeed} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
