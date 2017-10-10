import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions/constants';
import Cookie from 'js-cookie';
import * as querystring from 'querystring';
import {
  getFeedContent,
  getMoreFeedContent,
  getUserFeedContent,
  getMoreUserFeedContent,
} from './feedActions';
import {
  getFeedContentFromState,
  getFeedLoadingFromState,
  getUserFeedContentFromState,
  getUserFeedLoadingFromState,
  getFeedHasMoreFromState,
} from '../helpers/stateHelpers';
import {
  getIsAuthenticated,
  getIsLoaded,
  getAuthenticatedUser,
  getFeed,
  getPosts,
} from '../reducers';
import { Link } from 'react-router-dom';
import Feed from './Feed';
import EmptyFeed from '../statics/EmptyFeed';
import ScrollToTop from '../components/Utils/ScrollToTop';

// @UTOPIAN
import { getContributions } from '../actions/contributions';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    loaded: getIsLoaded(state),
    user: getAuthenticatedUser(state),
    feed: getFeed(state),
    posts: getPosts(state),
    contributions: state.contributions,
    loading: state.loading,
  }),
  {
    /*
    getFeedContent: (sortBy, category) => dispatch(getFeedContent({ sortBy, category, limit: 10 })),
    getMoreFeedContent: (sortBy, category) =>
      dispatch(getMoreFeedContent({ sortBy, category, limit: 10 })),
    getUserFeedContent: username => dispatch(getUserFeedContent({ username, limit: 10 })),
    getMoreUserFeedContent: username => dispatch(getMoreUserFeedContent({ username, limit: 10 })),*/
    getContributions,
  },
)
class SubFeed extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired,
    feed: PropTypes.shape().isRequired,
    posts: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    getFeedContent: PropTypes.func,
    getMoreFeedContent: PropTypes.func,
    getUserFeedContent: PropTypes.func,
    getMoreUserFeedContent: PropTypes.func,
  };

  static defaultProps = {
    getFeedContent: () => {},
    getMoreFeedContent: () => {},
    getUserFeedContent: () => {},
    getMoreUserFeedContent: () => {},
  };

  state = {
    total: 0,
    skip: 0,
    limit: 10,
  };

  constructor(props) {
    super(props);
    this.loadContributions = this.loadContributions.bind(this);
  }


  loadContributions () {
    const { match, getContributions } = this.props;

    if (match.params.projectId) {
      getContributions(this.state.limit, this.state.skip, querystring.encode({
        sortBy: 'project',
        platform: match.params.platform,
        projectId: match.params.projectId,
      })).then(res => {
        this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    } else {
      getContributions(this.state.limit, this.state.skip, querystring.encode({
        sortBy: 'all',
      })).then(res => {
        this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    }
  }


  componentDidMount() {
    /*
    const { authenticated, loaded, user, match, getContributions } = this.props;

    if (match.params.projectId) {
      getContributions(this.state.limit, this.state.skip, {
        sortBy: 'project',
        platform: match.params.platform,
        projectId: match.params.projectId,
      }).then(res => {
        this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    } else {
      getContributions(this.state.limit, this.state.skip, {
        sortBy: 'all',
      }).then(res => {
          this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    }*/

    this.loadContributions();

    //if (!loaded && Cookie.get('access_token')) return;

    //this.props.getFeedContent(sortBy, category);
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated, loaded, user, match } = nextProps;
    const oldSortBy = this.props.match.params.sortBy;
    const newSortBy = match.params.sortBy;
    const oldCategory = this.props.match.params.category;
    const newCategory = match.params.category;
    const wasAuthenticated = this.props.authenticated;
    const isAuthenticated = authenticated;
    const wasLoaded = this.props.loaded;
    const isLoaded = loaded;

    //if (!isLoaded && Cookie.get('access_token')) return;


    if (!this.props.match.params.projectId) {
      if (oldSortBy !== newSortBy || oldCategory !== newCategory || (!wasLoaded && isLoaded)) {
        this.props.getFeedContent(newSortBy || 'trending', match.params.category);
      }
    } else {
      if (this.props.match.params.projectId !== nextProps.match.params.projectId) {
        this.props.getFeedContent('project', match.params.platform + '-' + match.params.projectId);
      }
    }

  }

  render() {
    const { authenticated, loaded, user, feed, posts, match, contributions, loading, getContributions } = this.props;
    let isFetching = loading === Actions.GET_CONTRIBUTIONS_REQUEST;
    const hasMore = this.state.total > contributions.length;
    const sortBy = 'home';

    /*
    const loadMoreContent = () => {
      getContributions(this.state.limit, this.state.skip).then(() => {
        this.setState({skip: this.state.skip + this.state.limit});
      });
    };*/

    /*let content = [];
    let isFetching = false;
    let hasMore = false;
    let loadMoreContent = () => {};
    let sortBy = 'trending';
    let category;

    if (match.params.projectId) {
      sortBy = 'project';
      category = match.params.platform + '-' + match.params.projectId;
    } else {
      sortBy = match.params.sortBy || 'trending';
      category = match.params.category;
    }

    content = getFeedContentFromState(sortBy, category, feed, posts);
    isFetching = getFeedLoadingFromState(sortBy, category, feed);
    hasMore = getFeedHasMoreFromState(sortBy, category, feed);
    loadMoreContent = () => this.props.getMoreFeedContent(sortBy, category);

    console.log("CONTENT", content)
    */



    return (
      <div>
        <ScrollToTop />

        {sortBy !== 'project' && <div className="AddContribution">
          <div>
            <img src="/img/utopian-logo-120x120.png" />
          </div>
          <div>
            <h3>Utopian Rewards Open Source Contributors!</h3>
            <p>
              <Link to={`/write`}>Create a <b>Contributor Report</b></Link> to share the latest contributions you made to an Open Source project.
              The Utopian community will vote and get you rewarded $$. <Link to={`/help/#contributor-report`}>Learn more</Link>
            </p>
          </div>
        </div>}

        <Feed
          content={ contributions }
          isFetching={ isFetching }
          hasMore={ hasMore }
          loadMoreContent={ this.loadContributions }
        />
        {!contributions.length && !isFetching && <EmptyFeed />}
      </div>
    );
  }
}

export default SubFeed;
