import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Tooltip } from 'antd';
import Loading from '../components/Icon/Loading';
import USDDisplay from '../components/Utils/USDDisplay';
import './UserWalletSummary.less';


const UserWalletSummary = ({
  user,
}) => (
  <div className="UserWalletSummary">
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-steem UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="steem" defaultMessage="Steem" />
      </div>
      <div className="UserWalletSummary__value">
          <span>
            <FormattedNumber value={parseFloat(user.balance)} />
            {' STEEM'}
          </span>
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-flashlight_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="steem_power" defaultMessage="Steem Power" />
      </div>
      <div className="UserWalletSummary__value">
          <span>
            <FormattedNumber
              value={parseFloat(
                0.0,
              )}
            />
            {' SP '}
          </span>
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-Dollar UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="steem_dollar" defaultMessage="Steem Dollar" />
      </div>
      <div className="UserWalletSummary__value">
          <span>
            <FormattedNumber value={parseFloat(user.sbd_balance)} />
            {' SBD'}
          </span>
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-savings UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="savings" defaultMessage="Savings" />
      </div>
      <div className="UserWalletSummary__value">
          <span>
            <FormattedNumber value={parseFloat(user.savings_balance)} />
            {' STEEM, '}
            <FormattedNumber value={parseFloat(user.savings_sbd_balance)} />
            {' SBD'}
          </span>
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-people_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="est_account_value" defaultMessage="Est. Account Value" />
      </div>
      <div className="UserWalletSummary__value">
          <USDDisplay
            value={0}
          />
      </div>
    </div>
  </div>
);

UserWalletSummary.propTypes = {
  user: PropTypes.shape().isRequired,
};

UserWalletSummary.defaultProps = {
};

export default UserWalletSummary;
