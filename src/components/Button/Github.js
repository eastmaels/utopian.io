import React from 'react';
import { Icon, Tooltip } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import Action from '../Button/Action';
const state = Math.random().toString(36).substring(7);
import './Github.less';

const GithubBtn = ({ disconnect, tooltipTitle }) => (
  <span><Action className="ConnectGithub"
    primary={true}
    compact={true}
    tooltipData={
      {
        title: tooltipTitle,
        placement: 'bottom'
      }
    }
    text={<span><Icon type="github" /> {!disconnect ? 'Sync with Github' : 'Disconnect Github' }</span>}
    onClick={() => {
      if (!disconnect) {
        const GITHUB_AUTH_SCOPE = "public_repo%20read:org";
        window.location.href = `https://github.com/login/oauth/authorize?scope=${GITHUB_AUTH_SCOPE}&client_id=${process.env.UTOPIAN_GITHUB_CLIENT_ID}&redirect_uri=${process.env.UTOPIAN_GITHUB_REDIRECT_URL}&state=${state}`
      } else {
        disconnect();
      }
    }}
  />
  </span>
);

export default GithubBtn
