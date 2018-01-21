import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { getPostContent, getIsFetching, getIsPostEdited } from '../reducers';
import { getContent } from './postActions';
import Comments from '../comments/Comments';
import Loading from '../components/Icon/Loading';
import PostContent from './PostContent';
import RightSidebar from '../app/Sidebar/RightSidebar';
import Affix from '../components/Utils/Affix';
import ScrollToTopOnMount from '../components/Utils/ScrollToTopOnMount';

import * as Actions from '../actions/constants';
import { getContribution, setContribution } from '../actions/contribution';
import * as R from 'ramda';

@connect(
  (state, ownProps) => ({
    edited: getIsPostEdited(state, ownProps.match.params.permlink),
    content: getPostContent(state, ownProps.match.params.author, ownProps.match.params.permlink),
    fetching: getIsFetching(state),
    contributions: state.contributions,
    contribution: state.contribution,
    loading: state.loading,
  }), { getContent, getContribution, setContribution })
export default class Post extends React.Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    edited: PropTypes.bool,
    content: PropTypes.shape(),
    fetching: PropTypes.bool,
    getContent: PropTypes.func,
  };

  static defaultProps = {
    edited: false,
    content: undefined,
    fetching: false,
    getContent: () => {},
  };

  state = {
    commentsVisible: false,
  };

  componentWillMount() {
    const { contribution, contributions, getContribution, setContribution } = this.props;
    const paramAuthor = this.props.match.params.author;
    const paramPermlink = this.props.match.params.permlink;
    const stateContribution = R.find(R.propEq('author', paramAuthor) && R.propEq('permlink', paramPermlink))(contributions);

    if (stateContribution) {
      setContribution(stateContribution);
      return;
    }

    if (
      !Object.keys(contribution).length ||
      (contribution.author !== paramAuthor || contribution.permlink !== paramPermlink)
    ) {
      getContribution(paramAuthor, paramPermlink);
    }
  }


  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const nextLocation = nextProps.location;

    if (location.pathname !== nextLocation.pathname) {
      const { author, permlink } = nextProps.match.params;
      const { contribution, contributions, getContribution, setContribution } = this.props;
      const stateContribution = R.find(R.propEq('author', author) && R.propEq('permlink', permlink))(contributions);

      if (!Object.keys(contribution).length) {
        if (stateContribution) {
          setContribution(stateContribution);
        } else {
          getContribution(author, permlink);
        }
        return;
      }

      if (contribution.author !== author || contribution.permlink !== permlink) {
        if (stateContribution) {
          setContribution(stateContribution);
        } else {
          getContribution(author, permlink);
        }
      }
    }
  }

  componentWillUnmount() {
    if (process.env.IS_BROWSER) {
      global.document.title = 'Utopian';
    }
  }

  handleCommentsVisibility = (visible) => {
    if (visible) {
      this.setState({
        commentsVisible: true,
      });
    }
  };

  render() {
    const { contribution, loading, content, fetching, edited, history, match } = this.props;
    const isLoading = !Object.keys(contribution).length || loading === Actions.GET_CONTRIBUTION_REQUEST;

    return (
      <div className="main-panel">
        <ScrollToTopOnMount />
        <div className="shifted">
          <div className="post-layout container">
            <Affix className="rightContainer" stickPosition={77}>
              <div className="right">
                <RightSidebar match={match}/>
              </div>
            </Affix>
            <div className="center" style={{ paddingBottom: '24px' }}>
              {!isLoading
                ? <PostContent history={history} content={contribution} /> : <Loading />}
              {!isLoading
                && <VisibilitySensor onChange={this.handleCommentsVisibility} />}
              <div id="comments">
                {!isLoading
                  && <Comments show={this.state.commentsVisible} post={contribution} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
