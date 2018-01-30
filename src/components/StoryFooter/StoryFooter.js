import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Slider from '../Slider/Slider';
import Payout from './Payout';
import Buttons from './Buttons';
import Confirmation from './Confirmation';
import * as Actions from '../../actions/constants';
import { getHasDefaultSlider, getVoteValue } from '../../helpers/user';
import { getProject, voteWithSponsors } from '../../actions/project';
import { updateContribution } from '../../actions/contribution';
import steem from 'steem';
import * as R from 'ramda';
import Cookie from 'js-cookie';
import './StoryFooter.less';

@connect(
  state => ({
    loading: state.loading,
  }),
  {
    getProject,
    voteWithSponsors,
    updateContribution,
  }
)
class StoryFooter extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    post: PropTypes.shape().isRequired,
    postState: PropTypes.shape().isRequired,
    rewardFund: PropTypes.shape().isRequired,
    currentMedianHistoryPrice: PropTypes.shape().isRequired,
    defaultVotePercent: PropTypes.number.isRequired,
    ownPost: PropTypes.bool,
    sliderMode: PropTypes.oneOf(['on', 'off', 'auto']),
    pendingLike: PropTypes.bool,
    onLikeClick: PropTypes.func,
    onShareClick: PropTypes.func,
    onEditClick: PropTypes.func,
    fullMode: PropTypes.bool,
  };

  static defaultProps = {
    pendingLike: false,
    ownPost: false,
    sliderMode: 'auto',
    onLikeClick: () => {},
    onShareClick: () => {},
    onEditClick: () => {},
    fullMode: false,
  };

  state = {
    sliderVisible: false,
    sliderValue: 100,
    sliderSponsorsValue: 100,
    voteWorth: 0,
    sponsorsVoteWorth: 0,
    voteWithSponsors: false,
    sponsorsAccount: null,
    project: null,
  };

  constructor(props) {
    super(props);
    this.handleVoteWithSponsors = this.handleVoteWithSponsors.bind(this);
  }

  loadSponsorship() {
    const { user, post, getProject, defaultVotePercent, rewardFund, currentMedianHistoryPrice } = this.props;
    const postData = post.json_metadata;
    const repository = postData.repository;
    const repoId = repository.id;
    const isOwner = R.find(R.propEq('id', repoId))(user.repos || []);
    const _self = this;
    if(isOwner && repository.fork !== true) {
      getProject(postData.platform, postData.repository.id).then(res => {
        if (res.status !== 404 && res.response && res.response.name && res.response.sponsorship.enabled === true) {
          const project = res.response;
          const projectAccount = project.steem_account.account;
          steem.api.getAccounts([projectAccount], function(err, accounts) {
            if(!err) {
              const sponsorsAccount = accounts[0];
              if (sponsorsAccount) {
                const sponsorsVote = find(post.active_votes, { voter: sponsorsAccount.name }) || {};
                if (sponsorsVote.percent && sponsorsVote.percent > 0) {
                  _self.setState({
                    project,
                    sliderSponsorsValue: sponsorsVote.percent / 100,
                    sponsorsAccount,
                    sponsorsVoteWorth: getVoteValue(
                      sponsorsAccount,
                      rewardFund.recent_claims,
                      rewardFund.reward_balance,
                      currentMedianHistoryPrice,
                      sponsorsVote.percent / 100 * 100,
                    )
                  });
                } else {
                  _self.setState({
                    project,
                    sliderSponsorsValue: defaultVotePercent / 100,
                    sponsorsAccount,
                    sponsorsVoteWorth: getVoteValue(
                      sponsorsAccount,
                      rewardFund.recent_claims,
                      rewardFund.reward_balance,
                      currentMedianHistoryPrice,
                      defaultVotePercent / 100 * 100,
                    )
                  });
                }
              }
            }
          });
        }
      })
    }
  }

  componentWillMount() {
    const { user, post, defaultVotePercent } = this.props;

    if (post.json_metadata.repository) {
      this.loadSponsorship();
    }

    if (user) {
      const userVote = find(post.active_votes, { voter: user.name }) || {};
      if (userVote.percent && userVote.percent > 0) {
        this.setState({
          sliderValue: userVote.percent / 100,
        });
      } else {
        this.setState({
          sliderValue: defaultVotePercent / 100,
        });
      }
    }
  }

  handleVoteWithSponsors (checkbox) {
    const checked = checkbox.target.checked;

    this.setState({
      voteWithSponsors: checked || false,
    });

  }

  handleLikeClick = () => {
    const { sliderMode, user } = this.props;
    if (sliderMode === 'on' || (sliderMode === 'auto' && getHasDefaultSlider(user))) {
      if (!this.state.sliderVisible) {
        this.setState(prevState => ({ sliderVisible: !prevState.sliderVisible }));
      }
    } else {
      this.props.onLikeClick(this.props.post, this.props.postState);
    }
  };

  handleLikeConfirm = () => {
    const { voteWithSponsors, updateContribution } = this.props;
    const { post } = this.props;
    const postData = post.json_metadata;
    this.setState({ sliderVisible: false }, () => {
      if (!this.state.voteWithSponsors) {
        this.props.onLikeClick(this.props.post, this.props.postState, this.state.sliderValue * 100);
      } else {
        voteWithSponsors(post.author, post.permlink, postData.platform, postData.repository.id, this.state.sliderSponsorsValue * 100).then(() => {
          setTimeout(() => updateContribution(post.author, post.permlink), 1000);
        }).catch(() => setTimeout(() => updateContribution(post.author, post.permlink), 1000))
      }
    });
  };

  handleShareClick = () => this.props.onShareClick(this.props.post);

  handleEditClick = () => this.props.onEditClick(this.props.post);

  handleSliderCancel = () => this.setState({ sliderVisible: false });

  handleSliderChange = (value) => {
    const { user, rewardFund, currentMedianHistoryPrice } = this.props;
    const { sponsorsAccount } = this.state;

    if (!this.state.voteWithSponsors) {
      const voteWorth = getVoteValue(
        user,
        rewardFund.recent_claims,
        rewardFund.reward_balance,
        currentMedianHistoryPrice,
        value * 100,
      );
      this.setState({ sliderValue: value, voteWorth });
    } else {
      const sponsorsVoteWorth = getVoteValue(
        sponsorsAccount,
        rewardFund.recent_claims,
        rewardFund.reward_balance,
        currentMedianHistoryPrice,
        value * 100,
      );
      this.setState({ sliderSponsorsValue: value, sponsorsVoteWorth });
    }
  };

  render() {
    const { post, postState, pendingLike, loading, ownPost, defaultVotePercent, fullMode } = this.props;

    return (
      <div className="StoryFooter">
        <div className="StoryFooter__actions">
          <Payout post={post} fullMode={fullMode}/>
          {this.state.sliderVisible && (
            <Confirmation onConfirm={this.handleLikeConfirm} onCancel={this.handleSliderCancel} />
          )}
          {!this.state.sliderVisible && (
            <Buttons
              post={post}
              postState={postState}
              pendingLike={pendingLike || loading === Actions.VOTE_WITH_SPONSORS_REQUEST}
              ownPost={ownPost}
              defaultVotePercent={defaultVotePercent}
              onLikeClick={this.handleLikeClick}
              onShareClick={this.handleShareClick}
              onEditClick={this.handleEditClick}
            />
          )}
        </div>
        {this.state.sliderVisible && this.state.project ? <div>
            <label>
              <input type="checkbox" id="voteSponsors" defaultChecked={this.state.voteWithSponsors} onChange={this.handleVoteWithSponsors}/> Vote with sponsors account
            </label>
          </div> : null}
        {this.state.sliderVisible && (
          <Slider
            value={this.state.voteWithSponsors ? this.state.sliderSponsorsValue : this.state.sliderValue}
            voteWorth={this.state.voteWithSponsors ? this.state.sponsorsVoteWorth : this.state.voteWorth}
            onChange={this.handleSliderChange}
          />
        )}
      </div>
    );
  }
}

export default StoryFooter;
