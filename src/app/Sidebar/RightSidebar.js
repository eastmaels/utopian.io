import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import people from '../../helpers/people';

import {
  getIsAuthenticated,
  getAuthenticatedUser,
  getFollowingList,
} from '../../reducers';

import InterestingPeople from '../../components/Sidebar/InterestingPeople';
import StartNow from '../../components/Sidebar/StartNow';
import SignUp from '../../components/Sidebar/SignUp';

import { Icon } from 'antd';
import GithubConnection from '../../components/Sidebar/GithubConnection';
import SideAnnouncement from '../../components/Sidebar/SideAnnouncement';

import { getUser } from '../../actions/user';
import { getGithubProjects } from '../../actions/projects';


@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    user: getAuthenticatedUser(state),
    authenticatedUser: getAuthenticatedUser(state),
    followingList: getFollowingList(state),
  }),
  {
    getGithubProjects,
    getUser,
  })
export default class RightSidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
    followingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      randomPeople: this.getRandomPeople(),
      loadedProjects: false,
    };
  }

  componentDidUpdate () {
    const { user, getGithubProjects, getUser } = this.props;

    if (user && user.name && !this.state.loadedProjects) {

      this.setState({
        loadedProjects: true,
      });

      getUser(user.name).then(res => {
        if (res.response && res.response.github) {
          getGithubProjects(user.name, true);
        }
      })
    }
  };

  getRandomPeople = () => people
    .reduce((res, item) => {
      if (!this.props.followingList.includes(item)) {
        res.push({ name: item });
      }
      return res;
    }, [])
    .sort(() => 0.5 - Math.random()).slice(0, 5);

  handleRefreshInterestingPeople = () => this.setState({
    randomPeople: this.getRandomPeople(),
  });

  render() {
    const { user } = this.props;

    const InterestingPeopleWithData = () => (
      <InterestingPeople
        users={this.state.randomPeople}
        onRefresh={this.handleRefreshInterestingPeople}
      />
    );

    if (!this.props.authenticated) {
      return (
        <SignUp />
      )
    }

    return (
      <span>
      <SideAnnouncement user={user} />
      <GithubConnection user={user} />
      </span>
    );
  }
}
