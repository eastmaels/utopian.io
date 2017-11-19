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
import CommentForm from '../../components/Comments/CommentForm'; 
import Comments from "../../components/Comments/Comments";
import * as commentsActions from '../../comments/commentsActions';
import { Modal } from 'antd';

import Blog from './Blog';
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
    sendComment: PropTypes.func,
    user: PropTypes.object.isRequired,
    moderatorAction: PropTypes.func.isRequired,
    moderators: PropTypes.array
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
    sendComment: () => {},
    postState: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      verifyModal: false,
      moderatorCommentModal: false,
      reviewsource: 0,
      commentDefaultFooter: '\n\nYou can contact us on [Discord](https://discord.gg/4NYhZU6).\n**[[utopian-moderator]](https://utopian.io/moderators)**',
      commentFormText: '\n\nYou can contact us on [Discord](https://discord.gg/4NYhZU6).\n**[[utopian-moderator]](https://utopian.io/moderators)**',
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

    setModTemplateByName(name) {
      /* Moderator Templates Variable */
      var modTemplates = {
        "pendingDefault":'Your contribution cannot be approved yet. See the [Utopian Rules](https://utopian.io/rules). Please edit your contribution to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n<center>![](https://res.cloudinary.com/hpiynhbhq/image/upload/v1511026194/jpmpzo8nf3xnooogpr3u.png)</center>',
        "pendingWrongRepo": 'Your contribution cannot be approved yet because it is attached to the wrong repository. Please edit your contribution and fix the repository to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n<center>![](https://res.cloudinary.com/hpiynhbhq/image/upload/v1511026194/jpmpzo8nf3xnooogpr3u.png)</center>', 
        "pendingPow": 'Your contribution cannot be approved yet because it does not have **proof of work**. See the [Utopian Rules](https://utopian.io/rules). Please edit your contribution and add **proof** (links, screenshots, commits, etc) of your work, to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n<center>![](https://res.cloudinary.com/hpiynhbhq/image/upload/v1511026194/jpmpzo8nf3xnooogpr3u.png)</center>',
        "flaggedDefault": 'Your contribution cannot be approved because it does not follow the [Utopian Rules](https://utopian.io/rules).',
        "flaggedDuplicate": 'Your contribution cannot be approved because it is a duplicate. It is very similar to a contribution that was already accepted [here](https://utopian.io/#PLACE-DUPLICATE-LINK-HERE).',
        "flaggedNotOpenSource": 'Your contribution cannot be approved because it does not refer to or relate to an **open-source** repository. See [here](https://opensource.com/resources/what-open-source) for a definition of "open-source."',
        "flaggedSpam": 'Your contribution cannot be approved because it does not follow the [Utopian Rules](https://utopian.io/rules), and is considered as **spam**.'
      }
      this.setState({modTemplate: name});
      this.setState({commentFormText: modTemplates[name] + this.state.commentDefaultFooter});
    }
    setModTemplate(event) { 
      this.setModTemplateByName(event.target.value);
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
    const alreadyChecked = isModerator && (post.reviewed || post.pending || post.flagged);


    return (
      <div className="StoryFull">
        {!reviewed || alreadyChecked ? <div className="StoryFull__review">

            {!alreadyChecked ? <h3>
                <Icon type="safety" /> {!isModerator ? 'Under Review' : 'Review Contribution'}
              </h3>: null}

            {!isModerator ? <p>
                A moderator will review this contribution within 24-48 hours and suggest changes if necessary. This is to ensure the quality of the contributions and promote collaboration inside Utopian.
                {isAuthor ? ' Check the comments often to see if a moderator is requesting for some changes. ' : null}
              </p> : null}

            {isModerator && !alreadyChecked ? <p>
                Hello Moderator. How are you today? <br />
                Please make sure this contribution meets the{' '}<Link to="/rules">Utopian Quality Standards</Link>.<br/>
              </p> : null}

            {isModerator && alreadyChecked ? <div>
                <h3><Icon type="safety" /> Moderation Status</h3>
                {post.reviewed && <p><b>ACCEPTED BY:</b> @{post.moderator}</p>}
                {post.flagged && <p><b>HIDDEN BY:</b> @{post.moderator}</p>}
                {post.pending && <p><b>PENDING REVIEW:</b> @{post.moderator}</p>}
              </div> : null}

            {isModerator ? <div>
                {!post.flagged && <Action
                  id="hide"
                  primary={ true }
                  text='Hide forever'
                  onClick={() => {
                    var confirm = window.confirm('Are you sure? Flagging should be done only if this is spam or if the user has not been responding for over 48 hours to your requests.')
                    if (confirm) {
                      moderatorAction(post.author, post.permlink, user.name, 'flagged').then(() => history.push('/all/review'));
                      this.setState({reviewsource: 1})
                      this.setState({modTemplate: "flaggedDefault"});
                      this.setState({moderatorCommentModal: true})
                    }
                  }}
                />}
                {!post.pending && !post.reviewed && <Action
                  id="pending"
                  primary={ true }
                  text='Pending Review'
                  onClick={() => {
                    moderatorAction(post.author, post.permlink, user.name, 'pending').then(() => history.push('/all/review'));
                    this.setState({modTemplate: "pendingDefault"});
                    this.setState({moderatorCommentModal: true})
                  }}
                />}

                {!post.reviewed && <Action
                  id="verified"
                  primary={ true }
                  text='Verified'
                  onClick={() => this.setState({verifyModal: true})}
                />}
              </div> : null
            }

          </div> : null}

        {repository && <Contribution
          type={ postType }
          repository={ repository }
          platform={ metaData.platform }
          id={ repository.id }
        />}

        {postType === 'blog' && <Blog />}

        <Modal
          visible={this.state.verifyModal}
          title='Does this contribution meet the Utopian Standards?'
          okText='Yes, Verify'
          cancelText='Not yet'
          onCancel={() => {
            var confirm = window.confirm("Would you like to set this post as Pending Review instead?")
            if (confirm) {
              moderatorAction(post.author, post.permlink, user.name, 'pending');
              this.setState({reviewsource: 2})
              this.setState({modTemplate: "pendingDefault"});
              this.setState({moderatorCommentModal: true})
            }
            this.setState({verifyModal: false})
          }}
          onOk={ () => {
            moderatorAction(post.author, post.permlink, user.name, 'reviewed');
            this.setState({verifyModal: false})
            this.setState({ commentFormText: 'Thank you for the contribution. It has been approved.' + this.state.commentDefaultFooter })
            this.setState({moderatorCommentModal: true})
          }}
        >
          <p>By moderating contributions on Utopian <b>you will earn 5% of the total author rewards generated on the platform</b> based on the amount of contributions reviewed.</p>
          <br />
          <ul>
            <li><Icon type="heart" /> This contribution is personal, meaningful and informative.</li>
            <li><Icon type="bulb" /> If it's an idea it is very well detailed and realistic.</li>
        {postType !== 'tutorials' && postType !== 'video-tutorials' ?
            <li><Icon type="smile" /> This is the first and only time this contribution has been shared with the community. </li> : null
        }
            <li><Icon type="search" /> This contribution is verifiable and provides proof of the work.</li>
            <li><Icon type="safety" /> Read all the rules: <Link to="/rules">Read the rules</Link></li>
          </ul>
          <br />
          <p>If this contribution does not meet the Utopian Standards please advise changes to the user using the comments or leave it unverified. Check replies to your comments often to see if the user has submitted the changes you have requested.</p>
          <p><b>Is this contribution ready to be verified? <Link to="/rules">Read the rules</Link></b></p>
        </Modal>

        {/* Moderator Comment Modal - Allows for moderator to publish template-based comment after marking a post as reviewed/flagged/pending */}
        
        <Modal
          visible={this.state.moderatorCommentModal}
          title='Write a Moderator Comment'
          footer={false}
          // okText='Done' 
          onCancel={() => {
            this.setState({moderatorCommentModal: false})
          }}
          onOk={ () => {
            this.setState({moderatorCommentModal: false})
          }}
        >
          <p>Below, you may write a moderation commment for this post. </p><br/> 
          {post.reviewed ? <p>Since you marked this contribution as <em>verified</em>, you may simply leave the current comment in place.</p> : null}
          {post.pending && this.state.reviewsource < 2 ? <p>Since you marked this contribution as <em>Pending Review</em>, you should detail what changes (if any) the author should make, or why it couldn't be verified in its current form.</p> : null}
          {post.pending && this.state.reviewsource == 2 ? <p>Since you chose to mark this contribution as <em>Pending Review</em> instead, you should detail what changes (if any) the author should make, or why you changed your mind about verifying it.</p> : null}
          {post.pending ? 
            <div onChange={this.setModTemplate.bind(this)}>
            <ul class="list">
              <li class="list__item"><input type="radio" value="pendingDefault" id="pendingDefault" name="modTemplate" checked={this.state.modTemplate === 'pendingDefault'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("pendingDefault")}} for="pendingDefault" class="label">Default</label><br/></li>
              <li class="list__item"><input type="radio" value="pendingWrongRepo" id="pendingWrongRepo" name="modTemplate" checked={this.state.modTemplate === 'pendingWrongRepo'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("pendingWrongRepo")}} for="pendingWrongRepo" class="label">Wrong Repository</label><br/></li>
              <li class="list__item"><input type="radio" value="pendingPow" id="pendingPow" name="modTemplate" checked={this.state.modTemplate === 'pendingPow'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("pendingPow")}} for="pendingPow" class="label">Proof of Work Required</label><br/></li>
            </ul>
            </div>
          : null}
          {post.flagged ? <p>Since you marked this contribution as <em>flagged</em>, try explaining why the post could not be accepted. </p> : null}
          {post.flagged ?
            <div onChange={this.setModTemplate.bind(this)}>
            <ul class="list">
              <li class="list__item"><input type="radio" value="flaggedDefault" id="flaggedDefault" name="modTemplate" checked={this.state.modTemplate === 'flaggedDefault'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("flaggedDefault")}} for="flaggedDefault" class="label">Default</label><br/></li>
              <li class="list__item"><input type="radio" value="flaggedDuplicate" id="flaggedDuplicate" name="modTemplate" checked={this.state.modTemplate === 'flaggedDuplicate'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("flaggedDuplicate")}} for="flaggedDuplicate" class="label">Duplicate Contribution</label><br/></li>
              <li class="list__item"><input type="radio" value="flaggedNotOpenSource" id="flaggedNotOpenSource" name="modTemplate" checked={this.state.modTemplate === 'flaggedNotOpenSource'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("flaggedNotOpenSource")}} for="flaggedNotOpenSource" class="label">Not Related to Open-Source</label><br/></li>
              <li class="list__item"><input type="radio" value="flaggedSpam" id="flaggedSpam" name="modTemplate" checked={this.state.modTemplate === 'flaggedSpam'} class="radio-btn"/> <label onClick={() => {this.setModTemplateByName("flaggedSpam")}} for="flaggedSpam" class="label">Spam</label><br/></li>
            </ul>
            </div>
          : null}
          <CommentForm 
        intl={intl}
        parentPost={post}
        username={this.props.user.name}
        isLoading={this.state.showCommentFormLoading}
        inputValue={this.state.commentFormText}
        onSubmit = {() => {}} /* onSubmit, onImageInserted to be fixed in future commit */
        onImageInserted = {() => {}}
          />
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
        {metaData.pullRequests && metaData.pullRequests.length > 0 ?
          <div>
            <h3><Icon type="github"/> Linked Pull Requests</h3>
            <ul>
              {metaData.pullRequests.map(pr => (
                <li key={pr.id}>
                  <a target="_blank" href={pr.html_url}>{pr.title}</a>
                </li>
              ))}
            </ul>
          </div> : null}
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
