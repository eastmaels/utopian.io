/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  FormattedRelative,
  FormattedDate,
} from 'react-intl';
import {
  getIsAuthenticated,
  getAuthenticatedUser,
} from '../reducers';
import { getUser, banUser, getBanUser } from '../actions/user';
import './BannedScreen.less';
import Body from '../components/Story/Body';


@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    authenticatedUser: getAuthenticatedUser(state),
  }),
  { banUser, getUser, getBanUser },
)
class BannedScreen extends React.Component {
  static propTypes = {
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
      banReason: 'Violation of the Utopian Rules',
      bannedUntil: new Date(Date.now()),
    };
  }

  componentWillMount() {
    const { authenticatedUser, getBanUser, getUser } = this.props;
    getBanUser(authenticatedUser.name).then((res) => {
      if (res && res.response && res.response.banReason && (res.response.banReason != '<unknown>')) {
        // console.log("BannedScreen.js => compWillMount() => ...");
        this.setState({ banReason: res.response.banReason });
        // console.log(" - banReason: ", res.response.banReason);
      }
      if (res && res.response && res.response.bannedUntil) {
        // console.log(" - bannedUntil: ", Date.parse(res.response.bannedUntil));
        this.setState({ bannedUntil: Date.parse(res.response.bannedUntil) });
      }
      if (res && res.response && (res.response.banned == 1)) {
        if (res.response.bannedUntil && (Date.parse(res.response.bannedUntil) > (new Date(Date.now() + 100)))) {
          this.setState({ isBanned: res.response.banned });
        } else {
          this.setState({ isBanned: 0 });
        }
      }
    });
  }

  render() {
    const { bannedBy, bannedUntil, banReason, banned } = this.props.authenticatedUser;

    if (this.props.redirector === true) {
      if (this.state.isBanned === 1) {
        window.location.href = '/banned';
        return (<span><Icon type="loading" /></span>);
      }
      return (<span />);
    }

    if (!banned) {
      return (<span className="text-center"><Icon type="loading" /></span>);
    }


    return (<div className="main-panel">
      <div className="mt-5 text-center">
        <h2>
          <center><br /><br /><Icon
            type="safety"
            style={{
              fontSize: '100px',
              color: 'red',
              display: 'block',
              clear: 'both',
              textAlign: 'center',
            }}
          /><br />
            You have been banned from posting on Utopian.
          </center>
        </h2>

        <div className="BannedScreen__left_padded">
          <div className="container pb-5">
            You will no longer be allowed to <b>post contributions</b> on Utopian.

            However, you will still be allowed to:
            <ul className="BannedScreen__ul">
              <li>View all Utopian Contributions</li>
              <li>Vote on Utopian Contributions</li>
              <li>Reply/comment to Utopian Contributions</li>
              <li>Access Most of the Utopian Website</li>
            </ul><br /><br />
          </div>

          <div className="container pb-5">
            <b className="BannedScreen_sectitle">
              When does your ban end ?
            </b><br />
            <span>
              <FormattedDate value={bannedUntil} /> (<FormattedRelative value={bannedUntil} />)
            </span>
          </div>

          <div className="container pb-5">
            <b className="BannedScreen_sectitle">
              Why you were banned:
            </b><br />
            Who banned you: <Link to={`@${bannedBy}`}>@{bannedBy}</Link><br />
            Why You were banned: <Body full body={banReason} /><br />
            Feel free to contact the Utopian Moderators <a href="https://discord.gg/5geMSSZ">on Discord</a> for more
            information, or if you would like to appeal against
            your ban.<br />
          </div>
        </div>

      </div>
    </div>);
  }
}

export default BannedScreen;
