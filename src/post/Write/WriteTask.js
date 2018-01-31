import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import kebabCase from 'lodash/kebabCase';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';
import 'url-search-params-polyfill';
import { injectIntl } from 'react-intl';
import GetBoost from '../../components/Sidebar/GetBoost';

import {
  getAuthenticatedUser,
  getDraftPosts,
  getIsEditorLoading,
  getIsEditorSaving,
} from '../../reducers';

import * as Actions from '../../actions/constants';
import { createPost, saveDraft, newPost } from './editorActions';
import { getUser } from '../../actions/user';
import { notify } from '../../app/Notification/notificationActions';
import EditorTask from '../../components/Editor/EditorTask';
import Affix from '../../components/Utils/Affix';
import BannedScreen from '../../statics/BannedScreen';


import { getGithubRepo } from '../../actions/project';

const version = require('../../../package.json').version;

// @UTOPIAN
import { getBeneficiaries } from '../../actions/beneficiaries';
import { getReposByGithub} from '../../actions/projects';
import GithubConnection from '../../components/Sidebar/GithubConnection';

@injectIntl
@withRouter
@connect(
  state => ({
    user: getAuthenticatedUser(state),
    draftPosts: getDraftPosts(state),
    loading: getIsEditorLoading(state),
    saving: getIsEditorSaving(state),
    submitting: state.loading,
    repo: state.repo,
  }),
  {
    createPost,
    saveDraft,
    newPost,
    notify,
    getBeneficiaries,
    getGithubRepo,
    getUser,
    getReposByGithub,
  },
)
class Write extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
    draftPosts: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    saving: PropTypes.bool,
    location: PropTypes.shape().isRequired,
    newPost: PropTypes.func,
    createPost: PropTypes.func,
    saveDraft: PropTypes.func,
    notify: PropTypes.func,
  };

  static defaultProps = {
    saving: false,
    newPost: () => {},
    createPost: () => {},
    saveDraft: () => {},
    notify: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      initialTitle: '',
      initialTopics: [],
      initialReward: '50',
      initialType: '',
      initialBody: '',
      initialRepository: null,
      isUpdating: false,
      parsedPostData: null,
      banned: false,
    };
  }

  componentWillMount () {
    const { getUser, user } = this.props;
    getUser(user.name).then(res => {
      if (user.banned === 1) {
        this.setState({banned: true});
      }
    });
    
    const { match, getGithubRepo } = this.props;
    const { repoId } = match.params;

    getGithubRepo(repoId);

  }

  loadGithubData() {
    const {  user,getUser, getReposByGithub} = this.props;
    getUser(user.name).then(res => {
      if (res.response && res.response.github) {
        getReposByGithub(user.name, true);
      }
    });
  }

  componentDidMount() {
    this.props.newPost();
    const { draftPosts, location: { search }} = this.props;
    const draftId = new URLSearchParams(search).get('draft');
    const draftPost = draftPosts[draftId];

    if (draftPost) {
      const { jsonMetadata, isUpdating } = draftPost;
      let tags = [];
      if (isArray(jsonMetadata.tags)) {
        tags = jsonMetadata.tags;
      }

      if (draftPost.permlink) {
        this.permlink = draftPost.permlink;
      }

      if (draftPost.originalBody) {
        this.originalBody = draftPost.originalBody;
      }

      // eslint-disable-next-line
      this.setState({
        initialTitle: draftPost.title || '',
        initialTopics: tags || [],
        initialReward: draftPost.reward || '50',
        initialType: jsonMetadata.type || 'ideas',
        initialBody: draftPost.body || '',
        isUpdating: isUpdating || false,
        initialRepository: jsonMetadata.repository,
      });
    }
    this.loadGithubData();
  }

  proceedSubmit = (data) => {
    const { getBeneficiaries } = this.props;
    const { location: { search } } = this.props;
    const id = new URLSearchParams(search).get('draft');
    if (id) {
      data.draftId = id;
    };

    const extensions = [[0, {
      beneficiaries: [
        {
          account: 'utopian.pay',
          weight: 2500
        }
      ]
    }]];

    const contributionData = {
      ...data,
      extensions
    };

    console.log("CONTRIBUTION DATA", contributionData);

    this.props.createPost(contributionData);

    /* getBeneficiaries(data.author).then(res => {
      if (res.response && res.response.results) {
        let utopianAssignedWeight = 0;
        const beneficiariesArr = [];
        const allBeneficiaries = res.response.results;

        allBeneficiaries.forEach((beneficiary, index) => {
          let assignedWeight = 0;
          if (beneficiary.vesting_shares) { // this is a sponsor
            const sponsorSharesPercent = beneficiary.percentage_total_vesting_shares;
            // 20% of all the rewards dedicated to sponsors
            const sponsorsDedicatedWeight = 2000;
            assignedWeight = Math.round((sponsorsDedicatedWeight * sponsorSharesPercent ) / 100);

            if (!beneficiary.opted_out && beneficiary.account !== 'utopian-io') {
              beneficiariesArr.push({
                account: beneficiary.account,
                weight: assignedWeight || 1
              });
            } else {
              utopianAssignedWeight = utopianAssignedWeight + assignedWeight;
            }
          } else {
            // this is a moderator
            const moderatorSharesPercent = beneficiary.percentage_total_rewards_moderators;
            // 5% all the rewards dedicated to moderators
            // This does not sum up. The total ever taken from an author is 20%
            const moderatorsDedicatedWeight = 500;
            assignedWeight = Math.round((moderatorsDedicatedWeight * moderatorSharesPercent ) / 100);

            beneficiariesArr.push({
              account: beneficiary.account,
              weight: assignedWeight || 1
            });
          }

          if (index + 1 === allBeneficiaries.length) {
            if (utopianAssignedWeight > 0) {
              beneficiariesArr.push({
                account: 'utopian-io',
                weight: utopianAssignedWeight || 1
              })
            }

            const extensions = [[0, {
              beneficiaries: beneficiariesArr
            }]];

            const contributionData = {
              ...data,
              extensions
            };

            console.log("CONTRIBUTION DATA", contributionData);

            this.props.createPost(contributionData);
          }
        });
      } else {
        alert("Something went wrong. Please try again!")
      }
    }); */
  };

  onSubmit = (form) => {
    const data = this.getNewPostData(form);
    const { location: { search } } = this.props;
    const id = new URLSearchParams(search).get('draft');
    if (id) {
      data.draftId = id;
    };

    this.proceedSubmit(data);
  };

  getNewPostData = (form) => {
    const data = {
      body: form.body,
      title: form.title,
    };

    data.parentAuthor = '';
    data.author = this.props.user.name || '';

    const tags = [process.env.UTOPIAN_CATEGORY, ...form.topics];

    const users = [];
    const userRegex = /@([a-zA-Z.0-9-]+)/g;
    const links = [];
    const linkRegex = /\[.+?]\((.*?)\)/g;
    const images = [];
    const imageRegex = /!\[.+?]\((.*?)\)/g;
    let matches;

    const postBody = data.body;

    // eslint-disable-next-line
    while ((matches = userRegex.exec(postBody))) {
      if (users.indexOf(matches[1]) === -1) {
        users.push(matches[1]);
      }
    }

    // eslint-disable-next-line
    while ((matches = linkRegex.exec(postBody))) {
      if (links.indexOf(matches[1]) === -1 && matches[1].search(/https?:\/\//) === 0) {
        links.push(matches[1]);
      }
    }

    // eslint-disable-next-line
    while ((matches = imageRegex.exec(postBody))) {
      if (images.indexOf(matches[1]) === -1 && matches[1].search(/https?:\/\//) === 0) {
        images.push(matches[1]);
      }
    }

    if (data.title && !this.permlink) {
      data.permlink = kebabCase(data.title);
    } else {
      data.permlink = this.permlink;
    }

    if (this.state.isUpdating) data.isUpdating = this.state.isUpdating;

    const metaData = {
      community: 'utopian',
      app: `utopian/${version}`,
      format: 'markdown',
      repository: form.repository,
      platform: 'github', // @TODO @UTOPIAN hardcoded
      type: form.type,
    };

    if (tags.length) {
      metaData.tags = tags;
    }
    if (users.length) {
      metaData.users = users;
    }
    if (links.length) {
      metaData.links = links;
    }
    if (images.length) {
      metaData.image = images;
    }

    data.parentPermlink = process.env.UTOPIAN_CATEGORY; // @UTOPIAN forcing category
    data.jsonMetadata = metaData;

    if (this.originalBody) {
      data.originalBody = this.originalBody;
    }

    return data;
  };

  handleImageInserted = (blob, callback, errorCallback) => {
    const { formatMessage } = this.props.intl;
    this.props.notify(
      formatMessage({ id: 'notify_uploading_image', defaultMessage: 'Uploading image' }),
      'info',
    );
    const formData = new FormData();
    formData.append('files', blob);

    fetch(`https://busy-img.herokuapp.com/@${this.props.user.name}/uploads`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => callback(res.secure_url, blob.name))
      .catch(() => {
        errorCallback();
        this.props.notify(
          formatMessage({
            id: 'notify_uploading_iamge_error',
            defaultMessage: "Couldn't upload image",
          }),
        );
      });
  };

  saveDraft = debounce((form) => {
    const repoId = this.props.match.params.repoId;
    const data = this.getNewPostData(form);
    const postBody = data.body;
    const { location: { search } } = this.props;
    let id = new URLSearchParams(search).get('draft');

    // Remove zero width space
    const isBodyEmpty = postBody.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().length === 0;

    if (isBodyEmpty) return;

    let redirect = false;

    if (id === null) {
      id = Date.now().toString(16);
      redirect = true;
    }

    data.jsonMetadata.repository = this.props.repo;

    this.props.saveDraft({ postData: data, id, repoId, type: 'task'}, redirect);
  }, 400);

  render() {
    const { initialTitle, initialTopics, initialType, initialBody, initialRepository, initialReward } = this.state;
    const { user, loading, saving, submitting, repo, match } = this.props;
    const isSubmitting = submitting === Actions.CREATE_CONTRIBUTION_REQUEST || loading;
    // this.loadGithubData();
    if (!Object.keys(repo).length || (repo && repo.id !== parseInt(match.params.repoId))) {
      return null;
    }


    return (
      <div className="shifted">
        <div className="post-layout container">
        <BannedScreen redirector={true}/>
          <Affix className="rightContainer" stickPosition={77}>
            <div className="right">
              <GithubConnection user={user} />
            </div>
          </Affix>
          <div className="center">
            <EditorTask
              ref={this.setForm}
              saving={saving}
              repository={initialRepository || repo}
              title={initialTitle}
              topics={initialTopics}
              reward={initialReward}
              type={initialType}
              body={initialBody}
              loading={isSubmitting}
              isUpdating={this.state.isUpdating}
              onUpdate={this.saveDraft}
              onSubmit={this.onSubmit}
              onImageInserted={this.handleImageInserted}
            />
          </div>
        </div>
      </div>
    );
  }
  }

export default Write;
