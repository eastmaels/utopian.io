import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

import {
  getIsAuthenticated,
  getAuthenticatedUser,
  getFollowingList,
  // getUser,
} from '../../reducers';

import SignUp from '../../components/Sidebar/SignUp';

import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import GithubConnection from '../../components/Sidebar/GithubConnection';
import SideAnnouncement from '../../components/Sidebar/SideAnnouncement';
import ProjectSponsors from '../../components/Sidebar/ProjectSponsors';
import ActivateSponsorship from '../../components/Sidebar/ActivateSponsorship';

import { getUser } from '../../actions/user';
import { getReposByGithub} from '../../actions/projects';
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
  }), { getUser, getReposByGithub })
export default class RightSidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
    followingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticatedUser: {},
    };
  }

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
  fixUser() {
    // console.log("AUTHUSER (RS.js:125):", [ this.props.authenticatedUser, this.props.authenticatedUser.github || false], "USER (RS:125):", [ this.props.user, this.props.user.github || false ]);
    const { getUser, getReposByGithub, authenticatedUser, user } = this.props;
    getUser((authenticatedUser.name || user.name))
      .then((res) => {
        if (!res || !res.response) return;
        const realUser = res.response;
        // console.log("REALUSER (RS:131): ", [realUser, realUser.github || false]);
        if (!realUser.github) return;
        if (authenticatedUser && authenticatedUser.repos && authenticatedUser.repos.length && (authenticatedUser.repos.length >= 1)) {
          // console.log("auth repos exist", authenticatedUser.repos);
          this.setState({user: {
            ...user,
            github: realUser.github,
          }});
          this.setState({authenticatedUser: {
            ...authenticatedUser,
            github: realUser.github,
          }});
          return;
        } else {
          getReposByGithub((authenticatedUser.name || user.name), true).then(res => {
            // console.log("Repos (RS):", res.response);
            this.setState({user: {
              ...realUser,
              github: realUser.github,
              repos: res.response,
            }});
            this.setState({authenticatedUser: {
              ...authenticatedUser,
              github: realUser.github,
              repos: res.response,
            }});
            this.setState({repositories: res.response});
          });
        }
      });
  }

  componentWillMount() {
    this.setState({authenticatedUser: this.props.authenticatedUser});
    this.setState({user: this.props.user});
    this.fixUser();
  }

  render() {
    const { user, project, isOwner, repo, createProjectAccount, createProjectSponsor, match } = this.props;
    //const project = this.state.project;

    if (!this.props.authenticated) {
      return (
        <SignUp />
      )
    }

    var gitUser = (this.props.authenticatedUser || user);
    if (this.state && this.state.user && this.state.user.github) gitUser = this.state.user;
    if (this.state && this.state.authenticatedUser && this.state.authenticatedUser.github) gitUser = this.state.authenticatedUser;

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
        <GithubConnection user={gitUser} repositories={this.state.repositories || []}/>
      </span>
    );
  }
}
