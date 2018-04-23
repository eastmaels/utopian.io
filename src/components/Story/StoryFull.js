import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { injectIntl, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Link } from 'react-router-dom';
import { Icon, Popover, Tooltip } from 'antd';
import { find } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import {
  getIsAuthenticated,
} from '../../reducers';
import Body from './Body';
import StoryFooter from '../StoryFooter/StoryFooter';
import Avatar from '../Avatar';
import Topic from '../Button/Topic';
import PopoverMenu, { PopoverMenuItem } from '../PopoverMenu/PopoverMenu';
import Action from '../../components/Button/Action';
import CommentForm from '../Comments/CommentForm';
import * as commentsActions from '../../comments/commentsActions';
import { Modal } from 'antd';
import { notify } from '../../app/Notification/notificationActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Contribution from './Contribution';

import InlineTagEdit from '../Story/InlineTagEdit';

import * as R from 'ramda';
import './StoryFull.less';



@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
  }),
  dispatch => bindActionCreators({
    sendComment: (parentPost, body, isUpdating, originalPost) =>
      commentsActions.sendComment(parentPost, body, isUpdating, originalPost),
    notify,
    // addPostPrefix
  }, dispatch),
)

@injectIntl
class StoryFull extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
    post: PropTypes.shape().isRequired,
    postState: PropTypes.shape().isRequired,
    rewardFund: PropTypes.shape().isRequired,
    currentMedianHistoryPrice: PropTypes.shape().isRequired,
    defaultVotePercent: PropTypes.number.isRequired,
    pendingLike: PropTypes.bool,
    pendingFollow: PropTypes.bool,
    pendingBookmark: PropTypes.bool,
    commentCount: PropTypes.number,
    saving: PropTypes.bool,
    ownPost: PropTypes.bool,
    sliderMode: PropTypes.oneOf(['on', 'off', 'auto']),
    onFollowClick: PropTypes.func,
    onSaveClick: PropTypes.func,
    onReportClick: PropTypes.func,
    onLikeClick: PropTypes.func,
    onShareClick: PropTypes.func,
    onEditClick: PropTypes.func,
    sendComment: PropTypes.func,
    moderatorAction: PropTypes.func.isRequired,
    staffPick: PropTypes.func.isRequired,
    moderators: PropTypes.array
  };

  static defaultProps = {
    user: {},
    moderatorAction: () => { },
    staffPick: () => { },
    moderators: [],
    pendingLike: false,
    pendingFollow: false,
    pendingBookmark: false,
    commentCount: 0,
    saving: false,
    ownPost: false,
    sliderMode: 'auto',
    onFollowClick: () => { },
    onSaveClick: () => { },
    onReportClick: () => { },
    onLikeClick: () => { },
    onShareClick: () => { },
    onEditClick: () => { },
    sendComment: () => { },
    postState: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      wasReserved: false,
      submitting: false,
      moderatorCommentModal: false,
      shareModal: false,
      reviewsource: 0,
      modTemplate: '',
      lightbox: {
        open: false,
        index: 0,
      },
    };
  }

  componentDidMount() {
    document.body.classList.add('white-bg');
  }

  componentWillUnmount() {
    document.body.classList.remove('white-bg');
  }

  // Show that the text was copied and dismiss warning after 2 seconds
  handlePostCopy = () => {
    this.setState({ postCopied: true })
    setTimeout(() => this.setState({ postCopied: false }), 2000)
  }

  handleModalCopy = () => {
    this.setState({ modalCopied: true })
    setTimeout(() => this.setState({ modalCopied: false }), 2000)
  }

  handleClick = (key) => {
    switch (key) {
      case 'follow':
        this.props.onFollowClick(this.props.post);
        break;
      case 'save':
        this.props.onSaveClick(this.props.post);
        break;
      case 'report':
        this.props.onReportClick(this.props.post);
        break;
      case 'edit':
        this.props.onEditClick(this.props.post);
        break;
      default:
    }
  };


  handleContentClick = (e) => {
    if (e.target.tagName === 'IMG') {
      const tags = this.contentDiv.getElementsByTagName('img');
      for (let i = 0; i < tags.length; i += 1) {
        if (tags[i] === e.target) {
          this.setState({
            lightbox: {
              open: true,
              index: i,
            },
          });
        }
      }
    }
  };

  tagString(tags) {
    var ret = "";
    for (var i = 0; i < tags.length; ++i) {
      ret += tags[i];
      if (i !== (tags.length - 1)) ret += ", ";
    }
    return ret;
  }

  handleTagValidation(value) {
    let valid = true;
    if (typeof value === 'string') {
      valid = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value);
    } else {
      for(let i=0; i<value.length; i++) {
        const check = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value[i]);
        if (!check) {
          valid = false;
          break;
        }
      }
    }
    this.setState({ displayTopicsError : !valid });
    return valid;
  }

  render() {
    const {
      intl,
      user,
      username,
      post,
      postState,
      pendingLike,
      pendingFollow,
      pendingBookmark,
      commentCount,
      saving,
      rewardFund,
      currentMedianHistoryPrice,
      ownPost,
      sliderMode,
      defaultVotePercent,
      onLikeClick,
      onShareClick,
      moderatorAction,
      staffPick,
      moderators,
      history,
    } = this.props;

    const { open, index } = this.state.lightbox;
    const images = post.json_metadata.image;
    const tags = _.union(post.json_metadata.tags, [post.category]);
    const video = post.json_metadata.video;
    const isLogged = Object.keys(user).length;
    const isAuthor = isLogged && user.name === post.author;
    const inModeratorsObj = R.find(R.propEq('account', user.name))(moderators);
    const isModerator = isLogged && inModeratorsObj && !isAuthor ? inModeratorsObj : false;
    const isSupervisor = isModerator && isModerator.supermoderator === true;
    const isReviewed = post.reviewed || false;
    const isRejected = post.flagged || false;
    const isPending = post.pending || false;
    const isPendingReviewer = isModerator && isModerator.account === user.name && isPending && post.moderator === isModerator.account;
    const isProcessing = this.state.processing;
    const isStaffPicked = post.json_metadata.staff_pick;
    const metaData = post.json_metadata;
    const repository = metaData.repository;
    const postType = post.json_metadata.type;
    const unreviewed = !post.reviewed && !post.pending && !post.flagged;
    const wasReserved = this.state.wasReserved;

    const getShortLink = (post) => {
      return `https://utopian.io/u/${post.id}`;
    }

    let followText = '';

    if (postState.userFollowed && !pendingFollow) {
      followText = intl.formatMessage({ id: 'unfollow_username', defaultMessage: 'Unfollow {username}' }, { username: post.author });
    } else if (postState.userFollowed && pendingFollow) {
      followText = intl.formatMessage({ id: 'unfollow_username', defaultMessage: 'Unfollow {username}' }, { username: post.author });
    } else if (!postState.userFollowed && !pendingFollow) {
      followText = intl.formatMessage({ id: 'follow_username', defaultMessage: 'Follow {username}' }, { username: post.author });
    } else if (!postState.userFollowed && pendingFollow) {
      followText = intl.formatMessage({ id: 'follow_username', defaultMessage: 'Follow {username}' }, { username: post.author });
    }

    let replyUI = null;

    if (post.depth !== 0) {
      replyUI = (
        <div className="StoryFull__reply">
          <h3 className="StoryFull__reply__title">
            <FormattedMessage id="post_reply_title" defaultMessage="This is a reply to: {title}" values={{ title: post.root_title }} />
          </h3>
          <h4>
            <Link to={post.url}>
              <FormattedMessage id="post_reply_show_original_post" defaultMessage="Show original post" />
            </Link>
          </h4>
          {post.depth > 1 && (<h4>
            <Link to={`/${post.category}/@${post.parent_author}/${post.parent_permlink}`}>
              <FormattedMessage id="post_reply_show_parent_discussion" defaultMessage="Show parent discussion" />
            </Link>
          </h4>)}
        </div>
      );
    }

    let popoverMenu = [];


    if (ownPost && post.cashout_time !== '1969-12-31T23:59:59') {
      popoverMenu = [...popoverMenu, <PopoverMenuItem key="edit">
        {saving ? <Icon type="loading" /> : <i className="iconfont icon-write" />}
        <FormattedMessage id="edit_post" defaultMessage="Edit post" />
      </PopoverMenuItem>];
    }

    if (!ownPost) {
      popoverMenu = [...popoverMenu, <PopoverMenuItem key="follow" disabled={pendingFollow}>
        {pendingFollow ? <Icon type="loading" /> : <i className="iconfont icon-people" />}
        {followText}
      </PopoverMenuItem>];
    }

    popoverMenu = [
      ...popoverMenu,
      <PopoverMenuItem key="report">
        <i className="iconfont icon-flag" />
        <FormattedMessage id="report_post" defaultMessage="Report post" />
      </PopoverMenuItem>,
    ];

    return (
      <div className="StoryFull">
        {isModerator ? <div className="StoryFull__review">

            {isProcessing ? <div className="processing"><span>Processing{' '}</span><Icon type="loading"/></div> : null}

            <div className="controls">
              <h4><Icon type="safety" /> Moderation Controls:</h4>

              {(!isPending && !isReviewed && !wasReserved) || (isSupervisor && !isPending && !wasReserved) ? <Action
                  id="reserve"
                  text={<span><Icon type="pushpin"/>Reserve</span>}
                  onClick={() => {
                    var confirm = window.confirm('Reserve as soon as you start reviewing it. It will be reserved to you for maximum 1 hour. Do you wish to proceed?')
                    if (confirm) {
                      this.setState({processing: true});
                      moderatorAction(post.author, post.permlink, user.name, 'pending')
                        .then(() => this.setState({ processing: false }))
                        .catch(e => {
                          if(e == 'Error: Forbidden') {
                            alert('Too late! It was already reserved.');
                          }
                        });
                    }
                  }}
                /> : null}

              {isPendingReviewer && !isReviewed && !isRejected && !wasReserved ? <Action
                  id="verified"
                  text={<span><Icon type="check-circle"/>Review/Score</span>}
                  onClick={() => {
                    var confirm = window.confirm('Only set as reviewed if you have verified all the most fundamental information are correct (category, repository, tags), otherwise please change them first. Do you really want to proceed?')
                    if (confirm) {
                      this.setState({processing: true});

                      moderatorAction(post.author, post.permlink, user.name, 'reviewed').then(() => {
                        this.setState({processing: false});
                        history.push(history.location.pathname + '/score');
                      })
                    }
                  }}
                /> : null}

              {isPendingReviewer && !isRejected && !wasReserved ? <Action
                  id="hide"
                  text={<span><Icon type="exclamation-circle"/>Reject</span>}
                  onClick={() => {
                    var confirm = window.confirm('Rejection is final and can never be undone. Rejecting should only happen if the most fundamental rules have not been respected. Proceed with caution! Do you really want to proceed with rejection?')
                    if (confirm) {
                      this.setState({processing: true});
                      moderatorAction(post.author, post.permlink, user.name, 'flagged').then(() => {
                        this.setState({ moderatorCommentModal: true, processing: false })
                      });
                    }
                  }}
                /> : null}

              {isPendingReviewer && isSupervisor && !isRejected && !isStaffPicked && !wasReserved ? <Action
                  id="staffpick"
                  text={<span><Icon type="trophy"/>Staff Pick</span>}
                  onClick={() => {
                    var confirm = window.confirm('Staff Picking is final and can never be undone. Staff Picks should be of the highest quality. Proceed with caution! Are you sure you want to pick this one?')
                    if (confirm) {
                      this.setState({processing: true});
                      staffPick(post.author, post.permlink, user.name)
                        .then(() => this.setState({ processing: false }))
                    }
                  }}
                /> : null}

              <Action
                id="comment"
                text={<span><Icon type="notification"/>Comment</span>}
                onClick={() => {
                  this.setState({ moderatorCommentModal: true })
                }}
              />
            </div>
          </div> : null}

        {isModerator && !post.flagged ? <div className="StoryFull__info">
          <span>
            {post.reviewed && <p> <Icon type="check-circle"/>&nbsp; Reviewed by <Link to={`/@${post.moderator}`}>@{post.moderator}</Link> <span className="smallBr"><br /></span> </p>}
            {post.pending && <p> <Icon type="sync"/>&nbsp; Under Review by <Link to={`/@${post.moderator}`}>@{post.moderator}</Link> <span className="smallBr"><br/></span> </p>}
            {unreviewed && <p> <Icon type="eye-o"/>&nbsp; To Be Reviewed <span className="smallBr"><br/></span> </p>}
          </span>
          </div> : null}

        {post.flagged ? <div className={`StoryFull__info rejected`}>
            <span>
              {post.flagged && <p> <Icon type="exclamation-circle"/>&nbsp; Rejected by <Link to={`/@${post.moderator}`}>@{post.moderator}</Link><span className="smallBr"><br /></span> </p>}
            </span>
          </div> : null}

        <Contribution
          type={postType}
          repository={repository || null}
          platform={metaData.platform || null}
          id={repository && repository.id ? repository.id : null}
          showVerified={ post.reviewed }
          showPending={ post.pending }
          showFlagged={ post.flagged }
          showInProgress = { (!(post.reviewed || post.pending || post.flagged)) }
          fullMode={true}
          post={post}
          user={user}
          isModerator={isPendingReviewer}
          moderatorAction={moderatorAction}
        />

        {replyUI}

        <h1 className="StoryFull__title">
          {post.title}
        </h1>

        <div className="StoryFull__score">
          <Link to={`/${post.parent_permlink}/@${post.author}/${post.permlink}/score`}>
            <span><Icon type="star"/>{' '}Score</span>
            <span>{metaData.score !== null && metaData.score !== undefined && !post.flagged ? metaData.score : '0'}</span>
          </Link>
        </div>

        {isStaffPicked ? <div><Icon type="trophy"></Icon>{' '}Staff Pick</div> : null}

        <h3 className="StoryFull__comments_title">
          <a href="#comments">
            <FormattedMessage
              id="comments_count"
              values={{ count: intl.formatNumber(commentCount) }}
              defaultMessage="{count} comments"
            />
          </a>

          {' '}

          <CopyToClipboard text={getShortLink(post)} onCopy={this.handlePostCopy}>
            <span><Icon type="paper-clip" style={{color: "green"}}/> Link</span>
          </CopyToClipboard>
        </h3>

        { this.state.postCopied && <span>&nbsp;&nbsp;&nbsp;&nbsp;Copied</span> }

        <div className="StoryFull__header">
          <Link to={`/@${post.author}`}>
            <Avatar username={post.author} size={60} />
          </Link>
          <div className="StoryFull__header__text">
            <Link to={`/@${post.author}`}>
              {post.author}
            </Link>
            <Tooltip
              title={
                <span>
                  <FormattedDate value={`${post.created}Z`} />{' '}
                  <FormattedTime value={`${post.created}Z`} />
                </span>
              }
            >
              <span className="StoryFull__header__text__date">
                <FormattedRelative value={`${post.created}Z`} />
              </span>
            </Tooltip>
          </div>
          <Popover
            placement="bottomRight"
            trigger="click"
            content={
              <PopoverMenu onSelect={this.handleClick} bold={false}>
                {popoverMenu}
              </PopoverMenu>
            }
          >
            <i className="iconfont icon-more StoryFull__header__more" />
          </Popover>
        </div>
        <div
          role="presentation"
          ref={(div) => {
            this.contentDiv = div;
          }}
          onClick={this.handleContentClick}
        >
          {_.has(video, 'content.videohash') && _.has(video, 'info.snaphash') &&
          <video
            controls
            src={`https://ipfs.io/ipfs/${video.content.videohash}`}
            poster={`https://ipfs.io/ipfs/${video.info.snaphash}`}
          >
            <track kind="captions" />
          </video>
          }
          <Body full body={post.body} json_metadata={post.json_metadata} />
        </div>
        {open && (
          <Lightbox
            mainSrc={images[index]}
            nextSrc={images[(index + 1) % images.length]}
            prevSrc={images[(index + (images.length - 1)) % images.length]}
            onCloseRequest={() => {
              this.setState({
                lightbox: {
                  ...this.state.lightbox,
                  open: false,
                },
              });
            }}
            onMovePrevRequest={() =>
              this.setState({
                lightbox: {
                  ...this.state.lightbox,
                  index: (index + (images.length - 1)) % images.length,
                },
              })}
            onMoveNextRequest={() =>
              this.setState({
                lightbox: {
                  ...this.state.lightbox,
                  index: (index + (images.length + 1)) % images.length,
                },
              })}
          />
        )}
        <div className="StoryFull__topics">
          { isPendingReviewer ?
            <InlineTagEdit
              post={post}
              user={user}
              moderatorAction={moderatorAction}
              validation={this.handleTagValidation.bind(this)}
            /> :
            <Tooltip title={<span><b>Tags:</b> {this.tagString(tags)}</span>}>
              {tags && tags.map(tag =>
                <span>
                  <Topic key={tag} name={tag} />&nbsp;
                </span>
              )}
            </Tooltip>
          }
        </div>
        <div className="ant-form-explain"
             style={{display: this.state.displayTopicsError ? '' : 'none'}}
        >
          {intl.formatMessage({
            id: 'topics_allowed_chars',
            defaultMessage:
              'Only lowercase letters, numbers and hyphen character is permitted.',
          })}
        </div>

        {metaData.pullRequests && metaData.pullRequests.length > 0 && metaData.pullRequests[0].user ?
          <div>
            <h4><Icon type="github" /> Github Connection</h4>
            <div className="StoryFull__pullrequests">
              {metaData.pullRequests[0].user.avatar_url
              && <Avatar username={metaData.pullRequests[0].user.avatar_url} size={45} /> }
              <span>
                <a target="_blank" href={`https://github.com/${metaData.pullRequests[0].user.account}`}>
                  {metaData.pullRequests[0].user.account}
                  </a>
              </span>
            </div>
          </div>
          : null}

        {metaData.pullRequests && metaData.pullRequests.length > 0 ?
          <div>
            <h3><Icon type="github" /> Linked Pull Requests</h3>
            <ul className="StoryFull__pullrequests">
              {metaData.pullRequests.map(pr => (
                <li key={pr.id} className="StoryFull__pullrequest">
                  <a target="_blank" href={pr.html_url}>{pr.title}</a>
                </li>
              ))}
            </ul>
          </div> : null}

        {<StoryFooter
          user={user}
          ownPost={ownPost}
          rewardFund={rewardFund}
          currentMedianHistoryPrice={currentMedianHistoryPrice}
          sliderMode={sliderMode}
          defaultVotePercent={defaultVotePercent}
          post={post}
          postState={postState}
          pendingLike={pendingLike}
          onLikeClick={onLikeClick}
          onShareClick={onShareClick}
          fullMode={true}
        />}

        <Modal
          visible={this.state.moderatorCommentModal}
          title='Write a Comment'
          footer={false}
          onCancel={() => {
            this.setState({ moderatorCommentModal: false })
          }}
          onOk={() => {
            this.setState({ moderatorCommentModal: false })
          }}
        >
          {!post.flagged ? <p>Write an extensive, informative comment, which includes tips to improve value and content quality.</p> : null }

          {post.flagged ? <p>Marked as <em>rejected</em>, make sure to detail the reasons and how the contributor may avoid rejection in the future.</p> : null}

          <CommentForm
            intl={intl}
            parentPost={post}
            username={this.props.user.name}
            isLoading={this.state.showCommentFormLoading}
            inputValue={'\n\n----------------------------------------------------------------------\nNeed help? Write a ticket on https://support.utopian.io.\nChat with us on [Discord](https://discord.gg/uTyJkNm).\n\n**[[utopian-moderator]](https://utopian.io/moderators)**'}
            onSubmit={ /* the current onSubmit does not work because "commentsActions.sendComment().then is not a function" */
              (parentPost, commentValue, isUpdating, originalComment) => {
                this.setState({ showCommentFormLoading: true });

                this.props
                  .sendComment(parentPost, commentValue, isUpdating, originalComment)
                  .then(() => {
                    this.setState({
                      showCommentFormLoading: false,
                      moderatorCommentModal: false,
                      commentFormText: '',
                    });
                  })
                  .catch(() => {
                    this.setState({
                      showCommentFormLoading: false,
                      commentFormText: commentValue,
                    });
                  });
              }}
            onImageInserted={(blob, callback, errorCallback) => {
              const username = this.props.user.name;

              const formData = new FormData();
              formData.append('files', blob);

              fetch(`https://api.utopian.io/api/upload/post`, {
                method: 'POST',
                body: formData,
              })
                .then(res => res.json())
                .then(res => callback(res.secure_url, blob.name))
                .catch(() => errorCallback());
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default StoryFull;
