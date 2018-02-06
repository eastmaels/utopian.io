/**
 * Proxies SteemConnect calls to the Utopian API. Functions are derived from the
 * sc2 sdk with slight modifications to be compatible with the API.
 */
import Cookie from 'js-cookie';
import request from 'superagent';

function getLoginUrl(state) {
  const host = process.env.STEEMCONNECT_HOST;
  const auth = `${host}/oauth2/authorize`;
  const app = process.env.UTOPIAN_APP;

  const url = encodeURIComponent(process.env.STEEMCONNECT_REDIRECT_URL);
  const redirect = `redirect_uri=${url}`;

  const response = 'response_type=code';
  const clientId = `client_id=${encodeURIComponent(app)}`;
  state = `state=${state ? encodeURIComponent(state) : ''}`;
  const scopes = [
    'vote',
    'comment',
    'comment_delete',
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
  return request.post(endpoint).set('session', session).then(res => {
    return res.body;
  });
}

function updateMetadata(metadata) {
  const endpoint = process.env.UTOPIAN_API + 'sc2/profile';
  const session = Cookie.get('session');
  return request.put(endpoint)
                .send({user_metadata: metadata})
                .set('session', session)
                .then(res => res.body);
}

function broadcast(operations) {
  const endpoint = process.env.UTOPIAN_API + 'sc2/broadcast';
  const session = Cookie.get('session');
  return request.post(endpoint)
                .send({ operations })
                .set('session', session)
                .then(res => res.body);
}

function send(route, method, body, cb) {
  var url = process.env.UTOPIAN_API + route;
  var retP = fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Session: Cookie.get('session')
    },
    body: JSON.stringify(body)
  }).then(function (res) {
    var result = res.json();
    // If the status is something other than 200 we need
    // to reject the result since the request is not considered as a fail
    if (res.status !== 200) {
      return Promise.resolve(result).then(function (result2) {
        return Promise.reject(new SDKError('sc2-sdk error', result2));
      });
    } else if (result.error) {
      return Promise.reject(new SDKError('sc2-sdk error', result));
    }
    return Promise.resolve(result);
  });

  if (!cb) return retP;

  return retP.then(function (ret) {
    if (ret.error) {
      cb(new SDKError('sc2-sdk error', ret), null);
    } else {
      cb(null, ret);
    }
  }, function (err) {
    return cb(new SDKError('sc2-sdk error', err), null);
  });
};

function broadcast_with_cb(operations, cb) {
  return send('broadcast', 'POST', { operations: operations }, cb);
};

function claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests, cb) {
  var params = {
    account: account,
    reward_steem: rewardSteem,
    reward_sbd: rewardSbd,
    reward_vests: rewardVests
  };
  return broadcast_with_cb([['claim_reward_balance', params]], cb);
};

function vote(voter, author, permlink, weight) {
  const params = {
    voter,
    author,
    permlink,
    weight,
  };
  return broadcast([['vote', params]]);
}

function comment(parentAuthor, parentPermlink, author,
                  permlink, title, body, jsonMetadata) {
  const params = {
    parent_author: parentAuthor,
    parent_permlink: parentPermlink,
    author,
    permlink,
    title,
    body,
    json_metadata: JSON.stringify(jsonMetadata),
  };
  return broadcast([['comment', params]]);
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
  return broadcast([['custom_json', params]]);
}

function follow(follower, following) {
  const params = {
    required_auths: [],
    required_posting_auths: [follower],
    id: 'follow',
    json: JSON.stringify(['follow', { follower, following, what: ['blog'] }]),
  };
  return broadcast([['custom_json', params]]);
}

function unfollow(unfollower, unfollowing) {
  const params = {
    required_auths: [],
    required_posting_auths: [unfollower],
    id: 'follow',
    json: JSON.stringify(['follow', { follower: unfollower, following: unfollowing, what: [] }]),
  };
  return broadcast([['custom_json', params]]);
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
  send,
  broadcast_with_cb,
  claimRewardBalance,
  comment,
  vote,
  reblog,
  follow,
  unfollow
};
