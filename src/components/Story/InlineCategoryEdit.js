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
    this.state = { value: '' };
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  onCategoryChange(e) {
    const value = e.target.value;
    this.setState({
        value: e.target.value
    });

    const type = this.props.types.filter((t) => {
      return t.type == value;
    })[0].type;

    const { post, user, moderatorAction } = this.props;
    const status = null, questions = [], score = 0;
    moderatorAction(
      post.author,
      post.permlink,
      user.name,
      status,
      questions,
      score,
      type,
    ).then((res) => {
//      console.log("category changed", res);
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
    const types = this.props.types.map((type, idx) => (
      <option value={type.type} key={idx}>{type.slug}</option>
    ))

    return (
      <select
        value={this.state.value}
        className="inline-category-edit-select"
        onChange={ this.onCategoryChange }
        defaultChecked={ this.state.value }>
        {types}
      </select>
    );
  }
}

export default InlineCategoryEdit;
