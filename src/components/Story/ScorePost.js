import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Collapse, Tooltip } from 'antd';
import { find } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getIsAuthenticated,
} from '../../reducers';
import Avatar from '../Avatar';
import Action from '../../components/Button/Action';
import StoryFooter from '../StoryFooter/StoryFooter';
import * as commentsActions from '../../comments/commentsActions';
import ScoreModal from '../Reactions/ScoreModal';
import { notify } from '../../app/Notification/notificationActions';
import { injectIntl, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import * as R from 'ramda';
import './ScorePost.less';

const Panel = Collapse.Panel;

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
class ScorePost extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    post: PropTypes.shape().isRequired,
    postState: PropTypes.shape().isRequired,
    saving: PropTypes.bool,
    ownPost: PropTypes.bool,
    sendComment: PropTypes.func,
    moderatorAction: PropTypes.func.isRequired,
    scoreContribution: PropTypes.func.isRequired,
    moderators: PropTypes.array
  };

  static defaultProps = {
    user: {},
    moderatorAction: () => {},
    scoreContribution: () => {},
    moderators: [],
    saving: false,
    ownPost: false,
    sendComment: () => {},
    postState: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      hasScored: false,
      totalQuestionaireScore: 0,
      questionaireAnswersMissing: true,
      questionaireAnswers: [],
      verifyModal: false,
      wasReserved: false,
      moderatorCommentModal: false,
      scoreModalVisible: false,
      scoreModalVoters: [],
      shareModal: false,
      modTemplate: '',
    };
  }

  componentDidMount() {
    document.body.classList.add('white-bg');
  }

  componentWillUnmount() {
    document.body.classList.remove('white-bg');
  }

  validateQuestionaire()
  {
    let { post } = this.props;

    if(!post || !post.json_metadata)
      return false;

    let metaData = post.json_metadata;

    let answeredQuestions = this.state.questionaireAnswers;

    if(answeredQuestions.length != metaData.config.questions.length)
    {
      this.setState({questionaireAnswersMissing: true});
    }else{
      this.setState({questionaireAnswersMissing: false});
    }
  }

  renderQuestionaire()
  {
    const { post, user } = this.props;
    if(!post || !post.json_metadata)
      return false;

    const metaData = post.json_metadata;
    const questionnaire = metaData.config && metaData.config.questions ? metaData.config.questions : false;

    if(!questionnaire)
    {
      return null;
    }

    let questions = questionnaire.map( (question, qindex) => {
      let options = question.answers.map( (answer, aindex) => {
        return (<option value={aindex}>{answer.answer}</option>);
      });

      return (
        <ul>
          <li key={question.question_id}>
            <h5>{question.question}</h5>
          </li>
          <li>
            <select style={{width:"100%", display:"relative", top:0}} defaultValue={(this.state.questionaireAnswers[qindex]? this.state.questionaireAnswers[qindex].selected : -1)} onChange={(event, handler) => {

              let answerIndex = parseInt(event.target.value);
              let questionaireAnswers = this.state.questionaireAnswers || [];

              if (answerIndex === -1 && questionaireAnswers[qindex]) {
                questionaireAnswers.splice(qindex, 1);
                this.setState({questionaireAnswers});
                this.validateQuestionaire();
                return;
              }

              question.answers.forEach((answer, answerId) => {
                if(answerIndex == answerId) {
                  questionaireAnswers[qindex] = {
                    question_id: question.question_id,
                    answer_id: answer.answer_id,
                  };
                }

                if (answerId === question.answers.length - 1) {
                  this.setState({questionaireAnswers});
                  this.validateQuestionaire();
                }
              });

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

  renderMostRated (mostRated, configQuestions) {
    if (!mostRated.length) {
      return <div>No results so far.</div>
    }

    return (
      <ul>
        {mostRated.map(q => {
          const questionId = q.question_id;
          const answerId = q.answer_id;
          const voters = q.voters;
          const question = R.find(R.propEq('question_id', questionId))(configQuestions);
          const answer = R.find(R.propEq('answer_id', answerId))(question.answers);

          return (
            <li key={q.question_id}>
              <h5>{question.question}</h5>
              <p>{answer.answer}</p>
              <ul onClick={() => {
                this.setState({scoreModalVisible: true})
                this.setState({scoreModalVoters: voters})
              }}>
                {voters.map((voter, iVoter) => {
                  if (iVoter < 4) {
                    return(
                      <li key={voter}>
                        <Avatar username={voter} size={20}/>
                      </li>
                    )
                  }
                  return null;
                })}
                {voters.length > 0 ? <li><span>+{voters.length}</span></li> : null}
              </ul>
            </li>
          )
        })}
      </ul>
    )

  }

  render() {
    const {
      user,
      post,
      postState,
      pendingLike,
      rewardFund,
      currentMedianHistoryPrice,
      ownPost,
      sliderMode,
      defaultVotePercent,
      onLikeClick,
      onShareClick,
      scoreContribution,
      moderators,
    } = this.props;
    const isLogged = Object.keys(user).length;
    const isAuthor = isLogged && user.name === post.author;
    const inModeratorsObj = R.find(R.propEq('account', user.name))(moderators);
    const isModerator = isLogged && inModeratorsObj && !isAuthor ? inModeratorsObj : false;
    const isPending = post.pending === true || false;
    const isPendingReviewer = isModerator && isModerator.account === user.name && isPending;
    const isProcessing = this.state.processing;
    const metaData = post.json_metadata;
    const repository = metaData.repository;
    const configQuestions = metaData.config.questions;
    const mostRated = metaData.questions && metaData.questions.most_rated ? metaData.questions.most_rated : [];
    const hasScored = this.state.hasScored || (metaData.questions && metaData.questions.voters && metaData.questions.voters.indexOf(user.name) > -1 || false);
    const canScore = isLogged && post.cashout_time !== '1969-12-31T23:59:59' && !hasScored && !ownPost;

    return (
      <div className="ScorePost">
        {isProcessing ? <div className="processing"><span>Processing{' '}</span><Icon type="loading"/></div> : null}

        <div>

          {post.flagged ? <div className={`StoryFull__info rejected`}>
            <span>
              {post.flagged && <p> <Icon type="exclamation-circle"/>&nbsp; Rejected by <Link to={`/@${post.moderator}`}>@{post.moderator}</Link><span className="smallBr"><br /></span> </p>}
            </span>
            </div> : null}

            <div>
            <h1><Link to={`/${post.parent_permlink}/@${post.author}/${post.permlink}`}>{post.title}</Link></h1>
          </div>

          <div className="StoryFull__score">
            <span><Icon type="star"/>{' '}Score</span><span>{metaData.score !== null && metaData.score !== undefined && !post.flagged  ? metaData.score : '0'}</span>
          </div>

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
          </div>
        </div>

        <Collapse defaultActiveKey={[canScore ? '2' : '1']}>
          <Panel header="Most rated" key="1">
            {this.renderMostRated(mostRated, configQuestions)}
          </Panel>
          {canScore && !hasScored ? <Panel header="Rate now" key="2">
              {post.flagged ? <p>Marked as <b>rejected</b>. Rating it won't affect the score.</p> : null}

              {this.renderQuestionaire()}

              <Action
                primary
                disabled={isProcessing}
                text={isProcessing ? <Icon type="loading"/> : isPendingReviewer ? 'Review and score' : 'Rate now!'}
                onClick={ () => {
                  if(this.state.questionaireAnswersMissing) {
                    return window.alert("You haven't answered all questions. Please make sure to answer all the questions!")
                  }

                  const confirm = window.confirm("Once your rate has been submitted it cannot be changed. Make sure to have properly filled the quality questionnaire before proceeding. Are you sure you want to proceed?");

                  if (confirm) {
                    const isOwner = R.find(R.propEq('id', repository.id))(user.repos || []);
                    this.setState({ processing: true });

                    scoreContribution(post.author, post.permlink, user.name, isOwner ? true : false, this.state.questionaireAnswers).then(() => {
                      this.setState({ processing: false, hasScored: true });
                    });
                  }
                }}
              />
            </Panel> : null }
        </Collapse>

        {this.state.scoreModalVisible && this.state.scoreModalVoters.length > 0 ?
          <ScoreModal
            visible={this.state.scoreModalVisible}
            voters={this.state.scoreModalVoters}
            onClose={() => this.setState({scoreModalVisible: false})}
          /> : null}

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

      </div>
    );
  }
}

export default ScorePost;
