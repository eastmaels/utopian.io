import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getIsAuthenticated } from '../reducers';
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

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    projects: state.projects,
    project: state.project,
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
    const { projects, project, match, getProject, setProject } = this.props;
    const { projectId } = match.params;
    const id = parseInt(projectId);
    const projectInState = R.find(R.propEq('id', id))(projects);

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
    const { authenticated, match, location, project } = this.props;
    const { project: projectName } = match.params;

    return (
      <div>
        <Helmet>
          <title>Utopian - {projectName} Contribution Reports </title>
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
                <h3>Contributions for { project.full_name }</h3>
                <p>
                  <Icon type='github' />
                    <a href={ project.html_url } target="_blank"> { project.html_url } </a>
                  </p>
              </div>
              <Route path={`/project/:author/:project/:platform/:projectId`} component={SubFeed} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
