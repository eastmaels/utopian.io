import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InlineCategoryEdit extends React.Component {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    moderatorAction: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    post: [],
    moderatorAction: () => {},
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
        value: '',
        waitModResponse: false,
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  onCategoryChange(e) {
    const value = e.target.value;
    this.setState({
        value: e.target.value,
        waitModResponse: true,
    });

    const type = this.props.types.filter((t) => {
      return t.type == value;
    })[0].type;

    const { post, user, moderatorAction } = this.props;
    const status = null;
    moderatorAction(
      post.author,
      post.permlink,
      user.name,
      status,
      type,
    ).then((res) => {
      this.setState({
        waitModResponse: false,
      });
    });
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
	// let validTypes = this.props.types.filter( type => {
	// 	return !type.disabled;
	// });
    const types = this.props.types.map((type, idx) => (
      <option value={type.type} key={idx} disabled={type.disabled}>{type.slug}</option>
    ))

    return (
      <div style={{display: "inline-block"}}>
        <select
          value={this.state.value}
          className="inline-category-edit-select"
          onChange={ this.onCategoryChange }
          defaultChecked={ this.state.value }>
          {types}
        </select>
        <span style={{
            display: this.state.waitModResponse ? '' : 'none'
          }}>
          <i className="fa fa-spinner fa-spin" />
        </span>
      </div>
    );
  }
}

export default InlineCategoryEdit;
