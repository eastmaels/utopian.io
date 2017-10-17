import React from 'react';
import steemApi from '../steemAPI';
import { connect } from 'react-redux';
import { createSponsor } from '../actions/sponsor';
import { getSponsors } from '../actions/sponsors';
import * as Actions from '../actions/constants';

import { Modal, Icon } from 'antd';
import './Sponsors.less';

@connect(
  (state, ownProps) => ({
    sponsors: state.sponsors,
    loading: state.loading,
  }), { createSponsor, getSponsors })
class Sponsors extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      sponsorModal: false
    };
  }

  componentWillMount () {
    console.log(steemApi)
    steemApi.getVestingDelegations('utopian-io', -1, 100, function(err, result) {
      console.log(err, result);
    });
  }

  render () {
    const { createSponsor, loading } = this.props;
    const isLoading = loading === Actions.CREATE_SPONSOR_SUCCESS;
    const account = 'elear';
    return (
      <section className="Sponsors">
        <span onClick={() => this.setState({sponsorModal: true})}>DELEGATE</span>
        <Modal
          visible={this.state.sponsorModal}
          title='Become a Sponsor by Delegating Steem Power to Utopian!'
          okText={isLoading ? <Icon type="loading"/> : 'Yes, Proceed'}
          cancelText='Later'
          onCancel={() => this.setState({sponsorModal: false})}
          onOk={ () => {
            createSponsor(account).then(res => {
              if (res.status === 500 || res.status === 404) {
                alert(res.message);
              } else {
                this.setState({sponsorModal: false});
              }

            });
          }}
        >
          <p>Love</p>
        </Modal>
      </section>
    )
  }

}

export default Sponsors;
