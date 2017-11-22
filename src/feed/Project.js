import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getIsAuthenticated, getAuthenticatedUser } from '../reducers';
import { getProject, setProject } from '../actions/project';

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
    projects: state.projects,
    project: state.project,
    user: getAuthenticatedUser(state),
  }),
  { getProject, setProject }
)
class Project extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
  };

  componentWillMount () {
    const { projects, project, match, getProject, setProject, history, location } = this.props;
    const { projectId } = match.params;
    const id = parseInt(projectId);
    const projectInState = R.find(R.propEq('id', id))(projects);

    // @UTOPIAN supporting old version where type was not mandatory
    if (!match.params.type) {
      // removing last slash if present to avoid double slashes
      const locationPath = location.pathname.replace(/\/$/, '')
      history.push(`${locationPath}/all`);
      return;
    }

    if(!projectInState) {
      getProject(id);
      return;
    }

    if (projectInState && (project && project.id !== id)) {
      setProject(projectInState);
    }
  }

  componentWillReceiveProps (nextProps) {
    const { projects, project, match, setProject } = this.props;
    const { projectId } = nextProps.match.params;
    const id = parseInt(projectId);
    const projectInState = R.find(R.propEq('id', id))(projects);

    if (projectInState && (project && project.id !== id)) {
      setProject(projectInState);
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { authenticated, match, location, project, user } = this.props;
    const { project: projectName } = match.params;
    const isOwner = R.find(R.propEq('id', project.id))(user.projects || []);

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
                <RightSidebar />
              </div>
            </Affix>
            <div className="center">
              <div className="Project">
                <div className="Project__details">
                <h2><Icon type='github' /> { project.full_name }</h2>
                <p>
                    <a href={ project.html_url } target="_blank"> { project.html_url } </a>
                  </p>
                  <hr />
                  {isOwner && <div>
                    <Link to={`/write-task/${project.id}`}>
                      <Icon type="notification"/> Add task request
                    </Link>
                  </div>}
                </div>
              </div>
              <Route path={`/project/:author/:project/:platform/:projectId/:type?`} component={SubFeed} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
