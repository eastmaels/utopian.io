import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { injectIntl, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Link } from 'react-router-dom';
import { Tag, Icon, Popover, Tooltip } from 'antd';
import { find } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import RawSlider from "../Slider/RawSlider";
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
import { formatter } from 'steem';
import {
  getComments,
  getCommentsList,
  getCommentsPendingVotes,
  getIsAuthenticated,
  getAuthenticatedUserName,
} from '../../reducers';
import Body from './Body';
import * as ReactIcon from 'react-icons/lib/md';
import StoryFooter from '../StoryFooter/StoryFooter';
import Avatar from '../Avatar';
import Topic from '../Button/Topic';
import PopoverMenu, { PopoverMenuItem } from '../PopoverMenu/PopoverMenu';
import Action from '../../components/Button/Action';
import CommentForm from '../Comments/CommentForm';
import Comments from "../Comments/Comments";
import BanUser from '../../components/BanUser';
import * as commentsActions from '../../comments/commentsActions';
import { Modal } from 'antd';
import { notify } from '../../app/Notification/notificationActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Blog from './Blog';
import Contribution from './Contribution';

import InlineTagEdit from '../Story/InlineTagEdit';

import * as R from 'ramda';
import './StoryFull.less';

const SLIDER_MAXSCORE = 20;

