import React from 'react';

import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { Route, Switch } from 'react-router-dom';
import Wrapper from './Wrapper';
import Settings from './settings/Settings';
import ProfileSettings from './app/ProfileSettings';
import Activity from './activity/Activity';

import Page from './feed/Page';
import Project from './feed/Project';
import Replies from './replies/Replies';
import User from './user/User';
import GithubConnect from './user/GithubConnect';
import Tags from './tags/Tags';
import Donors from './statics/Donors';
import Post from './post/Post';
import Bookmarks from './bookmarks/Bookmarks';
import About from './statics/About';
import Help from './statics/Help';
import Rules from './statics/Rules';
import Sponsors from './statics/Sponsors';
import Moderators from './statics/Moderators';
import WelcomeModerator from './statics/WelcomeModerator';
import PostShortlink from './statics/PostShortlink';
import Faq from './statics/Faq';
import BannedScreen from './statics/BannedScreen';
import Team from './statics/Team';
import Write from './post/Write/Write';
import WriteTask from './post/Write/WriteTask';
//import WriteBlog from './post/Write/WriteBlog';

import Drafts from './post/Write/Drafts';
import RequireLogin from './auth/RequireLogin';

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
