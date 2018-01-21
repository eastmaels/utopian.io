import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getIsAuthenticated, getAuthenticatedUser } from '../reducers';
import { getUser } from '../actions/user';
import { getGithubRepo, setGithubRepo } from '../actions/project';
import { getReposByGithub } from '../actions/projects';
import { getProject, createProjectAccount, createProjectSponsor } from '../actions/project';

import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import SubFeed from './SubFeed';
import LeftSidebar from '../app/Sidebar/LeftSidebar';
import RightSidebar from '../app/Sidebar/RightSidebar';
import StoryPreview from '../components/Story/StoryPreview';
import TopicSelector from '../components/TopicSelector';
import Affix from '../components/Utils/Affix';
import ScrollToTop from '../components/Utils/ScrollToTop';
import ScrollToTopOnMount from '../components/Utils/ScrollToTopOnMount';
import BodyShort from '../components/Story/BodyShort';

import * as R from 'ramda';

import './Project.less';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    repos: state.repos,
    repo: state.repo,
    user: getAuthenticatedUser(state),
  }),
  { getGithubRepo,
    setGithubRepo,
    getProject,
    createProjectAccount,
    createProjectSponsor,
    getReposByGithub,
    getUser,
  }
)
class Project extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadedRepo: false,
      loadedProject: false,
      loadingProject: false,
      isOwner: false,
      project: null,
    };
  }

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
      getGithubRepo(id).then(() => {
        this.setState({loadedRepo: true});
      });
      return;
    }

    if (projectInState && (repo && repo.id !== id)) {
      setGithubRepo(projectInState);
    }
  }
  /*
   componentDidMount() {
   this.loadGithubData();
   }

   componentDidUpdate() {
   const { user } = this.props;

   if (user && user.name && !this.state.loadedProjects) {
   this.loadGithubData();
   }
   }
   */

  componentWillReceiveProps (nextProps) {
    const { user, repos, repo, match, getGithubRepo, setGithubRepo } = this.props;
    const { repoId } = nextProps.match.params;
    const id = parseInt(repoId);
    const projectInState = R.find(R.propEq('id', id))(repos);

    if (match.params.repoId !== nextProps.match.params.repoId) {
      this.setState({loadedProject: false, loadedRepo: false});
      // console.log("[c] repo loading")
      getGithubRepo(nextProps.match.params.repoId).then(() => {
        // console.log("[c] Repo loaded");
        this.setState({loadedRepo: true});
      });
    }
    /*
     if (projectInState && (repo && repo.id !== id)) {
     setGithubRepo(projectInState);
     }


     if (user && user.name && match.params.repoId && nextProps.match.params.repoId && match.params.repoId !== nextProps.match.params.repoId) {
     this.setState({loadingProject: true});
     this.loadGithubData();
     }
     */
  }

  componentDidUpdate () {
    const { user } = this.props;

    if (user && user.name && this.state.loadedRepo && !this.state.loadedProject && !this.state.loadingProject) {
      this.setState({loadingProject: true});
      this.loadGithubData();
    }
  }

  loadSponsorship(isOwner) {
    const { getProject, match } = this.props;
    const repoId = parseInt(match.params.repoId);
    getProject(match.params.platform, repoId).then(res => {
      let project = null;
      if (res.status !== 404 && res.response && res.response.name) {
        project = res.response;
      }
      // console.log("[c] got project", res);
      this.setState({
        project,
        isOwner: isOwner ? true : false,
        loadedProject: true,
        loadingProject: false,
      });
    })
  }

  loadGithubData() {
    const { user, repo, match} = this.props;
    const repoId = parseInt(match.params.repoId);
    const isOwner = R.find(R.propEq('id', repoId))(user.repos || []);
    if(repo.fork !== true) {
      this.loadSponsorship(isOwner);
    } else {
      this.setState({
        isOwner: isOwner ? true : false,
        loadedProject: true,
        loadingProject: false,
      });
    }
  }

  render() {
    const { authenticated, match, createProjectSponsor, createProjectAccount, location, history, repo, user } = this.props;
    const { repo: projectName } = match.params;
    if (!this.state.loadedProject) this.loadGithubData();
    // if (!this.state.loadedRepo) console.log("[c]", this.state.loadedProject);
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
                <RightSidebar
                  createProjectSponsor={createProjectSponsor}
                  createProjectAccount={createProjectAccount}
                  match={match}
                  isOwner={this.state.isOwner}
                  project={this.state.project}
                />
              </div>
            </Affix>
            <div className="center">
              <div className="Project">
                <div className="Project__details">
                  <h2><Icon type='github' /> { repo.full_name }</h2>
                  <p>
                    <a href={ repo.html_url } target="_blank"> { repo.html_url } </a>
                  </p><br/>
                  {repo.description && <span>
                    <BodyShort body={repo.description || ''} />
                  </span>
                  }
                  {repo.homepage && <span>
                    <b>Project Website: </b> <code className="Github__c">{repo.homepage}</code>
                  <br/></span>}
                  <hr />
                  {this.state.isOwner && <div>
                    <Link to={`/write-task/${repo.id}`}>
                      <Icon type="notification"/> Add task request
                    </Link>
                  </div>}
                </div>
              </div>
              {true ? <Route path={`/project/:author/:repo/:platform/:repoId/:type?`} component={SubFeed}/> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
