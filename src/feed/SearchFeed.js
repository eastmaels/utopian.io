import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions/constants';
import { Link } from 'react-router-dom';
import Feed from './Feed';
import ProjectsFeed from './ProjectsFeed';
import EmptyFeed from '../statics/EmptyFeed';
import ScrollToTop from '../components/Utils/ScrollToTop';

import { getIsAuthenticated, getAuthenticatedUser } from '../reducers';

// @UTOPIAN
import { getContributions } from '../actions/contributions';
import { getGithubRepos } from '../actions/projects';
import { getModerators } from '../actions/moderators';
import { Tabs, Icon } from 'antd';

import * as R from 'ramda';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    user: getAuthenticatedUser(state),
    contributions: state.contributions,
    repos: state.repos,
    loading: state.loading,
    moderators: state.moderators,
  }),
  {
    getContributions,
    getGithubRepos,
    getModerators
  },
)
class SubFeed extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    moderators: PropTypes.array,
  };

  state = {
    skip: 0,
  };

  constructor(props) {
    super(props);
    this.loadResults = this.loadResults.bind(this);
    this.total = 0;
    this.toRenderContributions = [];
  }

  componentWillMount() {
    const { getModerators, match, history } = this.props;
    getModerators();
  }

  componentDidMount() {
    this.loadResults();
  }

  isModerator () {
    const { moderators, user } = this.props;
    return R.find(R.propEq('account', user.name))(moderators)
  }

  loadResults (nextProps = false) {

    const { match, getContributions, getGithubRepos, user, loading, contributions } = nextProps || this.props;
    const q = match.params.query;
    const searchSection = match.params.searchSection;
    const skip =  nextProps ? 0 : this.state.skip;
    const limit = 20;
    this.total = nextProps ? 0 : this.total;
    this.toRenderContributions = nextProps ? [] : this.toRenderContributions;
    
    if(this.total !== 0 && this.total <= this.state.skip){
      return;
    }

    if (searchSection === 'projects') {
      getGithubRepos({
        q,
        sort: 'stars',
        order: 'desc',
        per_page: limit,
      });
    } else {
      getContributions({
        limit,
        skip,
        section: 'all',
        sortBy: 'created',
        type: searchSection,
        bySimilarity: q,
        reset: nextProps,
      }).then(res => {
        this.total = res.response.total;
        this.setState({skip: skip + limit});
        this.toRenderContributions = [...this.toRenderContributions, ...res.response.results];
      });
    }
  }

  renderResults () {
    const { repos, match, user } = this.props;
    const contributions = this.toRenderContributions;
    const { searchSection } = match.params;

    if (searchSection === 'projects') return repos;
    return contributions;
  }


  componentWillReceiveProps (nextProps) {
    const { location } = this.props;

    if (location.pathname !== nextProps.location.pathname) {
      this.total = 0; // @TODO @UTOPIAN antipattern - requires better implementation
      this.toRenderContributions = [];
      this.loadResults(nextProps);
    }
  }


  render() {
    const { loading, history, match, location, isModerator } = this.props;
    const { searchSection } = match.params;
    const results = this.renderResults();
    const isFetching = loading === Actions.GET_CONTRIBUTIONS_REQUEST || loading === Actions.GET_GITHUB_REPOS_REQUEST;
    const hasMore = this.total > results.length;

    return (
      <div>
        <ScrollToTop />

        {searchSection !== 'projects' ? <Feed
            content={ results }
            isFetching={ isFetching }
            hasMore={ hasMore }
            loadMoreContent={ this.loadResults }
            showBlogs={((searchSection === 'blog') || (searchSection === 'blogs'))}
          /> :
          <ProjectsFeed
            content={ results }
            isFetching={ isFetching }
            hasMore={ hasMore }
            loadMoreContent={ this.loadResults }
          />}
        {!results.length && !isFetching && <EmptyFeed
          text={searchSection === 'projects' ? 'No projects found. Try again' : null}
        />}
      </div>
    );
  }
}

export default SubFeed;
