import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getIsAuthenticated,
  getAuthenticatedUser,
  getFollowingList,
} from '../../reducers';

import SignUp from '../../components/Sidebar/SignUp';

import { Icon } from 'antd';
import GithubConnection from '../../components/Sidebar/GithubConnection';
import SideAnnouncement from '../../components/Sidebar/SideAnnouncement';
import ProjectSponsors from '../../components/Sidebar/ProjectSponsors';

import { getUser } from '../../actions/user';
import { getProjectsByGithub } from '../../actions/projects';
import { getProject } from '../../actions/project';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    user: getAuthenticatedUser(state),
    authenticatedUser: getAuthenticatedUser(state),
    followingList: getFollowingList(state),
  }),
  {
    getProjectsByGithub,
    getUser,
    getProject,
  })
export default class RightSidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
    followingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadedProjects: false,
    };
  }

  loadGithubData() {
    const {  user, getUser, getProjectsByGithub} = this.props;
    if (user && user.name) {
      getUser(user.name).then(res => {
        if (res.response && res.response.github) {
          getProjectsByGithub(user.name, true);
        }
      });
    }
  }

  componentDidMount () {
    this.loadGithubData();
  }

  componentDidUpdate () {
    const { user, getProjectsByGithub, getUser } = this.props;

    if (user && user.name && !this.state.loadedProjects) {

      this.setState({
        loadedProjects: true,
      });

      this.loadGithubData();
    }

  };

  render() {
    const { user, match } = this.props;

    console.log("MATCH", match)


    if (!this.props.authenticated) {
      return (
        <SignUp />
      )
    }

    return (
      <span>
        {!match || !match.params.repoId ? <SideAnnouncement user={user} /> : null}
        <GithubConnection user={user} />
        {match && match.params.repoId ? <ProjectSponsors
            externalId={parseInt(match.params.repoId)}
            platform={match.params.platform}
            owner={user}
          /> :
          null}
      </span>
    );
  }
}
