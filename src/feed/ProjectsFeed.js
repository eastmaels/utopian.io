import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReduxInfiniteScroll from 'redux-infinite-scroll';

import {
  getAuthenticatedUser,
} from '../reducers';

import Project from '../components/Story/Project';
import StoryLoading from '../components/Story/StoryLoading';
import './Feed.less';

@connect(
  state => ({
    user: getAuthenticatedUser(state),
  }),
  {},
)
export default class Feed extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    content: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    isFetching: PropTypes.bool,
    hasMore: PropTypes.bool,
    loadMoreContent: PropTypes.func,
  };

  static defaultProps = {
    isFetching: false,
    hasMore: false,
    loadMoreContent: () => {},
  };

  render() {
    const {
      content,
      isFetching,
      hasMore,
    } = this.props;

    return (
      <ReduxInfiniteScroll
        className="Feed"
        loadMore={this.props.loadMoreContent}
        loader={<StoryLoading />}
        loadingMore={isFetching}
        hasMore={hasMore}
        elementIsScrollable={false}
        threshold={200}
      >
        {content.map((repo) => {

          return (
            <Project key={repo.id} repo={repo} />
          );
        })}
      </ReduxInfiniteScroll>
    );
  }
}
