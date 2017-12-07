import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../actions/contributions';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';
import './Moderators.less';

@connect(
    (state, ownProps) => ({
    }), { getPostById })
class Sponsors extends React.PureComponent {
    static propTypes = {
        postId: PropTypes.object,
    }
    static defaultProps = {
        postId: '404',
    }
    constructor (props) {
      super(props);
  
      this.state = {
        sponsorModal: false,
        total_vesting_shares: 0,
        total_vesting_fund_steem: 0,
      };
    }
    fallBack() {
        window.location.href = "/";
    }
    componentWillMount() {
        const { postId } = this.props;
        console.log("POST ID: ", postId);
        if (postId === '404') {
            this.fallBack();
        }
    }
    render() {
        const { postId, getPostById, match } = this.props;
        var success = false;
        var sId = '404';
        if (postId && postId !== '404') sId = postId;
        else sId = match.params.postId;
        try {
            getPostById(parseInt(sId)).then((post) => {
                if (post && post.url) {
                    console.log("POST SHORTLINK, redirecting to: ", post.url);
                    window.location.href = post.url;
                } else {
                    console.log("POST SHORTLINK ERROR, post: ", post);
                    this.fallBack();
                }
            });
        } catch (e) {
            console.log("POST SHORTLINK ERROR: ", e);
            this.fallBack();
        }
        return (
            <div class="main">
            <center>
                <Icon type="loading" style={{paddingTop:"20px",fontSize: "70px", color: "purple"}}/>
            </center>
            </div>
        );
    }


}