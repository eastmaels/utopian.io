import React from 'react';
import Avatar from '../Avatar';

import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Action from '../../components/Button/Action';

import './SideAnnouncement.less';
import { setTimeout } from 'timers';


const SideAnnouncement = ({ user }) => {
  const NUMBER_OF_ANNOUNCEMENTS = 1;
  if (NUMBER_OF_ANNOUNCEMENTS >= 1) {
    return (
        <div className="Announcement">
        <div className="Announcement__container">
            <h4 className="Announcement__supertitle"><Icon type="global"/> Announcements</h4>
                <div className="Announcement__divider"/>
                <div id="announcement1" className="Announcement__single">
                <b className="Announcement__subtitle">Witness</b>&nbsp;&nbsp;&nbsp;&nbsp;<span className="Announcement__content">Utopian is now the first community driven STEEM Witness!</span> 
                    
                    <Action
                        id="voteWitness"
                        primary={true}
                        text="Vote for Utopian!"
                        onClick={() => {
                            console.log("Thanks for voting @utopian-io as STEEM Witness! We love you!");
                            window.location.href = 'https://v2.steemconnect.com/sign/account-witness-vote?witness=utopian-io&approve=true';
                        }}
                    />
                </div>
                {(NUMBER_OF_ANNOUNCEMENTS >= 2) ?
                <span><br/><br/>
                <div id="announcement2" className="Announcement__single">
                    <b className="Announcement__subtitle"></b>&nbsp;&nbsp; 
                </div></span>
                : null}
                {(NUMBER_OF_ANNOUNCEMENTS >= 3) ?
                <span><br/><br/>
                <div id="announcement3" className="Announcement__single">
                    <b className="Announcement__subtitle"></b>&nbsp;&nbsp;
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
