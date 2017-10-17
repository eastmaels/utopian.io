import React from 'react';
import { connect } from 'react-redux';
import { createSponsor } from '../actions/sponsor';
import { getSponsors } from '../actions/sponsors';
import * as Actions from '../actions/constants';
import { Link } from 'react-router-dom';

import { Modal, Icon } from 'antd';
import './Sponsors.less';

@connect(
  (state, ownProps) => ({
    sponsors: state.sponsors,
    loading: state.loading,
  }), { createSponsor, getSponsors })
class Sponsors extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      sponsorModal: false
    };
  }

  componentWillMount () {
    const { getSponsors } = this.props;
    getSponsors();
  }

  render () {
    const { createSponsor, loading, sponsors } = this.props;
    const isLoading = loading === Actions.CREATE_SPONSOR_SUCCESS;

    return (
      <div className="main-panel help-section">
        <div className="container text-center my-5">
          <div className="Sponsors">
            <div className="Sponsors__intro">
              <h1>The Utopian Sponsors <Icon type="heart" /> The Open Source World!</h1>
              <p>Our sponsors have delegated their Steem Power to Utopian. Utopian uses the delegated Steem Power to upvote the best Open Source contributions.</p>
              <div
                className="Sponsors__intro-delegate"
                onClick={() => this.setState({sponsorModal: true})}>
                DELEGATE
              </div>
            </div>
            <div className="Sponsors__heroes">
              <h2>HEROES</h2>
              {sponsors.map(sponsor => {
                const VS = sponsor.vesting_shares;
                const picture = `https://img.busy.org/@${sponsor.account}?s=72`;
                const username = sponsor.account;
                return (
                  <div key={username} className="Sponsors__heroes-hero">
                    <Link to={`/@${username}`}>
                      <img className="picture" src={picture} />
                      <b className="account">{username}</b>
                    </Link>
                    <div><b>Delegated:</b> {Math.round(VS / 2057)} Steem Power</div>
                  </div>
                )
              })}
            </div>

            <Modal
              visible={this.state.sponsorModal}
              title='Become an Utopian Sponsor!'
              okText={isLoading ? <Icon type="loading"/> : 'Proceed to SteemConnect'}
              cancelText='Later'
              onCancel={() => this.setState({sponsorModal: false})}
              onOk={ () => {
                const account = this.account.value;
                const sp = this.sp.value;

                if (!account) {
                  alert("Please enter your Steem account. E.g. @youraccount");
                  return;
                }

                if (!sp || sp < 10) {
                  alert("Please enter the amount of Steem Power you wish to delegate. Minimum is 10 SP.");
                  return;
                }

                createSponsor(account).then(res => {
                  if (res.status === 500 || res.status === 404) {
                    alert(res.message);
                  } else {
                    window.location.href=`https://v2.steemconnect.com/sign/delegate-vesting-shares?delegator=${account}&delegatee=utopian-io&vesting_shares=${sp}%20SP`;
                    this.setState({sponsorModal: false});
                  }
                });
              }}
            >
              <p>
                You can become an <b>Utopian Sponsor</b> by delegating your <b>Steem Power</b>.
                Utopian will give you credit on <b>every promotional activity, official news and on the dedicated sponsor sections</b>.
                Delegating means that you are lending your Steem Power to Utopian for as long as you wish and have it back at any time.
                <br /><br />
                <b>Utopian uses the delegated Steem Power to upvote the best contributions on the platform</b>,
                so you are actually contributing to the <b>Whole Open Source World</b>.
                <br /><br />
                Delegation happens through <b>SteemConnect</b>, where <b>your credentials are safe</b> being a tool maintained by Steemit itself.
                <br /><br />
              </p>
              <form className="Sponsors__form">
                <label htmlFor="account">Your Steem account</label>
                <input id="account" type="text" name="account" placeholder="e.g. @youraccount" ref={input => this.account = input} />
                <label htmlFor="sp">Steem Power to delegate, minimum is ten (10.000)</label>
                <input id="sp" type="number" min="10" placeholder="e.g. 1000.000" ref={input => this.sp = input}/>
              </form>
              <p style={{'font-size': '12px'}}>You can un-delegate anytime. Enter 0 in the field above.</p>
            </Modal>
          </div>
        </div>
      </div>
    )
  }

}

export default Sponsors;
