import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { injectIntl, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Link } from 'react-router-dom';
import { Tag, Icon, Popover, Tooltip } from 'antd';
import Lightbox from 'react-image-lightbox';
import { formatter } from 'steem';
import Body from './Body';
import StoryFooter from './StoryFooter';
import Avatar from '../Avatar';
import Topic from '../Button/Topic';
import PopoverMenu, { PopoverMenuItem } from '../PopoverMenu/PopoverMenu';
import Action from '../../components/Button/Action';
import { Modal } from 'antd';
import Contribution from './Contribution';

import * as R from 'ramda';
import './StoryFull.less';

@injectIntl
class StoryFull extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    post: PropTypes.shape().isRequired,
    postState: PropTypes.shape().isRequired,
    pendingLike: PropTypes.bool,
    pendingFollow: PropTypes.bool,
    pendingBookmark: PropTypes.bool,
    commentCount: PropTypes.number,
    saving: PropTypes.bool,
    ownPost: PropTypes.bool,
    onFollowClick: PropTypes.func,
    onSaveClick: PropTypes.func,
    onReportClick: PropTypes.func,
    onLikeClick: PropTypes.func,
    onShareClick: PropTypes.func,
    onEditClick: PropTypes.func,
    user: PropTypes.object.isRequired,
    moderatorAction: PropTypes.func.isRequired,
    moderators: PropTypes.array,
  };

  static defaultProps = {
    user: {},
    moderatorAction: () => {},
    moderators: [],
    pendingLike: false,
    pendingFollow: false,
    pendingBookmark: false,
    commentCount: 0,
    saving: false,
    ownPost: false,
    onFollowClick: () => {},
    onSaveClick: () => {},
    onReportClick: () => {},
    onLikeClick: () => {},
    onShareClick: () => {},
    onEditClick: () => {},
    postState: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      verifyModal: false,
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

  handleClick = (key) => {
    switch (key) {
      case 'follow':
        this.props.onFollowClick(this.props.post);
        return;
      case 'save':
        this.props.onSaveClick();
        return;
      case 'report':
        this.props.onReportClick();
        break;
      case 'edit':
        this.props.onEditClick();
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

  render() {
    const {
      intl,
      user,
      post,
      postState,
      pendingLike,
      pendingFollow,
      pendingBookmark,
      commentCount,
      saving,
      ownPost,
      onLikeClick,
      onShareClick,
      moderatorAction,
      moderators,
      history,
    } = this.props;

    const { open, index } = this.state.lightbox;
    const images = post.json_metadata.image;
    const tags = _.union(post.json_metadata.tags, [post.category]);
    const video = post.json_metadata.video;
    const isLogged = Object.keys(user).length;
    const isAuthor = isLogged && user.name === post.author;
    const isModerator = isLogged && R.find(R.propEq('account', user.name))(moderators) && !isAuthor;
    const reviewed = post.reviewed || false;

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
          {post.depth > 1 && <h4>
            <Link to={`/${post.category}/@${post.parent_author}/${post.parent_permlink}`}>
              <FormattedMessage id="post_reply_show_parent_discussion" defaultMessage="Show parent discussion" />
            </Link>
          </h4>}
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
      <PopoverMenuItem key="save">
        {pendingBookmark ? <Icon type="loading" /> : <i className="iconfont icon-collection" />}
        <FormattedMessage
          id={postState.isSaved ? 'unsave_post' : 'save_post'}
          defaultMessage={postState.isSaved ? 'Unsave post' : 'Save post'}
        />
      </PopoverMenuItem>,
      <PopoverMenuItem key="report">
        <i className="iconfont icon-flag" />
        <FormattedMessage id="report_post" defaultMessage="Report post" />
      </PopoverMenuItem>,
    ];

    const metaData = post.json_metadata;
    const repository = metaData.repository;
    const postType = post.json_metadata.type;

    return (
      <div className="StoryFull">
        {!reviewed && <div className="StoryFull__review">
          <h3>
            <Icon type="safety" /> {!isModerator ? 'Under Review' : 'Review Contribution'}
            {isModerator && post.pending ? <div>{' '}<b>Pending Review:</b> @{post.moderator}</div> : null}
            </h3>
          {!isModerator ? <p>
            A moderator will soon review this contribution and suggest changes if necessary. This is to ensure the quality of the contributions and promote collaboration inside Utopian.
              {isAuthor ? ' Check the comments often to see if a moderator is requesting for some changes. ' : null}
          </p> : null}
          {isModerator ? <p>
              Hello Moderator. How are you today? <br />
              Please make sure this contribution meets the{' '}<Link to="/rules">Utopian Quality Standards</Link>.<br/>
              If not please help the user using the comments. <br />
              If the contribution is spam or makes no sense, please flag it to hide it <b>forever</b>.
          </p> : null}
          {isModerator ? <div>
              <Action
                primary={ true }
                text='Hide forever'
                onClick={() => {
                  var confirm = window.confirm('Are you sure? Flagging should be done only if this is spam or if the user is not responding for over 48 hours to your requests.')
                  if (confirm) {
                    moderatorAction(post.author, post.permlink, user.name, 'flagged').then(() => history.push('/all/review'));
                  }
                }}
              />
              {!post.pending && <Action
                primary={ true }
                text='Pending Review'
                onClick={() => {
                  moderatorAction(post.author, post.permlink, user.name, 'pending').then(() => history.push('/all/review'));
                }}
              />}
              <Action
                primary={ true }
                text='Verified'
                onClick={() => this.setState({verifyModal: true})}
              />
            </div> :
            null
          }
        </div>}

        <Contribution
          type={ postType }
          full_name={ repository.full_name }
          platform={ metaData.platform }
          id={ repository.id }
        />

        <Modal
          visible={this.state.verifyModal}
          title='Does this contribution meet the Utopian Standards?'
          okText='Yes, Verify'
          cancelText='Not yet'
          onCancel={() => {
            moderatorAction(post.author, post.permlink, user.name, 'pending');
            this.setState({verifyModal: false})
          }}
          onOk={ () => {
            moderatorAction(post.author, post.permlink, user.name, 'reviewed');
            this.setState({verifyModal: false})
          }}
        >
          <p>By moderating contributions on Utopian <b>you will earn 5% of the total author rewards generated on the platform</b> based on the amount of contributions reviewed.</p>
          <br />
          <ul>
            <li><Icon type="heart" /> This contribution is personal, meaningful and informative.</li>
            <li><Icon type="bulb" /> If it's an idea it is very well detailed and realistic.</li>
            <li><Icon type="smile" /> This is the first and only time this contribution has been shared with the community. </li>
            <li><Icon type="search" /> This contribution is verifiable and provide proof of the work.</li>
            <li><Icon type="safety" /> Read all the rules: <Link to="/rules">Read the rules</Link></li>
          </ul>
          <br />
          <p>If this contribution does not meet the Utopian Standards please advise changes to the user using the comments or leave it unverified. Check replies to your comments often to see if the user has submitted the changes you have requested.</p>
          <p><b>Is this contribution ready to be verified? <Link to="/rules">Read the rules</Link></b></p>
        </Modal>

        {replyUI}

        <h1 className="StoryFull__title">
          {post.title}
        </h1>
        <h3 className="StoryFull__comments_title">
          <a href="#comments">
            <FormattedMessage
              id="comments_count"
              values={{ count: intl.formatNumber(commentCount) }}
              defaultMessage="{count} comments"
            />
          </a>
        </h3>
        <div className="StoryFull__header">
          <Link to={`/@${post.author}`}>
            <Avatar username={post.author} size={60} />
          </Link>
          <div className="StoryFull__header__text">
            <Link to={`/@${post.author}`}>
              {post.author}
              <Tooltip title={intl.formatMessage({ id: 'reputation_score', defaultMessage: 'Reputation score' })}>
                <Tag>
                  {formatter.reputation(post.author_reputation)}
                </Tag>
              </Tooltip>
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
        {open &&
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
        />}
        <div className="StoryFull__topics">
          {tags && tags.map(tag => <Topic key={tag} name={tag} />)}
        </div>
        {reviewed && <StoryFooter
          post={post}
          postState={postState}
          pendingLike={pendingLike}
          onLikeClick={onLikeClick}
          onShareClick={onShareClick}
        />}
      </div>
    );
  }
}

export default StoryFull;
