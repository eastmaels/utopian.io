import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { injectIntl, FormattedMessage, FormattedNumber } from 'react-intl';
import _ from 'lodash';
import urlParse from 'url-parse';

import {
  getIsAuthenticated,
  getAuthenticatedUser,
} from '../reducers';
import { getModerators } from '../actions/moderators';
import { moderatorAction } from '../actions/contribution';
import Action from './Button/Action';
import { getUser, banUser } from '../actions/user'
import * as R from 'ramda';
import './BanUser.less';


@connect(
    state => ({
      authenticated: getIsAuthenticated(state),
      authenticatedUser: getAuthenticatedUser(state),
      moderators: state.moderators,
    }),
    { banUser, getUser, getModerators },
)
@injectIntl
class BanUser extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
    username: PropTypes.shape().isRequired,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      showBanModal: false,
      banned: 0,
      banReason: "Violation of the Utopian Rules",
    };
  }

  componentWillMount () {
    const { getModerators, getUser, username } = this.props;
    getModerators();
    getUser(username).then((res) => {
        const user = res.response;
        // console.log("TESTLOG", user);
        if (user && user.banned) {
            this.setState({banned: user.banned});
        } else {
            this.setState({banned: 0});
        }
        if (user && user.banReason && (user.banReason !== "<unknown>")) {
            this.setState({banReason: user.banReason});
        } else {
            this.setState({banReason: "Violation of the Utopian Rules"});
        }
    });
  }

  handleClick = (e) => {

  };

  componentDidMount() {
    //   console.log(this.props.username);
  }

  user () {
      const { getUser } = this.props;
      return getUser(this.props.username);
  }

  isModerator () {
    const { moderators, authenticatedUser } = this.props;
    return R.find(R.propEq('account', authenticatedUser.name))(moderators)
  }

  startBanUser (banned) {
      const { banUser, username, authenticatedUser} = this.props;
      var reason = "<unknown>";
      if (banned == 1) reason = this.state.banReason;
      banUser(username, banned, authenticatedUser.name, reason);
      console.log(`/BAN ${username} set to ${banned} by ${authenticatedUser.name} for ${reason}`);
  }

  bannedText () {
      if (this.state.banned == 0) {
          return (<span><b>not banned.</b><span> This means the user is allowed to take normal actions on Utopian.</span></span>);
      } else if (this.state.banned == 1) {
          return (<span><b>banned from posting.</b><span> This means the user will be unable to post contributions on Utopian. </span></span>);
      }
      return (<span><em>not recorded in the database yet.</em></span>);
  }

  actionText () {
      if (this.state.banned == 0 ) {
        return (this.props.intl.formatMessage({
            id: 'banuser',
            defaultMessage: 'Ban User',
        }));
      } else {
        return (this.props.intl.formatMessage({
            id: 'unbanuser',
            defaultMessage: 'Unban User',
        }));
      }
  }
    okText(capitalize = true) {
        if (this.state.banned == 0) {
            if (!capitalize) return "ban";
            return "Ban";
        } else {
            if (!capitalize) return "unban";
            return "Unban";
        }
    }

    setReason(x) {
        this.setState({banReason: x});
    }


  render() {
    if (this.isModerator()) { return (
      <span>
    <Action
            negative={(this.state.banned === 0)}
            positive={(this.state.banned !== 0)}
            style={{ margin: '5px 0' }}
            text={this.actionText()}
            onClick={() => {this.setState({showBanModal: true})}}
    />
    <Modal
              visible={this.state.showBanModal}
              title={`${this.okText(true)} this user?`}
              okText={this.okText()}
              cancelText={'Cancel'}
              onCancel={() => this.setState({showBanModal: false})}
              onOk={ () => {
                  var confirm = window.confirm("Are you sure you would like to " + this.okText(false) + " this user?")
                  if (confirm) {
                      var newstate = 1;
                      if (this.state.banned == 0) {
                          newstate = 1;
                      } else {
                          newstate = 0;
                          this.setState({banReason: "Violation of the Utopian Rules"});
                      }
                      this.startBanUser(newstate);
                      this.setState({showBanModal: false}, () => {this.setState({banned: newstate});});
                  }
              }}
            >
    <span>
    <p>This user is currently {this.bannedText()} <br/>Would you like to {this.okText(false)} this user?</p>
    {(this.state.banned == 1) && <span>The previous reason for banning was: <em className="prevReason">{this.state.banReason}</em></span>}
    {(this.state.banned == 0) && <span><br/><h4><center>Ban Reason:</center></h4><center><textarea name="modInput" rows="5" cols="55" className="modInput" id="modInput" value={this.state.banReason} onChange={(e) => {this.setReason(e.target.value)}}/></center></span>}
    </span>
    </Modal>      </span>
    ); }
    else { return (
        <span>
            </span>
    );}
  }
}

export default BanUser;
