import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import urlParse from 'url-parse';
import {
    getIsAuthenticated,
    getAuthenticatedUser,
  } from '../reducers';
import { getUser, banUser, getBanUser } from '../actions/user'
import './BannedScreen.less';


@connect(
    state => ({
      authenticated: getIsAuthenticated(state),
      authenticatedUser: getAuthenticatedUser(state),
    }),
    { banUser, getUser, getBanUser },
)
class BannedScreen extends React.Component {

    static propTypes = {
        authenticated: PropTypes.bool.isRequired,
        authenticatedUser: PropTypes.shape().isRequired,
        redirector: PropTypes.bool,
      };
    
      static defaultProps = {
          redirector: false,
      };
    
      constructor(props) {
        super(props);
        this.state = {
            isBanned: 0,
            banReason: "Violation of the Utopian Rules",
            bannedUntil: new Date(Date.now()),
        };
      }

  componentWillMount() {
    const { authenticatedUser, getBanUser, getUser } = this.props;
    getBanUser(authenticatedUser.name).then((res) => {
        if (res && res.response && res.response.banReason && (res.response.banReason != "<unknown>")) {
            // console.log("BannedScreen.js => compWillMount() => ...");
            this.setState({banReason: res.response.banReason});
            // console.log(" - banReason: ", res.response.banReason);
        }
        if (res && res.response && res.response.bannedUntil) {
            // console.log(" - bannedUntil: ", Date.parse(res.response.bannedUntil));
            this.setState({bannedUntil: Date.parse(res.response.bannedUntil)});
        }
        if (res && res.response && (res.response.banned == 1)) {
            if (res.response.bannedUntil && (Date.parse(res.response.bannedUntil) > (new Date(Date.now()+100)))) {
                this.setState({isBanned: res.response.banned});
            } else {
                this.setState({isBanned: 0});
            }
        }
    })
  }

  render() {
      // console.log("BannedScreen.js -> render()");
    if (this.props.redirector === true) {
        // console.log("    -> redirector mode");
        if (this.state.isBanned == 1) {
            // console.log("    ==> BANNED, redirecting, state:", this.state);
            window.location.href = "/banned";
            return (<span><Icon type="loading"/></span>);
        } else {
            // console.log("     ==> NOT BANNED, staying, state:", this.state);
            return (<span></span>);
        }
    }

  return (<div className="main-panel">
    <div className="mt-5 text-center">
      <h2>
        <center><br/><br/><Icon type="safety" style={{
                  fontSize: '100px',
                  color: 'red',
                  display: 'block',
                  clear: 'both',
                  textAlign: 'center',
                }}/><br/>
                You have been banned from posting on Utopian.</center>
      </h2>

      <p className="container pb-5">
      <b className="BannedScreen_sectitle">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What can I do?
          </b><br/>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You will no longer be allowed to <b>post contributions</b> on Utopian. 

      However, you will still be allowed to:
      <ul className="BannedScreen__ul">
      <li>View all Utopian Contributions</li>
      <li>Vote on Utopian Contributions</li>
      <li>Reply/comment to Utopian Contributions</li>
      <li>Access Most of the Utopian Website</li>
      </ul><br/><br/>
      </p>

      <p className="container pb-5">
    <b className="BannedScreen_sectitle">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Why was I banned?
      </b><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You were banned by a moderator due to violations of the Utopian Rules. <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The reason listed for your ban is: <em><code className="BannedScreen__code">{this.state.banReason}</code></em>.<br/>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feel free to contact the Utopian Moderators <a href="https://discord.gg/5geMSSZ">on Discord</a> for more information, or if you would like to appeal against your ban.
      </p>  
      
    </div>
  </div>);
  }
}

export default BannedScreen;
