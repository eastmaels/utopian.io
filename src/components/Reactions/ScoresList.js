import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteSroll from 'react-infinite-scroller';
import { take } from 'lodash';
import { FormattedNumber } from 'react-intl';
import UserCard from '../UserCard';
import USDDisplay from '../Utils/USDDisplay';
import './ReactionsList.less';

export default class ScoresList extends React.Component {
  static propTypes = {
    voters: PropTypes.array,
  };

  static defaultProps = {
    voters: [],
  };

  state = { page: 1 };

  paginate = () => this.setState(prevState => ({ page: prevState.page + 1 }));

  render() {
    const { voters } = this.props;
    const defaultPageItems = 20;
    const noOfItemsToShow = defaultPageItems * this.state.page;

    return (
      <Scrollbars autoHide style={{ height: '400px' }}>
        <InfiniteSroll
          pageStart={0}
          loadMore={this.paginate}
          hasMore={voters.length > noOfItemsToShow}
          useWindow={false}
        >
          <div className="ReactionsList__content">
            {take(voters, noOfItemsToShow).map(voter => (
              <UserCard
                key={voter}
                username={voter}
              />
            ))}
          </div>
        </InfiniteSroll>
      </Scrollbars>
    );
  }
}
