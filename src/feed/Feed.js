import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReduxInfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { getHasDefaultSlider } from '../helpers/user';
import * as bookmarkActions from '../bookmarks/bookmarksActions';
import * as reblogActions from '../app/Reblog/reblogActions';
import * as postActions from '../post/postActions';
import { followUser, unfollowUser } from '../user/userActions';
import { editPost } from '../post/Write/editorActions';

import {
  getVotingPower,
  getRewardFund,
  getVotePercent,
  getAuthenticatedUser,
  getBookmarks,
  getPendingBookmarks,
  getPendingLikes,
  getRebloggedList,
  getPendingReblogs,
  getFollowingList,
  getPendingFollows,
  getIsEditorSaving,
  getCurrentMedianHistoryPrice,
} from '../reducers';

import Story from '../components/Story/Story';
import StoryLoading from '../components/Story/StoryLoading';
import './Feed.less';

@connect(
  state => ({
    user: getAuthenticatedUser(state),
    bookmarks: getBookmarks(state),
    pendingBookmarks: getPendingBookmarks(state),
    pendingLikes: getPendingLikes(state),
    reblogList: getRebloggedList(state),
    pendingReblogs: getPendingReblogs(state),
    sliderMode: getVotingPower(state),
    rewardFund: getRewardFund(state),
    currentMedianHistoryPrice: getCurrentMedianHistoryPrice(state),
    defaultVotePercent: getVotePercent(state),
    followingList: getFollowingList(state),
    pendingFollows: getPendingFollows(state),
    saving: getIsEditorSaving(state),
  }),
  {
    editPost,
    toggleBookmark: bookmarkActions.toggleBookmark,
    votePost: postActions.votePost,
    reblog: reblogActions.reblog,
    followUser,
    unfollowUser,
  },
)
export default class Feed extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    content: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    pendingLikes: PropTypes.arrayOf(PropTypes.number).isRequired,
    pendingFollows: PropTypes.arrayOf(PropTypes.string).isRequired,
    pendingReblogs: PropTypes.arrayOf(PropTypes.number).isRequired,
    bookmarks: PropTypes.shape().isRequired,
    pendingBookmarks: PropTypes.arrayOf(PropTypes.number).isRequired,
    followingList: PropTypes.arrayOf(PropTypes.string).isRequired,
    reblogList: PropTypes.arrayOf(PropTypes.number).isRequired,
    saving: PropTypes.bool.isRequired,
    rewardFund: PropTypes.shape().isRequired,
    currentMedianHistoryPrice: PropTypes.shape().isRequired,
    defaultVotePercent: PropTypes.number.isRequired,
    sliderMode: PropTypes.oneOf(['on', 'off', 'auto']),
    isFetching: PropTypes.bool,
    hasMore: PropTypes.bool,
    editPost: PropTypes.func,
    toggleBookmark: PropTypes.func,
    votePost: PropTypes.func,
    reblog: PropTypes.func,
    followUser: PropTypes.func,
    unfollowUser: PropTypes.func,
    loadMoreContent: PropTypes.func,
    showBlogs: PropTypes.bool,
    showTasks: PropTypes.bool,
    filterBy: PropTypes.string
  };

  static defaultProps = {
    isFetching: false,
    hasMore: false,
    sliderMode: 'auto',
    editPost: () => {},
    toggleBookmark: () => {},
    votePost: () => {},
    reblog: () => {},
    followUser: () => {},
    unfollowUser: () => {},
    loadMoreContent: () => {},
    showBlogs: false,
    showTasks: false
  };

  handleFollowClick = (post) => {
    const isFollowed = this.props.followingList.includes(post.author);
    if (isFollowed) {
      this.props.unfollowUser(post.author);
    } else {
      this.props.followUser(post.author);
    }
  };

  handleLikeClick = (post, postState, weight = 10000) => {
    const { sliderMode, user, defaultVotePercent } = this.props;
    if (sliderMode === 'on' || (sliderMode === 'auto' && getHasDefaultSlider(user))) {
      this.props.votePost(post.id, post.author, post.permlink, weight);
    } else if (postState.isLiked) {
      this.props.votePost(post.id, post.author, post.permlink, 0);
    } else {
      this.props.votePost(post.id, post.author, post.permlink, defaultVotePercent);
    }
  };

  handleReportClick = post => this.props.votePost(post.id, post.author, post.permlink, -10000);

  handleShareClick = post => this.props.reblog(post.id);

  handleSaveClick = post => this.props.toggleBookmark(post.id, post.author, post.permlink);

  handleEditClick = post => this.props.editPost(post);

  render() {
    const {
      user,
      content,
      isFetching,
      hasMore,
      pendingLikes,
      bookmarks,
      pendingBookmarks,
      reblogList,
      followingList,
      pendingFollows,
      pendingReblogs,
      toggleBookmark,
      reblog,
      votePost,
      saving,
      sliderMode,
      rewardFund,
      currentMedianHistoryPrice,
      defaultVotePercent,
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
        {content.map((post) => {
          const userVote = _.find(post.active_votes, { voter: user.name }) || {};

          const postState = {
            isReblogged: reblogList.includes(post.id),
            isReblogging: pendingReblogs.includes(post.id),
            isSaved: !!bookmarks[post.id],
            isLiked: userVote.percent > 0,
            isReported: userVote.percent < 0,
            userFollowed: followingList.includes(post.author),
          };

          if (post.json_metadata.type !== 'blog' && (post.json_metadata.type.indexOf("task") <= -1)) {
            return (
              <Story
                key={post.id}
                id={post.id}
                user={user}
                post={post}
                postState={postState}
                pendingLike={pendingLikes.includes(post.id)}
                pendingFollow={pendingFollows.includes(post.author)}
                pendingBookmark={pendingBookmarks.includes(post.id)}
                saving={saving}
                ownPost={post.author === user.name}
                onFollowClick={this.handleFollowClick}
                onEditClick={this.handleEditClick}
                sliderMode={sliderMode}
                rewardFund={rewardFund}
                currentMedianHistoryPrice={currentMedianHistoryPrice}
                defaultVotePercent={defaultVotePercent}
                onLikeClick={this.handleLikeClick}
                onReportClick={this.handleReportClick}
                onShareClick={this.handleShareClick}
                onSaveClick={this.handleSaveClick}
              />

            );
          } else if (post.json_metadata.type === 'blog') {
            return (
              (this.props.showBlogs === true) ?
                <Story
                  key={post.id}
                  id={post.id}
                  user={user}
                  post={post}
                  postState={postState}
                  pendingLike={pendingLikes.includes(post.id)}
                  pendingFollow={pendingFollows.includes(post.author)}
                  pendingBookmark={pendingBookmarks.includes(post.id)}
                  saving={saving}
                  ownPost={post.author === user.name}
                  onFollowClick={this.handleFollowClick}
                  onEditClick={this.handleEditClick}
                  sliderMode={sliderMode}
                  rewardFund={rewardFund}
                  currentMedianHistoryPrice={currentMedianHistoryPrice}
                  defaultVotePercent={defaultVotePercent}
                  onLikeClick={this.handleLikeClick}
                  onReportClick={this.handleReportClick}
                  onShareClick={this.handleShareClick}
                  onSaveClick={this.handleSaveClick}
                />
                : null
            );
          } else if (post.json_metadata.type.indexOf('task') > -1) {
            return (
              (this.props.showTasks === true) ?
                <Story
                  key={post.id}
                  id={post.id}
                  post={post}
                  user={user}
                  postState={postState}
                  pendingLike={pendingLikes.includes(post.id)}
                  pendingFollow={pendingFollows.includes(post.author)}
                  pendingBookmark={pendingBookmarks.includes(post.id)}
                  saving={saving}
                  ownPost={post.author === user.name}
                  onFollowClick={this.handleFollowClick}
                  onEditClick={this.handleEditClick}
                  sliderMode={sliderMode}
                  rewardFund={rewardFund}
                  currentMedianHistoryPrice={currentMedianHistoryPrice}
                  defaultVotePercent={defaultVotePercent}
                  onLikeClick={this.handleLikeClick}
                  onReportClick={this.handleReportClick}
                  onShareClick={this.handleShareClick}
                  onSaveClick={this.handleSaveClick}
                />
                : null
            );
          }
        })}
      </ReduxInfiniteScroll>
    );
  }
}
