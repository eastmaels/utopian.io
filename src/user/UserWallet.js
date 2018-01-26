import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserWalletSummary from '../wallet/UserWalletSummary';
import Loading from '../components/Icon/Loading';
import {
  getUser,
  getAuthenticatedUser,
  getAuthenticatedUserName,
  getTotalVestingShares,
  getTotalVestingFundSteem,
  getLoadingGlobalProperties,
  getCurrentMedianHistoryPrice as getSteemRate,
} from '../reducers';
import {
  getGlobalProperties,
} from '../wallet/walletActions';
import { getCurrentMedianHistoryPrice } from '../app/appActions';
import { getAccount } from './usersActions';

@withRouter
@connect(
  (state, ownProps) => ({
    user:
      ownProps.isCurrentUser || ownProps.match.params.name === getAuthenticatedUserName(state)
        ? getAuthenticatedUser(state)
        : getUser(state, ownProps.match.params.name),
    authenticatedUserName: getAuthenticatedUserName(state),
    totalVestingShares: getTotalVestingShares(state),
    totalVestingFundSteem: getTotalVestingFundSteem(state),
    loadingGlobalProperties: getLoadingGlobalProperties(state),
    steemRate: getSteemRate(state),
  }),
  {
    getGlobalProperties,
    getAccount,
    getCurrentMedianHistoryPrice,
  },
)
class Wallet extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    totalVestingShares: PropTypes.string.isRequired,
    totalVestingFundSteem: PropTypes.string.isRequired,
    user: PropTypes.shape().isRequired,
    getGlobalProperties: PropTypes.func.isRequired,
    getAccount: PropTypes.func.isRequired,
    getCurrentMedianHistoryPrice: PropTypes.func.isRequired,
    loadingGlobalProperties: PropTypes.bool.isRequired,
    steemRate: PropTypes.number.isRequired,
    isCurrentUser: PropTypes.bool,
    authenticatedUserName: PropTypes.string,
  };

  static defaultProps = {
    isCurrentUser: false,
    authenticatedUserName: '',
  };

  componentDidMount() {
    const {
      totalVestingShares,
      totalVestingFundSteem,
      user,
      isCurrentUser,
      authenticatedUserName,
      steemRate,
    } = this.props;
    const username = isCurrentUser
      ? authenticatedUserName
      : this.props.location.pathname.match(/@(.*)(.*?)\//)[1];

    if (_.isEmpty(totalVestingFundSteem) || _.isEmpty(totalVestingShares)) {
      this.props.getGlobalProperties();
    }
    if (_.isEmpty(user)) {
      this.props.getAccount(username);
    }

    if (steemRate === 0) {
      this.props.getCurrentMedianHistoryPrice();
    }
  }

  render() {
    const {
      user,
      totalVestingShares,
      totalVestingFundSteem,
      loadingGlobalProperties,
      steemRate,
    } = this.props;

    return (
      <div>
        <UserWalletSummary
          user={user}
          loading={user.fetching}
          totalVestingShares={totalVestingShares}
          totalVestingFundSteem={totalVestingFundSteem}
          loadingGlobalProperties={loadingGlobalProperties}
          steemRate={steemRate.base}
        />
      </div>
    );
  }
}

export default Wallet;
