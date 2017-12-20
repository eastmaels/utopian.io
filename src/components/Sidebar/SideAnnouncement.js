import React from 'react';
import Avatar from '../Avatar';
import steem from 'steem';

import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import { Link } from 'react-router-dom';
import Action from '../../components/Button/Action';

import './SideAnnouncement.less';
import { setTimeout } from 'timers';


const SideAnnouncement = ({ user }) => {
  var SHOW_ANNOUNCEMENT_1 = 1;
  var SHOW_ANNOUNCEMENT_2 = 1;
  var SHOW_ANNOUNCEMENT_3 = 1;
  const NUMBER_OF_ANNOUNCEMENTS = () => {return (SHOW_ANNOUNCEMENT_1 + SHOW_ANNOUNCEMENT_2 + SHOW_ANNOUNCEMENT_3);}
  var voting_for_witness = false;
  const witnessCheck = async () => {
    for (var i = 0; i < user.witness_votes.length; ++i) {
        if (user.witness_votes[i] === 'utopian-io') {
            SHOW_ANNOUNCEMENT_1 = 0;
            voting_for_witness = true;
            return;
        }
    }
  }
  witnessCheck();
  if (NUMBER_OF_ANNOUNCEMENTS() >= 1) {
    return (
        <div className="Announcement">
        <div className="Announcement__container">
            <h4 className="Announcement__supertitle"><Icon type="global"/> Announcements</h4>
                <div className="Announcement__divider"/>
                {(SHOW_ANNOUNCEMENT_1 === 1) ? <div id="announcement1" className="Announcement__single">
                <b className="Announcement__subtitle">Witness</b>&nbsp;&nbsp;&nbsp;&nbsp;<span className="Announcement__content">Utopian is now the first community driven STEEM Witness!</span> 
                    &nbsp;&nbsp;<a target="_blank" href={`https://v2.steemconnect.com/sign/account-witness-vote?witness=utopian-io&approve=true&redirect_uri=${window.location.href}`}>Vote for Utopian!</a>
                    {/* <Action
                        id="voteWitness"
                        primary={true}
                        text="Vote for Utopian!"
                        onClick={() => {
                            console.log("Thanks for voting @utopian-io as STEEM Witness! We love you!");
                            window.location.href = `https://v2.steemconnect.com/sign/account-witness-vote?witness=utopian-io&approve=true&redirect_uri=${window.location.href}`;
                        }}
                    /> */}
                </div>
                : null}
                {(SHOW_ANNOUNCEMENT_2 === 1) ?
                <span><br/><br/>
                <div id="announcement2" className="Announcement__single">
                    <b className="Announcement__subtitle">Reddit</b>&nbsp;&nbsp; 
                    <span className="Announcement__content">
                    Utopian now has its own subreddit at <a style={{fontFamily: "monospace"}} target="_blank" href="https://reddit.com/r/utopianio">/r/utopianio</a>!
                    </span>
                </div></span>
                : null}
                {(SHOW_ANNOUNCEMENT_3 === 1) ?
                <span><br/><br/>
                <div id="announcement3" className="Announcement__single">
                <b className="Announcement__subtitle">Charity</b>&nbsp;&nbsp; 
                    <span className="Announcement__content">
                    Utopian is donating to charities! See <a target="_blank" href="https://steemit.com/utopian-io/@utopian-io/utopian-is-donating-computers-and-educational-programs-1k-steem-donated-every-10k-generated">here</a> for more info.
                    </span>
                </div>
                </span>
                : null}
        </div>
        </div>
    )
    } else {
        return (
            <span></span>
        )
    }
}

export default SideAnnouncement;
