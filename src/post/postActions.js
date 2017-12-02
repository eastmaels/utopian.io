import sc2 from '../sc2';
import Promise from 'bluebird';
import { updateContribution } from '../actions/contribution';
import * as R from 'ramda';

export const GET_CONTENT = 'GET_CONTENT';
export const GET_CONTENT_START = 'GET_CONTENT_START';
export const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
export const GET_CONTENT_ERROR = 'GET_CONTENT_ERROR';

export const LIKE_POST = '@post/LIKE_POST';
export const LIKE_POST_START = '@post/LIKE_POST_START';
export const LIKE_POST_SUCCESS = '@post/LIKE_POST_SUCCESS';
export const LIKE_POST_ERROR = '@post/LIKE_POST_ERROR';

export const getContent = (postAuthor, postPermlink, afterLike) =>
  (dispatch, getState, { steemAPI }) => {
    if (!postAuthor || !postPermlink) {
      return null;
    }
    return dispatch({
      type: GET_CONTENT,
      payload: {
        promise: steemAPI
          .getContentAsync(postAuthor, postPermlink),
      },
      meta: {
        afterLike,
      },
    });
  };

export const votePost = (postId, author, permlink, weight = 10000) => (dispatch, getState) => {
  const { auth, contributions } = getState();
  if (!auth.isAuthenticated) {
    return null;
  }

  const voter = auth.user.name;
  const contribution = R.find(R.propEq('id', postId))(contributions);

  return dispatch({
    type: LIKE_POST,
    payload: {
      promise: sc2
        .vote(voter, contribution.author, contribution.permlink, weight)
        .then((res) => {
          if (window.ga) {
            window.ga('send', 'event', 'vote', 'submit', '', 1);
          }

          // Delay to make sure you get the latest data (unknown issue with API)
          setTimeout(
            () =>
              dispatch(
                updateContribution(contribution.author, contribution.permlink)
              ),
            1000,
          );
          return res;
        }),
    },
    meta: { postId, voter, weight },
  });
};