import { QualitySlider } from "../../QualitySliderQuestions";

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
    moderators: PropTypes.array
  };

  static defaultProps = {
    user: {},
    moderatorAction: () => { },
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
      qualitySliderSet: false,
      questionaireResult: 0,
      totalQuestionaireScore: 0,
      questionaireAnswersMissing: true,
      questionaireAnswers: [],
      sliderValue: 0,
      verifyModal: false,
      submitting: false,
      moderatorCommentModal: false,
      shareModal: false,
      reviewsource: 0,
      commentDefaultFooter: '\n\nYou can contact us on [Discord](https://discord.gg/uTyJkNm).\n**[[utopian-moderator]](https://utopian.io/moderators)**',
      commentFormText: '\n\nYou can contact us on [Discord](https://discord.gg/uTyJkNm).\n**[[utopian-moderator]](https://utopian.io/moderators)**',
      modTemplate: '',
      lightbox: {
        open: false,
        index: 0,
      },
    };
  }

  componentDidMount() {
    document.body.classList.add('white-bg');
    this.setState({
      sliderValue: this.state.sliderValue,
    });
    let metaData = this.props.post.json_metadata;
    this.state.questionaireAnswers = metaData.questions || [];
    this.state.sliderValue = metaData.score || 0;
    this.validateQuestionaire();
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

  setModTemplateByName(name) {
    /* Moderator Templates Variable */
    var editImage = "![](https://res.cloudinary.com/hpiynhbhq/image/upload/v1509788371/nbgbomithszxs3nxq6gx.png)";
    var modTemplates = {
      "pendingDefault": 'Your contribution cannot be approved yet. See the [Utopian Rules](https://utopian.io/rules). Please edit your contribution to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingWrongRepo": 'Your contribution cannot be approved yet because it is attached to the wrong repository. Please edit your contribution and fix the repository to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingWrongRepoSpecified": 'Your contribution cannot be approved yet because it is attached to the wrong repository. Please edit your contribution and fix the repository to **`-/-`** to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingPow": 'Your contribution cannot be approved yet because it does not have **proof of work**. See the [Utopian Rules](https://utopian.io/rules). Please edit your contribution and add **proof** (links, screenshots, commits, etc) of your work, to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingTooShort": 'Your contribution cannot be approved yet because it is not as informative as other contributions. See the [Utopian Rules](https://utopian.io/rules). Please edit your contribution and add try to improve the length and detail of your contribution (or add more images/mockups/screenshots), to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingNotEnglish": 'Your contribution cannot be approved yet, because the contribution category you have chosen requires your post to be in English. See the [Utopian Rules](https://utopian.io/rules). Please edit your post if possible, and change the language to English, to reapply for approval.\n\nYou may edit your post [here](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingWrongCategory": 'Your contribution cannot be approved yet, because it is in the **wrong category.** The correct category for your post is `NEW-CATEGORY`. See the [Utopian Rules](https://utopian.io/rules). Please edit your post to use the right category at [this link](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingBadTags": 'Your contribution cannot be approved yet, because it has irrelevant tags. See the [Utopian Rules](https://utopian.io/rules). Please edit your post to use more relevant tags at [this link](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "pendingBanner": 'Your contribution cannot be approved yet, because it has a distracting **banner** or other irrelevant large image. See the [Utopian Rules](https://utopian.io/rules). Please edit your post to exclude any banners, at [this link](https://utopian.io/utopian-io/@' + this.props.post.author + '/' + this.props.post.permlink + '), as shown below: \n' + editImage,
      "flaggedDefault": 'Your contribution cannot be approved because it does not follow the [Utopian Rules](https://utopian.io/rules).',
      "flaggedDuplicate": 'Your contribution cannot be approved because it is a duplicate. It is very similar to a contribution that was already accepted [here](#PLACE-DUPLICATE-LINK-HERE).',
      "flaggedNotOpenSource": 'Your contribution cannot be approved because it does not refer to or relate to an **open-source** repository. See [here](https://opensource.com/resources/what-open-source) for a definition of "open-source."',
      "flaggedSpam": 'Your contribution cannot be approved because it does not follow the [Utopian Rules](https://utopian.io/rules), and is considered as **spam**.',
      "flaggedPlagiarism": 'Your contribution cannot be approved because it does not follow the [Utopian Rules](https://utopian.io/rules), and is considered as **plagiarism**. Plagiarism is not allowed on Utopian, and posts that engage in plagiarism will be flagged and hidden forever.',
      "flaggedTooShort": 'Your contribution cannot be approved because it is not as informative as other contributions. See the [Utopian Rules](https://utopian.io/rules). Contributions need to be informative and descriptive in order to help readers and developers understand them.',
      "flaggedNotEnglish": 'Your contribution cannot be approved because the contribution category you have chosen requires your post to be in English. See the [Utopian Rules](https://utopian.io/rules).'
    }
    this.setState({ modTemplate: name });
    this.setState({ commentFormText: modTemplates[name] + this.state.commentDefaultFooter });
  }
  setModTemplate(event) {
    this.setModTemplateByName(event.target.value);
  }
  tagString(tags) {
    var ret = "";
    for (var i = 0; i < tags.length; ++i) {
      ret += tags[i];
      if (i !== (tags.length - 1)) ret += ", ";
    }
    return ret;
  }

  updateQualitySlider(value)
  {
    this.state.sliderValue = value;
    this.setState({
      sliderValue: value,
      qualitySliderSet: true,
    });

    this.updateQuestionareScore();
  }

  updateQuestionareScore()
  {
    let totalQuestionaireScore = Math.min(100, this.state.questionaireResult + ((SLIDER_MAXSCORE/100)*this.state.sliderValue));
    this.state.totalQuestionaireScore = totalQuestionaireScore;
    this.setState({
      totalQuestionaireScore: totalQuestionaireScore,
    });
  }

  validateQuestionaire()
  {
    let { post } = this.props;

    if(!post || !post.json_metadata)
      return false;

    let metaData = post.json_metadata;
    let postType = metaData.type;
    if(!QualitySlider[postType])
    {
      return false;
    }

    let answeredQuestions = this.state.questionaireAnswers.filter( answeredQuestion => {
      if(answeredQuestion.selected >= 0)
        return true;
      return false;
    });

    if(answeredQuestions.length != QualitySlider[postType].questions.length)
    {
      this.state.questionaireAnswersMissing = true;
      this.setState({
        questionaireAnswersMissing: true,
      });
    }else{
      this.state.questionaireAnswersMissing = false;
      this.setState({
        questionaireAnswersMissing: false,
      });
    }

    let questionaireResult = 0;
    answeredQuestions.forEach( questions => {
      questions.answers.forEach( answer => {
        if(answer.selected)
        {
          questionaireResult += answer.score;
        }
      })

    });
    this.state.questionaireResult = questionaireResult;
    this.setState({
      questionaireResult
    });

    this.updateQuestionareScore();
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

  renderQuestionaire()
  {
    let { post } = this.props;
    if(!post || !post.json_metadata)
      return false;

    let metaData = post.json_metadata;
    let postType = metaData.type;

    if(!QualitySlider[postType])
    {
      return null;
    }

    let questions = QualitySlider[postType].questions.map( (question, qindex) => {
      let options = question.answers.map( (answer, aindex) => {
        return (<option value={aindex}>{answer.answer}</option>);
      });

      return (
        <ul>
          <li>
            <b> {question.question} </b>
          </li>
          <li>
            <select style={{width:"100%", display:"relative", top:0}} defaultValue={(this.state.questionaireAnswers[qindex]? this.state.questionaireAnswers[qindex].selected : -1)} onChange={(event, handler) => {

              let answerIndex = parseInt(event.target.value);
              let answers = question.answers.map((answer, answerId) => {
                let answerData = {
                  value: answer.answer,
                  selected: false,
                  score: answer.value,
                };
                if(answerIndex == answerId)
                {
                  answerData.selected = true;
                }
                return answerData;
              });
              let questionaireAnswers = this.state.questionaireAnswers || [];
              questionaireAnswers[qindex] = {
                question: question.question,
                answers: answers,
                selected: answerIndex,
              };
              this.setState({questionaireAnswers});

              this.validateQuestionaire();

            }}>
              <option value="-1">Please Choose</option>
              {options}
            </select>
          </li>
        </ul>
      );
    });

    return questions;
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

    const reviewed = post.reviewed || false;

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
      // <PopoverMenuItem key="save">
      //   {pendingBookmark ? <Icon type="loading" /> : <i className="iconfont icon-collection" />}
      //   <FormattedMessage
      //     id={postState.isSaved ? 'unsave_post' : 'save_post'}
      //     defaultMessage={postState.isSaved ? 'Unsave post' : 'Save post'}
      //   />
      // </PopoverMenuItem>,
      <PopoverMenuItem key="report">
        <i className="iconfont icon-flag" />
        <FormattedMessage id="report_post" defaultMessage="Report post" />
      </PopoverMenuItem>,
    ];

    const metaData = post.json_metadata;
    const repository = metaData.repository;
    const postType = post.json_metadata.type;
    const alreadyChecked = isModerator && (post.reviewed || post.pending || post.flagged);
    const unreviewed = !post.reviewed && !post.pending && !post.flagged;
    const mobileView = (window.innerWidth <= 736);
    const shortLong = (s, l) => {
      if (mobileView) {
        return s;
      } else {
        return l;
      }
    }
    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      TelegramShareButton,
      WhatsappShareButton,
      PinterestShareButton,
      VKShareButton,
      OKShareButton,
      RedditShareButton,
      TumblrShareButton,
      LivejournalShareButton,
      EmailShareButton,
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');
    const GooglePlusIcon = generateShareIcon('google');
    const LinkedinIcon = generateShareIcon('linkedin');
    const PinterestIcon = generateShareIcon('pinterest');
    const VKIcon = generateShareIcon('vk');
    const OKIcon = generateShareIcon('ok');
    const TelegramIcon = generateShareIcon('telegram');
    const WhatsappIcon = generateShareIcon('whatsapp');
    const RedditIcon = generateShareIcon('reddit');
    const TumblrIcon = generateShareIcon('tumblr');
    const MailruIcon = generateShareIcon('mailru');
    const EmailIcon = generateShareIcon('email');
    const LivejournalIcon = generateShareIcon('livejournal');

    const shareTitle = `${post.title} - Utopian.io`
    const shareUrl = "https://utopian.io/" + post.url;


    return (
      <div className="StoryFull">
        {!reviewed || alreadyChecked ? <div className="StoryFull__review">

          {!alreadyChecked ? <h3>
            <Icon type="safety" /> {!isModerator ? 'Under Review' : 'Review Contribution'}
            <br/>
          </h3> : null}

          {!isModerator ? <p className="StoryFull__reviewP">
            A moderator will review this contribution within 24-48 hours and suggest changes if necessary. This is to ensure the quality of the contributions and promote collaboration inside Utopian.
                {isAuthor ? ' Check the comments often to see if a moderator is requesting for some changes. ' : null}
          </p> : null}

          {isModerator && !alreadyChecked ? <p className="StoryFull__reviewP">
            Hello Moderator. How are you today? <br />
            Please make sure this contribution meets the{' '}<Link to="/rules">Utopian Quality Standards</Link>.<br />
          </p> : null}

          {isModerator && alreadyChecked ?
          <div>
            {!mobileView ?
            <span>
            <h3><center><Icon type="safety" /> Moderation Control </center></h3>
            {<p><b>Moderated By: &nbsp;</b> <Link className="StoryFull__modlink" to={`/@${post.moderator}`}>@{post.moderator}</Link></p>}
            </span>
            :
            <span>
            <h3><center><Icon type="safety" /> Moderation  </center></h3>
            {<p> <b>Mod: &nbsp;</b> <Link className="StoryFull__modlink" to={`/@${post.moderator}`}>@{post.moderator}</Link></p>}
            </span>
            }
          </div>
          : null}

          {isModerator ? <div>
            {!post.flagged && !post.reviewed || (post.reviewed && isModerator.supermoderator === true) ? <Action
              id="hide"
              className={`${mobileView ? 'StoryFull__mobilebtn' : ''}`}
              primary={true}
              tiny={mobileView}
              text={shortLong(<span><Icon type="exclamation-circle"/></span>, <span>Hide Forever</span>)}
              onClick={() => {
                var confirm = window.confirm('Are you sure? Flagging should be done only if this is spam or if the contribution is against the Utopian Rules.')
                if (confirm) {
                  moderatorAction(post.author, post.permlink, user.name, 'flagged').then(() => {
                    this.setState({ reviewsource: 1 })
                    this.setModTemplateByName("flaggedDefault");
                    this.setState({ moderatorCommentModal: true })
                  });
                }
              }}
            /> : null}

            {/*!post.pending && !post.reviewed && <Action
              id="pending"
              className={`${mobileView ? 'StoryFull__mobilebtn' : ''}`}
              primary={true}
              tiny={mobileView}
              text={shortLong(<span><Icon type="sync"/></span>, 'Pending Review')}
              onClick={() => {
                moderatorAction(post.author, post.permlink, user.name, 'pending');
                this.setModTemplateByName("pendingDefault");
                this.setState({ moderatorCommentModal: true })
              }}
            />*/}

            {!post.reviewed && !post.flagged || (isModerator.supermoderator === true) ? <Action
              id="verified"
              className={`${mobileView ? 'StoryFull__mobilebtn' : ''}`}
              primary={true}
              tiny={mobileView}
              text={shortLong(<span><Icon type="check-circle"/></span>, <span>Verify</span>)}
              onClick={() => this.setState({ verifyModal: true })}
            /> : null}

            {!post.reviewed && <span className="floatRight"><BanUser intl={intl} username={post.author}/>&nbsp;&nbsp;</span>}
          </div> : null
          }
        </div> : null}

        <div className="StoryFull__info">
          {!mobileView ?
          <span>
            {post.reviewed && <p><b>Status: &nbsp;</b> <Icon type="check-circle"/>&nbsp; Accepted <span className="smallBr"><br /></span> </p>}
            {post.flagged && <p><b>Status: &nbsp;</b> <Icon type="exclamation-circle"/>&nbsp; Hidden <span className="smallBr"><br /></span> </p>}
            {post.pending && <p><b>Status: &nbsp;</b> <Icon type="sync"/>&nbsp; Pending <span className="smallBr"><br/></span> </p>}
            {unreviewed && <p><b>Status: &nbsp;</b> <Icon type="eye-o"/>&nbsp; Not Reviewed <span className="smallBr"><br/></span> </p>}
          </span>
          :
          <span>
            {post.reviewed && <p> <Icon type="check-circle"/>&nbsp; Accepted <span className="smallBr"><br /></span> </p>}
            {post.flagged && <p> <Icon type="exclamation-circle"/>&nbsp; Hidden <span className="smallBr"><br /></span> </p>}
            {post.pending && <p> <Icon type="sync"/>&nbsp; Pending <span className="smallBr"><br/></span> </p>}
            {unreviewed && <p> <Icon type="eye-o"/>&nbsp; Not Reviewed <span className="smallBr"><br/></span> </p>}
          </span>
          }
        </div>

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
          isModerator={isModerator}
          moderatorAction={moderatorAction}
        />

        {/*postType === 'blog' && <Blog
        showVerified = {post.reviewed}
        showPending = {post.pending}
        showFlagged = {post.flagged}
        showInProgress = { (!(post.reviewed || post.pending || post.flagged)) }
        fullMode={true}
        />*/}

        <Modal
          maskClosable={false}
          visible={this.state.verifyModal}
          title='Does this contribution meet the Utopian Standards?'
          okText={this.state.submitting ? 'Submitting...' : 'Yes, Verify'}
          cancelText='Not yet'
          onCancel={() => {
            var confirm = window.confirm("Would you like to set this post as Pending Review instead?")
            if (confirm) {
              this.setState({ reviewsource: 2 })
              this.setModTemplateByName("pendingDefault");
              this.setState({ moderatorCommentModal: true })
              moderatorAction(post.author, post.permlink, user.name, 'pending');
            }
            this.setState({ verifyModal: false })
          }}
          onOk={() => {
            if(!this.state.qualitySliderSet)
            {
              return window.alert("Please set the quality slider!")
            }
            if(this.state.questionaireAnswersMissing)
            {
              return window.alert("You haven't answered all questions.")
            }
            this.setState({ submitting: true });

            moderatorAction(post.author, post.permlink, user.name, 'reviewed', this.state.questionaireAnswers, this.state.sliderValue).then(() => {
              this.setState({ verifyModal: false });
              this.setState({ submitting: false });
              this.setState({ commentFormText: 'Thank you for the contribution. It has been approved.' + this.state.commentDefaultFooter })
              this.setState({ moderatorCommentModal: true })
            });
          }}
        >
      <p><b>Please fill in the following quesitoniare to rate this contribution</b></p>
      <br /><br /><br /><br />
      {this.state.questionaireAnswersMissing ?
        <p>Please answer all the questions!</p> : null
      }
      {this.renderQuestionaire()}
      <br /><br /><br /><br />
      <b>Score:</b> {this.state.totalQuestionaireScore.toFixed(2)}%<br /><br />
      <b>How would you reate the quality of this post?</b>
       <RawSlider
        initialValue={this.state.sliderValue}
            value={this.state.sliderValue}
            onChange={this.updateQualitySlider.bind(this)}
          />
        </Modal>

        {/* Moderator Comment Modal - Allows for moderator to publish template-based comment after marking a post as reviewed/flagged/pending */}

        <Modal
          visible={this.state.moderatorCommentModal}
          title='Write a Moderator Comment'
          footer={false}
          // okText='Done'
          onCancel={() => {
            var mark = "verified";
            if (post.reviewed) {
              mark = "Verified";
            } else if (post.pending) {
              mark = "Pending Review";
            } else if (post.flagged) {
              mark = "Hidden";
            }
            var makesure = window.confirm("Are you sure you want to mark this post as " + mark + " without writing a moderator comment?")
            if (makesure) {
              this.setState({ moderatorCommentModal: false })
              if ((post.pending) || (post.flagged)) {
                history.push("/all/review");
              }
            }
          }}
          onOk={() => {
            this.setState({ moderatorCommentModal: false })
          }}
        >
          <p>Below, you may write a moderation commment for this post. </p><br />
          {post.reviewed ? <p>Since you marked this contribution as <em>verified</em>, you may simply leave the current comment in place.</p> : null}
          {post.pending && this.state.reviewsource < 2 ? <p>Since you marked this contribution as <em>Pending Review</em>, you should detail what changes (if any) the author should make, or why it couldn't be verified in its current form.</p> : null}
          {post.pending && this.state.reviewsource == 2 ? <p>Since you chose to mark this contribution as <em>Pending Review</em> instead, you should detail what changes (if any) the author should make, or why you changed your mind about verifying it.</p> : null}
          {post.pending ?
            <div onChange={this.setModTemplate.bind(this)}>
              <b>Choose a template, or start editing:</b>
              <ul className="list">
                <li className="list__item"><input type="radio" value="pendingDefault" id="pendingDefault" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingDefault'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingDefault") }} htmlFor="pendingDefault" className="label">Default</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingWrongRepo" id="pendingWrongRepo" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingWrongRepo'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingWrongRepo") }} htmlFor="pendingWrongRepo" className="label">Wrong Repository</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingWrongCategory" id="pendingWrongCategory" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingWrongCategory'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingWrongCategory") }} htmlFor="pendingWrongCategory" className="label">Wrong Category</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingWrongRepoSpecified" id="pendingWrongRepoSpecified" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingWrongRepoSpecified'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingWrongRepoSpecified") }} htmlFor="pendingWrongRepoSpecified" className="label">Wrong Repository (Specify Correct One)</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingPow" id="pendingPow" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingPow'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingPow") }} htmlFor="pendingPow" className="label">Proof of Work Required</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingTooShort" id="pendingTooShort" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingTooShort'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingTooShort") }} htmlFor="pendingTooShort" className="label">Too Short</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingNotEnglish" id="pendingNotEnglish" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingNotEnglish'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingNotEnglish") }} htmlFor="pendingNotEnglish" className="label">Not in English</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingBadTags" id="pendingBadTags" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingBadTags'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingBadTags") }} htmlFor="pendingBadTags" className="label">Irrelevant Tags</label><br /></li>
                <li className="list__item"><input type="radio" value="pendingBanner" id="pendingBanner" name="modTemplate" defaultChecked={this.state.modTemplate === 'pendingBanner'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("pendingBanner") }} htmlFor="pendingBanner" className="label">Banners Present</label><br /></li>
              </ul>
            </div>
            : null}
          {post.flagged ? <p>Since you marked this contribution as <em>flagged</em>, try explaining why the post could not be accepted. </p> : null}
          {post.flagged ?
            <div onChange={this.setModTemplate.bind(this)}>
              <b>Choose a template, or start editing:</b>
              <ul className="list">
                <li className="list__item"><input type="radio" value="flaggedDefault" id="flaggedDefault" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedDefault'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedDefault") }} htmlFor="flaggedDefault" className="label">Default</label><br /></li>
                <li className="list__item"><input type="radio" value="flaggedDuplicate" id="flaggedDuplicate" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedDuplicate'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedDuplicate") }} htmlFor="flaggedDuplicate" className="label">Duplicate Contribution</label><br /></li>
                <li className="list__item"><input type="radio" value="flaggedNotOpenSource" id="flaggedNotOpenSource" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedNotOpenSource'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedNotOpenSource") }} htmlFor="flaggedNotOpenSource" className="label">Not Related to Open-Source</label><br /></li>
                <li className="list__item"><input type="radio" value="flaggedSpam" id="flaggedSpam" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedSpam'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedSpam") }} htmlFor="flaggedSpam" className="label">Spam</label><br /></li>
                <li className="list__item"><input type="radio" value="flaggedPlagiarism" id="flaggedPlagiarism" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedPlagiarism'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedPlagiarism") }} htmlFor="flaggedPlagiarism" className="label">Plagiarism</label><br /></li>
                <li className="list__item"><input type="radio" value="flaggedTooShort" id="flaggedTooShort" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedTooShort'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedTooShort") }} htmlFor="flaggedTooShort" className="label">Too Short</label><br /></li>
                <li className="list__item"><input type="radio" value="flaggedNotEnglish" id="flaggedNotEnglish" name="modTemplate" defaultChecked={this.state.modTemplate === 'flaggedNotEnglish'} className="radio-btn" /> <label onClick={() => { this.setModTemplateByName("flaggedNotEnglish") }} htmlFor="flaggedNotEnglish" className="label">Not in English</label><br /></li>
              </ul>
            </div>
            : null}
          <CommentForm
            intl={intl}
            parentPost={post}
            username={this.props.user.name}
            isLoading={this.state.showCommentFormLoading}
            inputValue={this.state.commentFormText}
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
                if ((post.pending) || (post.flagged)) {
                  history.push("/all/review");
                }
              }}
            onImageInserted={(blob, callback, errorCallback) => {
              const username = this.props.user.name;

              const formData = new FormData();
              formData.append('files', blob);

              fetch(`https://busy-img.herokuapp.com/@${username}/uploads`, {
                method: 'POST',
                body: formData,
              })
                .then(res => res.json())
                .then(res => callback(res.secure_url, blob.name))
                .catch(() => errorCallback());
            }}
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
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <CopyToClipboard text={getShortLink(post)} onCopy={this.handlePostCopy}>
            <span><Icon type="paper-clip" style={{color: "green"}}/> Copy Short Link</span>
          </CopyToClipboard>
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <a href="#" onClick={() => {this.setState({shareModal: true})}}> <ReactIcon.MdShare /> Share</a>
        </h3>
        { this.state.postCopied && <span>&nbsp;&nbsp;&nbsp;&nbsp;Copied</span> }
        <div className="StoryFull__header">
          <Link to={`/@${post.author}`}>
            <Avatar username={post.author} size={60} />
          </Link>
          <div className="StoryFull__header__text">
            <Link to={`/@${post.author}`}>
              {post.author}
              <Tooltip title={intl.formatMessage({ id: 'reputation_score', defaultMessage: 'Reputation score' })}>
                <Tag className="StoryFull__reputationTag">
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
          { (isModerator && !post.json_metadata.moderator.reviewed) || (isModerator && isModerator.supermoderator === true) ?
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
          <b>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</b> <a href="#" onClick={() => {this.setState({shareModal: true})}}><ReactIcon.MdShare /> Share</a>
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
        <Modal
          visible={this.state.shareModal}
          title={"Share this Contribution!"}
          footer={false}
          onCancel={() => {this.setState({shareModal: false})}}
          >
          Click a button below to share this contribution to your favorite social media site!<br/>
          <div className="ShareButtons">
            <span className="ShareButtons__Facebook">
              <FacebookShareButton
                url={shareUrl}
                hashtag={"#IAmUtopian"}
                className="ShareButtons__button ShareButtons__Facebook__btn">
                <a href="#">
                  <FacebookIcon
                    size={32}
                    round />  </a>
              </FacebookShareButton>
            </span><br /><br />
            <span className="ShareButtons__Twitter">
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                via={"utopian_io"}
                hashtags={["utopian-io", "IAmUtopian", "open-source"]}
                className="ShareButtons__button ShareButtons__Twitter__btn">
                <a href="#">
                  <TwitterIcon
                    size={32}
                    round />
                </a>
              </TwitterShareButton>
            </span><br /><br />
            <span className="ShareButtons__LinkedIn">
              <LinkedinShareButton
                url={shareUrl}
                title={shareTitle}
                description={'View this open-source contribution on Utopian.io.'}
                windowWidth={750}
                windowHeight={600}
                className="ShareButtons__button ShareButtons__LinkedIn__btn">
                <a href="#">
                  <LinkedinIcon
                    size={32}
                    round />
                </a>
              </LinkedinShareButton>
            </span><br /><br />
            <span className="ShareButtons__Whatsapp">
              <WhatsappShareButton
                url={shareUrl}
                title={shareTitle}
                separator=":: "
                className="ShareButtons__button">
                <a href="#"><WhatsappIcon size={32} round /></a>
              </WhatsappShareButton>
            </span><br/><br/>
            <span className="ShareButtons__GooglePlus">
              <GooglePlusShareButton
                url={shareUrl}
                className="ShareButtons__button">
                <a href="#"><GooglePlusIcon
                  size={32}
                  round /></a>
              </GooglePlusShareButton>
            </span><br/><br/>
            <span className="ShareButtons__Reddit">
              <RedditShareButton
                url={shareUrl}
                title={shareTitle}
                windowWidth={660}
                windowHeight={460}
                className="ShareButtons__button">
                <a href="#">
                  <RedditIcon
                    size={32}
                    round /></a>
              </RedditShareButton>
            </span><br /><br />
            <span className="ShareButtons__Email">
              <EmailShareButton
                url={shareUrl}
                subject={shareTitle}
                body={`Here's a cool open-source contribution I found on Utopian.io! The link is ${shareUrl}`}
                className="ShareButtons__button">
                <a href="#"><EmailIcon
                  size={32}
                  round /></a>
              </EmailShareButton>
            </span><br /><br />
          </div>
          <br/>
          You can also copy the link directly
          <CopyToClipboard text={getShortLink(post)}
            onCopy={this.handleModalCopy}>
            <a href="#">&nbsp;here.</a>
          </CopyToClipboard>
          <br/>
          { this.state.modalCopied && <span>&nbsp;&nbsp;&nbsp;&nbsp;Copied</span> }
        </Modal>

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
        {reviewed && <StoryFooter
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
      </div>
    );
  }
}

export default StoryFull;
