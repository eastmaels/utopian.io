import React from 'react';

import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { Route, Switch } from 'react-router-dom';
import Wrapper from './Wrapper';
import Settings from './settings/Settings';
import ProfileSettings from './app/ProfileSettings';
import Activity from './activity/Activity';
import Wallet from './wallet/Wallet';
import UserWallet from './user/UserWallet';

import Page from './feed/Page';
import Project from './feed/Project';

import Replies from './replies/Replies';

import User from './user/User';
import GithubConnect from './user/GithubConnect';

import Tags from './tags/Tags';

import Bookmarks from './bookmarks/Bookmarks';

import Donors from './statics/Donors';
import About from './statics/About';
import Help from './statics/Help';
import Rules from './statics/Rules';
import PrivacyPolicy from './statics/PrivacyPolicy';
import TOS from './statics/TOS';
import Sponsors from './statics/Sponsors';
import Moderators from './statics/Moderators';
import WelcomeModerator from './statics/WelcomeModerator';
import PostShortlink from './statics/PostShortlink';
import Faq from './statics/Faq';
import BannedScreen from './statics/BannedScreen';
import Team from './statics/Team';

import Post from './post/Post';
import Write from './post/Write/Write';
import WriteTask from './post/Write/WriteTask';
//import WriteBlog from './post/Write/WriteBlog';
import Drafts from './post/Write/Drafts';

import RequireLogin from './auth/RequireLogin';
import CookiePolicy from './statics/CookiePolicy'; 

import CookiePolicy from './statics/CookiePolicy';

export default (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Page} />
      {/*<Route
        path="/replies"
        render={() => (
          <RequireLogin>
            <Replies />
          </RequireLogin>
        )}
      />*/}
      <Route path="/help" exact component={Help} />
      <Route path="/rules" exact component={Rules} />
      <Route path="/privacy" exact component={PrivacyPolicy} />
      <Route path="/tos" exact component={TOS} />
      {/*
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/tags" component={Tags} />
      <Route path="/donors" component={Donors} />
      */}
      <Route path="/sponsors" exact component={Sponsors} />
      <Route path="/moderators" exact component={Moderators} />
      <Route path="/welcome-moderator" exact component={WelcomeModerator} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/cookies" exact component={CookiePolicy} />
      <Route path="/banned" exact component={BannedScreen} />
      <Route
        path="/bookmarks"
        render={() => (
          <RequireLogin>
            <Bookmarks />
          </RequireLogin>
        )}
      />
      <Route
        exact
        path="/write"
        render={() => (
          <RequireLogin>
            <Write />
          </RequireLogin>
        )}
      />
      <Route
        exact
        path="/write-task/:repoId"
        render={(props) => (
          <RequireLogin>
            <WriteTask {...props} />
          </RequireLogin>
        )}
      />
      {/*<Route
        exact
        path="/write-blog"
        render={(props) => (
          <RequireLogin>
            <WriteBlog {...props} />
          </RequireLogin>
        )}
      />*/}
      <Route
        exact
        path="/drafts"
        render={() => (
          <RequireLogin>
            <Drafts />
          </RequireLogin>
        )}
      />
      <Route
        exact
        path="/activity"
        render={() => (
          <RequireLogin>
            <Activity />
          </RequireLogin>
        )}
      />
      <Route
        exact
        path="/settings"
        render={() => (
          <RequireLogin>
            <Settings />
          </RequireLogin>
        )}
      />
      <Route
        exact
        path="/edit-profile"
        render={() => (
          <RequireLogin>
            <ProfileSettings />
          </RequireLogin>
        )}
      />
      <Route
        exact
        path="/github/callback"
        render={props => (
          <RequireLogin>
            <GithubConnect {...props}/>
          </RequireLogin>
        )}
      />
      <Route
        path="/wallet"
        render={() => (
            <Wallet />
        )}
      />
      <Route path="/@:name" component={User} />
      <Route path="/u/:postId" component={PostShortlink} />
      <Route path="/:category/@:author/:permlink" component={Post} />
      <Route path="/search/:searchSection?/:query?/" exact component={Page} />
      <Route path="/project/:author/:repo/:platform/:repoId/:type?" exact component={Project}/>
      <Route path="/:type?/:filterBy?/:status?" component={Page} />

    </Switch>
  </Wrapper>
);

export const history =
  typeof window === 'undefined' ? createMemoryHistory() : createBrowserHistory();
