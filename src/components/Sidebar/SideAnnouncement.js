import React from 'react';
import Avatar from '../Avatar';

import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Action from '../../components/Button/Action';

import './SideAnnouncement.less';


const SideAnnouncement = ({ user }) => {
  const ANNOUNCEMENT_EXISTS = true;
  if (ANNOUNCEMENT_EXISTS) {
    return (
        <div className="Announcement">
        <div className="Announcement__container">
            <h4 className="Announcement__supertitle"><Icon type="global"/> Announcements</h4>
                <div className="Announcement__divider"/>
                <div id="announcement1" className="Announcement__single">
                    Utopian is now the first community driven STEEM Witness! 
                    
                    <Action
                        id="voteWitness"
                        primary={true}
                        text="Vote for Utopian!"
                        onClick={() => {
                            window.location.href = 'https://v2.steemconnect.com/sign/account-witness-vote?witness=utopian-io&approve=true';
                        }}
                    />
                </div>
                <div id="announcement2" className="Announcement__single">

                </div>
                <div id="announcement3" className="Announcement__single">
                        
                </div>
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
