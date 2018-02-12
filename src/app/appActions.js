import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { createAction } from 'redux-actions';
import { createAsyncActionType } from '../helpers/stateHelpers';
import { setLocaleMetadata } from '../helpers/metadata';

export const GET_LOCALE = '@app/GET_LOCALE';

export const GET_REWARD_FUND = '@app/GET_REWARD_FUND';
export const GET_REWARD_FUND_START = '@app/GET_REWARD_FUND_START';
export const GET_REWARD_FUND_SUCCESS = '@app/GET_REWARD_FUND_SUCCESS';
export const GET_REWARD_FUND_ERROR = '@app/GET_REWARD_FUND_ERROR';

export const RATE_REQUEST = '@app/RATE_REQUEST';
export const RATE_SUCCESS = '@app/RATE_SUCCESS';

export const SET_LOCALE = '@app/SET_LOCALE';
export const SET_LOCALE_START = '@app/SET_LOCALE_START';
export const SET_LOCALE_SUCCESS = '@app/SET_LOCALE_SUCCESS';
export const SET_LOCALE_ERROR = '@app/SET_LOCALE_ERROR';

export const GET_TRENDING_TOPICS = '@app/GET_TRENDING_TOPICS';
export const GET_TRENDING_TOPICS_START = '@app/GET_TRENDING_TOPICS_START';
export const GET_TRENDING_TOPICS_SUCCESS = '@app/GET_TRENDING_TOPICS_SUCCESS';
export const GET_TRENDING_TOPICS_ERROR = '@app/GET_TRENDING_TOPICS_ERROR';

export const GET_CURRENT_MEDIAN_HISTORY_PRICE = '@app/GET_CURRENT_MEDIAN_HISTORY_PRICE';
export const GET_CURRENT_MEDIAN_HISTORY_PRICE_START = '@app/GET_CURRENT_MEDIAN_HISTORY_PRICE_START';
export const GET_CURRENT_MEDIAN_HISTORY_PRICE_SUCCESS = '@app/GET_CURRENT_MEDIAN_HISTORY_PRICE_SUCCESS';
export const GET_CURRENT_MEDIAN_HISTORY_PRICE_ERROR = '@app/GET_CURRENT_MEDIAN_HISTORY_PRICE_ERROR';

export const GET_CRYPTO_PRICE_HISTORY = createAsyncActionType('@app/GET_CRYPTOS_PRICE_HISTORY');
export const REFRESH_CRYPTO_PRICE_HISTORY = '@app/REFRESH_CRYPTO_PRICE_HISTORY';
export const refreshCryptoPriceHistory = createAction(REFRESH_CRYPTO_PRICE_HISTORY);

export const setLocale = locale =>
  (dispatch) => {
    dispatch({
      type: SET_LOCALE,
      payload: {
        promise: setLocaleMetadata(locale),
      },
    });
  };

export const getRate = () =>
   (dispatch) => {
     dispatch({ type: RATE_REQUEST });
     fetch('https://api.coinmarketcap.com/v1/ticker/steem/')
       .then(res => res.json())
       .then((json) => {
         const rate = json[0].price_usd;
         dispatch({
           type: RATE_SUCCESS,
           rate,
         });
       });
   };


export const getRewardFund = () => (dispatch, getSelection, { steemAPI }) => {
  const getRewardFundAsync = Promise.promisify(steemAPI.getRewardFund, { context: steemAPI });
  return dispatch({
    type: GET_REWARD_FUND,
    payload: { promise: getRewardFundAsync('post') },
  });
};

export const getCurrentMedianHistoryPrice = () => (dispatch, getState, { steemAPI }) => {
  const getCurrentMedianHistoryPriceAsync = Promise.promisify(steemAPI.getCurrentMedianHistoryPrice, { context: steemAPI });
  return dispatch({
    type: GET_CURRENT_MEDIAN_HISTORY_PRICE,
    payload: { promise: getCurrentMedianHistoryPriceAsync() },
  });
};

export const getTrendingTopics = () => (dispatch, getState, { steemAPI }) => {
  const getTrendingTagsAsync = Promise.promisify(steemAPI.getTrendingTags, { context: steemAPI });
  dispatch({
    type: GET_TRENDING_TOPICS,
    payload: {
      promise: getTrendingTagsAsync(undefined, 50)
        .then(result => Object.values(result).map(tag => tag.name).filter(tag => tag !== '')),
    },
  });
};

export const getCryptoPriceHistory = (symbol, refresh = false) => dispatch => {
  if (refresh) {
    dispatch(refreshCryptoPriceHistory(symbol));
  }
  dispatch({
    type: GET_CRYPTO_PRICE_HISTORY.ACTION,
    payload: {
      promise: Promise.all([
        fetch(
          `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=6`,
        ).then(res => res.json()),
        fetch(
          `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=BTC&limit=6`,
        ).then(res => res.json()),
      ]).then(response => {
        const usdPriceHistory = _.get(response, 0, {});
        const btcPriceHistory = _.get(response, 1, {});
        return {
          usdPriceHistory,
          btcPriceHistory,
          symbol,
        };
      }),
    },
  });
};

