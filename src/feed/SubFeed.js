import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
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

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    loaded: getIsLoaded(state),
    user: getAuthenticatedUser(state),
    feed: getFeed(state),
    posts: getPosts(state),
  }),
  dispatch => ({
    getFeedContent: (sortBy, category) => dispatch(getFeedContent({ sortBy, category, limit: 10 })),
    getMoreFeedContent: (sortBy, category) =>
      dispatch(getMoreFeedContent({ sortBy, category, limit: 10 })),
    getUserFeedContent: username => dispatch(getUserFeedContent({ username, limit: 10 })),
    getMoreUserFeedContent: username => dispatch(getMoreUserFeedContent({ username, limit: 10 })),
  }),
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

  componentDidMount() {
    const { authenticated, loaded, user, match } = this.props;
    const sortBy = match.params.sortBy || 'trending';
    const category = match.params.category;

    if (!loaded && Cookie.get('access_token')) return;

    this.props.getFeedContent(sortBy, category);
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

    if (!isLoaded && Cookie.get('access_token')) return;

    if (oldSortBy !== newSortBy || oldCategory !== newCategory || (!wasLoaded && isLoaded)) {
      this.props.getFeedContent(newSortBy || 'trending', match.params.category);
    }
  }

  render() {
    const { authenticated, loaded, user, feed, posts, match } = this.props;

    let content = [];
    let isFetching = false;
    let hasMore = false;
    let loadMoreContent = () => {};

    const sortBy = match.params.sortBy || 'trending';
    content = getFeedContentFromState(sortBy, match.params.category, feed, posts);
    isFetching = getFeedLoadingFromState(sortBy, match.params.category, feed);
    hasMore = getFeedHasMoreFromState(sortBy, match.params.category, feed);
    loadMoreContent = () => this.props.getMoreFeedContent(sortBy, match.params.category);

    return (
      <div>
        <ScrollToTop />

        <div className="AddContribution">
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
        </div>
        <div className="VoteContributions">
          <h3>Vote Contribution Reports:</h3>
        </div>

        <Feed
          content={content}
          isFetching={isFetching}
          hasMore={hasMore}
          loadMoreContent={loadMoreContent}
        />
        {!content.length && !isFetching && loaded && <EmptyFeed />}
      </div>
    );
  }
}

export default SubFeed;
