import React, { Component } from 'react';

class InlineCategoryEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        value: props.value
    }
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  onCategoryChange (e) {
    const value = e.target.value;
    this.setState({
        value: e.target.value
    });

    const type = this.props.types.filter((t) => {
      return t.type == value;
    })[0].type;

    const jsonMetadata = this.props.post['json_metadata'];
    const metadata = {
        ...jsonMetadata,
        type: type
    };

    const { post, user, moderatorAction } = this.props;
    moderatorAction(
      post.author,
      post.permlink,
      user.name,
      null,
      type,
    ).then((res) => {
      console.log(res);
    });
  }

  render () {
    const types = this.props.types.map((type, idx) => (
      <option value={type.type} key={idx}>{type.slug}</option>
    ))
    const type = this.props.value;

    return (
      <select
        value={this.state.value}
        className="inline-category-edit-select"
        onChange={ this.onCategoryChange }>
        {types}
      </select>
    );
  }
}

export default InlineCategoryEdit;
