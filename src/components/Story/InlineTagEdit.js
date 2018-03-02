import React, { Component } from 'react';
import { injectIntl, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './InlineTagEdit.less';

@injectIntl
class InlineTagEdit extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    value: PropTypes.string,
    post: PropTypes.shape().isRequired,
    user: PropTypes.shape(),
    moderatorAction: PropTypes.func,
    validation: PropTypes.func,
  };

  static defaultProps = {
    user: {},
    post: {},
    moderatorAction: () => {},
    validation: () => {},
  };

  constructor (props) {
    super(props);
    this.state = { tags: [] };
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.resizeInput = this.resizeInput.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddTagButtonClick = this.handleAddTagButtonClick.bind(this);
    this.createNewTag = this.createNewTag.bind(this);
    this.updatePostTags = this.updatePostTags.bind(this);
    this.post = props.post;
  }

  componentWillMount() {
    const tags = this.post['json_metadata'].tags.map((tag) => {
      return { title: tag };
    });
    this.setState({ tags: this.state.tags.concat(tags) });

    setTimeout(() => {
      const tagInputs = document.getElementsByClassName('inline-tag-edit-input');
      Array.prototype.slice.call(tagInputs).map((tagInput) => {
        return this.resizeInput(tagInput);
      });
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    const prevTags = this.props.post['json_metadata'].tags;
    const nextTags = nextProps.post['json_metadata'].tags;

    if (prevTags.sort().join(',') !== nextTags.sort().join(',')) {
      const tags = nextProps.post['json_metadata'].tags.map((tag) => {
        return { title: tag, selected: false };
      });
      this.setState({ tags: tags });
    }
  }

  updatePostTags() {
    const tags = this.state.tags.map((tag) => {
      return tag.title;
    });

    const { post, user, moderatorAction } = this.props;
    const status = null, questions = [], score = 0, type = null, repo = null;
    moderatorAction(
      post.author,
      post.permlink,
      user.name,
      status,
      questions,
      score,
      type,
      repo,
      tags,
    ).then((res) => {
      // do nothing.
    });
  }

  resizeInput(input) {
    const RESIZE_FACTOR = 7.5;
    input.style.width = ((input.value.length + 1) * RESIZE_FACTOR) + 'px';
  }

  handleOnFocus(event) {
    const index = parseInt(event.target.attributes['data-index'].value, 10);
    const tags = this.state.tags.filter((tag, tagIndex) => {
      if (index == tagIndex) {
        tag.selected = true;
      } else {
        tag.selected = false;
      }
      return tag;
    });

    this.setState({
      tags: tags,
      previousTags: this.state.tags,
    });
    this.resizeInput(event.target);
  }

  handleRemoveTag(event) {
    event.preventDefault();
    const index = parseInt(event.target.attributes['data-index'].value, 10);
    this.removeTag(index);
    setTimeout(() => {
      this.updatePostTags();
    }, 100);
  }

  handleBlur(event) {
    const tags = this.state.tags.filter((tag, tagIndex) => {
      tag.selected = false;
      return tag;
    });
    this.setState({ tags: tags });

    const prevTags = this.state.previousTags.map(tag => {
      return tag.title;
    });
    const newTags = this.state.tags.map(tag => {
      return tag.title;
    });

    if(event.target.value === '') {
      // remove added tag span when value is empty
      const index = parseInt(event.target.attributes['data-index'].value, 10);
      this.removeTag(index);
    } else if (prevTags.sort().join(',') === newTags.sort().join(',')
        || !this.props.validation(newTags)) {
      // do nothing; do not broadcoast
    } else {
      this.resizeInput(event.target);
      this.updatePostTags();
    }
  }

  handleChange(event) {
    this.props.validation(event.target.value);
    const index = parseInt(event.target.attributes['data-index'].value, 10);
    const tags = this.state.tags.map((tag, idx) => {
      if (idx !== index) return tag;
      return { ...tag, title: event.target.value }
    });
    this.setState({ tags: tags });
    this.resizeInput(event.target);
  }

  handleKeyPress(event) {
    this.resizeInput(event.target);
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = this.getLatestInput();
      input.blur();
    }
  }

  removeTag(index) {
    const tags = this.state.tags.filter((tag, tagIndex) => {
      return index != tagIndex;
    });
    this.setState({ tags: tags });
  }

  handleKeyUp(event) {
    if (event.key === 'Escape') {
      this.setState({ tags: this.state.previousTags });
      setTimeout(() => {
        const input = this.getLatestInput();
        input.blur();
      }, 100);
    }
    this.resizeInput(event.target);
  }

  handleAddTagButtonClick(event) {
    setTimeout(() => {
      this.createNewTag();
      const input = this.getLatestInput();
      this.resizeInput(input);
      input.focus();
    }, 100);
  }

  createNewTag(title = '') {
    return this.setState({
      tags: this.state.tags.concat([{
        'title': title,
        selected: true,
      }])
    })
  }

  getLatestInput () {
    const tagInputs = Array.prototype.slice.call(document.getElementsByClassName('inline-tag-edit-input'));
    return tagInputs[tagInputs.length - 1];
  }

  isValidTag(value) {
    return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value);
  }

  render () {
    const { intl } = this.props;
    const tags = this.state.tags.map((tag, index) => {
      if (tag.title !== 'utopian-io' && tag.title !== 'test-category') {
        return (
            <li className="inline-tag-edit-item" key={index}>
              <span
                className={"inline-tag-edit " + (this.isValidTag(this.state.tags[index].title) ? '' : 'hasError')}>
                <input
                  type="text"
                  ref="tagInput"
                  value={this.state.tags[index].title}
                  onChange={this.handleChange}
                  onFocus={this.handleOnFocus}
                  name={`tag-${index}`}
                  onBlur={this.handleBlur}
                  onKeyPress={this.handleKeyPress}
                  onKeyUp={this.handleKeyUp}
                  className="inline-tag-edit-input"
                  data-index={index}
                  />
                <span className="text-right inline-tag-edit-remove"
                  data-index={index}
                  style = {{
                    display: this.state.tags[index].selected ? 'none' : ''
                  }}
                  onClick={this.handleRemoveTag}>&times;</span>
              </span>
            </li>
          );
      } else {
        return (
            <li className="inline-tag-edit-item" key={index}>
              <span className="inline-tag-edit">
                <input type="text"
                  ref="tagInput"
                  value={this.state.tags[index].title}
                  name={`tag-${index}`}
                  className="inline-tag-edit-input"
                  data-index={index}
                  disabled={true}
                />
              </span>
            </li>
          );
      }
    });
    const lastTagPos = tags.length - 1;

    return (
      <div className="inline-tag-edit-container">
        <section>
          <ul>
            {tags}
            <li
              className="inline-tag-edit-item"
              key={lastTagPos}
              style = {{
                display: this.state.tags.length < 5 ? '' : 'none'
              }}>
              <span
                className="text-right inline-tag-edit-add"
                data-index={lastTagPos}
                onClick={this.handleAddTagButtonClick}>+</span>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default InlineTagEdit;
