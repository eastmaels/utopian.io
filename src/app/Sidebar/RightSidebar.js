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
import ActivateSponsorship from '../../components/Sidebar/ActivateSponsorship';

//import { getUser } from '../../actions/user';
//import { getReposByGithub } from '../../actions/projects';
//import { getProject, createProjectAccount, createProjectSponsor } from '../../actions/project';

import * as R from 'ramda';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    user: getAuthenticatedUser(state),
    authenticatedUser: getAuthenticatedUser(state),
    followingList: getFollowingList(state),
    repo: state.repo,
  }), {})
export default class RightSidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
    followingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  /*
  constructor(props) {
    super(props);
    this.state = {
      loadedProjects: false,
      isOwner: false,
      project: null,
    };
  }

  loadSponsorship() {
    const { getProject, match } = this.props;
    const repoId = parseInt(match.params.repoId);
    getProject(match.params.platform, repoId).then(res => {
      if (res.status !== 404 && res.response.name) {
        this.setState({
          project: res.response,
        });
      } else {
        this.setState({
          project: null,
        });
      }
    })
  }

  loadGithubData() {
    const {  user, getUser, getReposByGithub, repo, match} = this.props;
    if (user && user.name) {
      this.setState({
        loadedProjects: true,
      });

      getUser(user.name).then(res => {
        if (res.response && res.response.github) {
          getReposByGithub(user.name, true).then(repos => {
            if(match.params.repoId && repo.fork !== true) {
              const repoId = parseInt(match.params.repoId);
              const isOwner = R.find(R.propEq('id', repoId))(repos.response);
              this.setState({
                isOwner: isOwner || false,
              });
              this.loadSponsorship();
            }
          });
        } else {
          if(match.params.repoId && repo.fork !== true) {
            this.loadSponsorship();
          }
        }
      });
    }
  }

  componentDidMount () {
    this.loadGithubData();
  }

  componentDidUpdate () {
    const { user } = this.props;

    if (user && user.name && !this.state.loadedProjects) {
      this.loadGithubData();
    }

  }

  componentWillReceiveProps (nextProps) {
    const { match } = this.props;

    if (match.params.repoId && nextProps.match.params.repoId && match.params.repoId !== nextProps.match.params.repoId) {
      this.loadGithubData();
    }
  }
*/
  render() {
    const { user, project, isOwner, repo, createProjectAccount, createProjectSponsor, match } = this.props;
    //const project = this.state.project;

    if (!this.props.authenticated) {
      return (
        <SignUp />
      )
    }

    return (
      <span>
        {!match || (match && !match.params.repoId) ? <SideAnnouncement user={user} /> : null}
        {
          match &&
          match.params.repoId &&
          repo.fork !== true &&
          (project && project.sponsorship.enabled === true) ?
            <ProjectSponsors
              user={user}
              project={project}
              isOwner={isOwner}
              createProjectSponsor={createProjectSponsor}
            /> :
            null
        }
        {
          match &&
          match.params.repoId &&
          (!project || (project && project.sponsorship.enabled === false)) &&
          repo.fork !== true &&
          isOwner ?
            <ActivateSponsorship
              user={user}
              project={project}
              externalId={parseInt(match.params.repoId)}
              platform={match.params.platform}
              createProjectAccount={createProjectAccount}
            /> : null
        }
        <GithubConnection user={user} />
      </span>
    );
  }
}
