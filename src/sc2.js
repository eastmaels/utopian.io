/**
 * Proxies SteemConnect calls to the Utopian API. Functions are derived from the
 * sc2 sdk with slight modifications to be compatible with the API.
 */
import Cookie from 'js-cookie';
import request from 'superagent';

function getLoginUrl(state) {
  const host = process.env.STEEMCONNECT_HOST;
  const auth = `${host}/oauth2/authorize`;

  const url = encodeURIComponent(process.env.STEEMCONNECT_REDIRECT_URL);
  const redirect = `redirect_uri=${url}`;

  const response = 'response_type=code';
  const utopianAppId = process.env.UTOPIAN_APP || 'utopian.app';
  const clientId = `client_id=${utopianAppId}`;
  state = `state=${state ? encodeURIComponent(state) : ''}`;
  const scopes = [
    'vote',
    'comment',
    'delete_comment',
    'comment_options',
    'custom_json',
    'claim_reward_balance',
    'offline'
  ].join(',');
  const scope = `scope=${encodeURIComponent(scopes)}`;
  return `${auth}?${clientId}&${response}&${redirect}&${state}&${scope}`;
}

function profile() {
  const endpoint = process.env.UTOPIAN_API + 'sc2/profile';
  const session = Cookie.get('session');
  const headers = {
    session,
    'x-api-key-id': process.env.AWS_KEY_ID,
    'x-api-key': process.env.AWS_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  return request.post(endpoint).set(headers).then(res => {
    return res.body;
  });
}

function updateMetadata(metadata) {
  const endpoint = process.env.UTOPIAN_API + 'sc2/profile';
  const session = Cookie.get('session');
  const headers = {
    session,
    'x-api-key-id': process.env.AWS_KEY_ID,
    'x-api-key': process.env.AWS_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  return request.put(endpoint)
                .send({user_metadata: metadata})
                .set(headers)
                .then(res => res.body);
}

function broadcast(what = 'post', operations, cb) {
  const endpoint = process.env.UTOPIAN_API + 'sc2/broadcast';
  const session = Cookie.get('session');
  const headers = {
    session,
    'x-api-key-id': process.env.AWS_KEY_ID,
    'x-api-key': process.env.AWS_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (!cb) {
    return request.post(endpoint)
                  .send({ operations, type: what })
                  .set(headers)
                  .then(res => res.body);
  } else {
    return request.post(endpoint)
                  .send({ operations, type: what })
                  .set(headers)
                  .then(function (ret) {
                        if (ret.error) {
                          cb(new SDKError('sc2-sdk error', ret), null);
                        } else {
                          cb(null, ret);
                        }
                      }, function (err) {
                        return cb(new SDKError('sc2-sdk error', err), null);
                      });
  }
}

function claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests, cb) {
  var params = {
    account: account,
    reward_steem: rewardSteem,
    reward_sbd: rewardSbd,
    reward_vests: rewardVests
  };
  return broadcast('claim_reward_balance', [['claim_reward_balance', params]], cb);
};

function vote(voter, author, permlink, weight) {
  const params = {
    voter,
    author,
    permlink,
    weight,
  };
  return broadcast('vote', [['vote', params]]);
}

function comment(parentAuthor, parentPermlink, author,
                  permlink, title, body, jsonMetadata, isUpdating = false) {
  const operations = [];
  const commentOp = [
    'comment',
    {
      parent_author: parentAuthor,
      parent_permlink: parentPermlink,
      author,
      permlink,
      title,
      body,
      json_metadata: JSON.stringify(jsonMetadata),
    },
  ];

  operations.push(commentOp);

  if (!isUpdating) {
    const extensions = [[0, {
      beneficiaries: [
        {
          account: 'utopian.pay',
          weight: 1500
        }
      ]
    }]];
    const commentOptionsConfig = {
      author,
      permlink,
      allow_votes: true,
      allow_curation_rewards: false,
      extensions,
      percent_steem_dollars: 10000,
      max_accepted_payout: '1000000.000 SBD',
    };
    operations.push(['comment_options', commentOptionsConfig]);
  }

  return broadcast('comment', operations);
};

function reblog(account, author, permlink) {
  const params = {
    required_auths: [],
    required_posting_auths: [account],
    id: 'follow',
    json: JSON.stringify([
      'reblog',
      {
        account,
        author,
        permlink,
      },
    ]),
  };
  return broadcast('reblog', [['custom_json', params]]);
}

function follow(follower, following) {
  const params = {
    required_auths: [],
    required_posting_auths: [follower],
    id: 'follow',
    json: JSON.stringify(['follow', { follower, following, what: ['blog'] }]),
  };
  return broadcast('follow', [['custom_json', params]]);
}

function unfollow(unfollower, unfollowing) {
  const params = {
    required_auths: [],
    required_posting_auths: [unfollower],
    id: 'follow',
    json: JSON.stringify(['follow', { follower: unfollower, following: unfollowing, what: [] }]),
  };
  return broadcast('unfollow', [['custom_json', params]]);
}

function sign(name, params, redirectUri) {
  const host = process.env.STEEMCONNECT_HOST;
  let url = `${host}/sign/${name}?`;
  url += Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  url += redirectUri ? `&redirect_uri=${encodeURIComponent(redirectUri)}` : '';
  return url;
};

module.exports = {
  getLoginUrl,
  sign,
  profile,
  updateMetadata,
  broadcast,
  claimRewardBalance,
  comment,
  vote,
  reblog,
  follow,
  unfollow
};