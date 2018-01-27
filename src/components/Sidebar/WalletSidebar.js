import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getAuthenticatedUser } from '../../reducers';
import Action from '../Button/Action';

@injectIntl
@connect(
  state => ({
    user: getAuthenticatedUser(state),
  }),
)
class WalletSidebar extends React.Component {
  static propTypes = {
    user: PropTypes.shape(),
    isCurrentUser: PropTypes.bool,
    intl: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    user: {},
    isCurrentUser: false,
  };


  render() {

    return (
      <div>
      </div>
    );
  }
}

export default WalletSidebar;
