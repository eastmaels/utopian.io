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
            <h4 className="Announcement__title"><Icon type="global"/> Announcements</h4>
                <br/>Utopian is now the first community driven STEEM Witness! 
                
                <Action
                id="voteWitness"
                primary={true}
                text={<a href="https://v2.steemconnect.com/sign/account-witness-vote?witness=utopian-io&approve=true" target="_blank">Vote for Utopian!</a>}
                onClick={() => {
                    console.log("Voting for Witness!");
                }}
                />
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
