import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import { HotKeys } from 'react-hotkeys';
import { throttle } from 'lodash';
import isArray from 'lodash/isArray';
import { Icon, Checkbox, Form, Input, Select, Radio } from 'antd';
import Dropzone from 'react-dropzone';
import EditorToolbar from './EditorToolbar';
import * as EditorTemplates from './templates';
import Action from '../Button/Action';
import Body, { remarkable } from '../Story/Body';
import './Editor.less';

import { RulesTask } from '../RulesTask';
import { getGithubRepos, setGithubRepos } from '../../actions/projects';
const RadioGroup = Radio.Group;

@connect(
  state => ({
    repos: state.repos,
  }),
  { getGithubRepos, setGithubRepos },
)
@injectIntl
class EditorTask extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    form: PropTypes.shape().isRequired,
    repository: PropTypes.object,
    title: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    reward: PropTypes.string,
    body: PropTypes.string,
    type: PropTypes.string,
    loading: PropTypes.bool,
    isUpdating: PropTypes.bool,
    saving: PropTypes.bool,
    onUpdate: PropTypes.func,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    onImageInserted: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    repository: null,
    topics: [],
    reward: '50',
    type: 'task-ideas',
    body: '',
    recentTopics: [],
    popularTopics: [],
    loading: false,
    isUpdating: false,
    saving: false,
    rulesAccepted: false,
    onUpdate: () => {},
    onSubmit: () => {},
    onError: () => {},
    onImageInserted: () => {},
  };

  static hotkeys = {
    h1: 'ctrl+shift+1',
    h2: 'ctrl+shift+2',
    h3: 'ctrl+shift+3',
    h4: 'ctrl+shift+4',
    h5: 'ctrl+shift+5',
    h6: 'ctrl+shift+6',
    bold: 'ctrl+b',
    italic: 'ctrl+i',
    quote: 'ctrl+q',
    link: 'ctrl+k',
    image: 'ctrl+m',
  };

  state = {
    contentHtml: '',
    noContent: false,
    imageUploading: false,
    dropzoneActive: false,
    value: '',
    loading: false,
    loaded: false,
    repository: null,
    noRepository: false,
    currentType: null,
  };

  constructor (props) {
    super(props)
    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(items) {
    return items;
  }

  componentDidMount() {
    this.setState({
      repository: this.props.repository
    });

    if (this.input) {
      this.input.addEventListener('input', throttle(e => this.renderMarkdown(e.target.value), 500));
      this.input.addEventListener('paste', this.handlePastedImage);
    }

    this.setValues(this.props);

    // eslint-disable-next-line react/no-find-dom-node
    const select = ReactDOM.findDOMNode(this.select);
    if (select) {
      const selectInput = select.querySelector('input,textarea,div[contentEditable]');
      if (selectInput) {
        selectInput.setAttribute('autocorrect', 'off');
        selectInput.setAttribute('autocapitalize', 'none');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { title, topics, body, type, reward } = this.props;

    if (this.props.repository !== nextProps.repository) {
      this.setState({
        value: nextProps.repository.full_name,
        repository: nextProps.repository,
      });
    }

    if (
      title !== nextProps.title ||
      topics !== nextProps.topics ||
      body !== nextProps.body ||
      reward !== nextProps.reward ||
      type !== nextProps.type
    ) {
      this.setValues(nextProps);
    }
  }

  onUpdate = (e, isRepository = false) => {
    const values = isRepository ? this.getValues() : this.getValues(e);

    if (isRepository) {
      this.props.onUpdate({
        ...values,
        repository: e
      });
    } else {
      this.props.onUpdate(values);
    }
  };

  handleChangeCategory = (e) => {
    const { isUpdating } = this.props;
    if (!isUpdating) {
      const values = this.getValues(e);
      this.input.value = this.setDefaultTemplate(values.type);
      this.renderMarkdown(this.input.value)
      this.resizeTextarea();
    }
  }

  setInput = (input) => {
    if (input && input.refs && input.refs.input) {
      this.originalInput = input.refs.input;
      // eslint-disable-next-line react/no-find-dom-node
      this.input = ReactDOM.findDOMNode(input.refs.input);
    }
  };

  setDefaultTemplate = () => {
    return EditorTemplates['task']();
  }

  setValues = (post) => {
    this.props.form.setFieldsValue({
      title: post.title,
      // @UTOPIAN filtering out utopian-io since it's always added/re-added when posting
      topics: post.topics.filter(topic => topic !== process.env.UTOPIAN_CATEGORY),
      reward: post.reward,
      type: post.type || 'task-ideas',
    });
    if (this.input && post.body !== '') {
      this.input.value = post.body;
      this.renderMarkdown(this.input.value);
      this.resizeTextarea();
    }
  };

  getValues = (e) => {
    // NOTE: antd API is inconsistent and returns event or just value depending of input type.
    // this code extracts value from event based of event type
    // (array or just value for Select, proxy event for inputs and checkboxes)

    const values = {
      ...this.props.form.getFieldsValue(['title', 'type', 'topics', 'reward']),
      body: this.input.value,
    };

    if (!e) return values;

    if (isArray(e)) {
      values.topics = e;
    } else if (typeof e === 'string') {
      values.reward = e;
    }else if (e.target.type === 'textarea') {
      values.body = e.target.value;
    } else if (e.target.type === 'text') {
      values.title = e.target.value;
    } else if (e.target.type === 'radio') {
      const radioType = e.target.value;
      this.setState({currentType: radioType, rulesAccepted: false})
      values.type = e.target.value;
    }

    return values;
  };

  resizeTextarea = () => {
    if (this.originalInput) this.originalInput.resizeTextarea();
  };

  //
  // Form validation and handling
  //

  handleSubmit = (e) => {
    // NOTE: Wrapping textarea in getFormDecorator makes it impossible
    // to control its selection what is needed for markdown formatting.
    // This code adds requirement for body input to not be empty.
    e.preventDefault();
    this.setState({ noContent: false, noRepository: false });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (
        !this.state.repository
      ) {
        this.setState({noRepository: true});
      } else if (!err && this.input.value !== '') {

        this.props.onSubmit({
          ...values,
          repository: this.state.repository,
          body: this.input.value,
        });
      } else if (this.input.value === '') {
        const errors = {
          ...err,
          body: {
            errors: [
              {
                field: 'body',
                message: "Content can't be empty",
              },
            ],
          },
        };
        this.setState({ noContent: true });
        this.props.onError(errors);
      } else {
        this.props.onError(err);
      }
    });
  };

  checkTopics = (rule, value, callback) => {
    if (!value || value.length < 1 || value.length > 4) {
      callback('You have to add 1 to 4 tags');
    }

    value
      .map(topic => ({ topic, valid: /^[a-z0-9]+(-[a-z0-9]+)*$/.test(topic) }))
      .filter(topic => !topic.valid)
      .map(topic => callback(`Tag ${topic.topic} is invalid`));

    callback();
  };

  //
  // Editor methods
  //

  handlePastedImage = (e) => {
    if (e.clipboardData && e.clipboardData.items) {
      const items = e.clipboardData.items;
      Array.from(items).forEach((item) => {
        if (item.kind === 'file') {
          e.preventDefault();

          this.setState({
            imageUploading: true,
          });

          const blob = item.getAsFile();
          this.props.onImageInserted(blob, this.insertImage, () =>
            this.setState({
              imageUploading: false,
            }),
          );
        }
      });
    }
  };

  handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        imageUploading: true,
      });
      this.props.onImageInserted(e.target.files[0], this.insertImage, () =>
        this.setState({
          imageUploading: false,
        }),
      );
      // Input reacts on value change, so if user selects the same file nothing will happen.
      // We have to reset its value, so if same image is selected it will emit onChange event.
      e.target.value = '';
    }
  };

  handleDrop = (files) => {
    if (files.length === 0) {
      this.setState({
        dropzoneActive: false,
      });
      return;
    }

    this.setState({
      dropzoneActive: false,
      imageUploading: true,
    });
    let callbacksCount = 0;
    Array.from(files).forEach((item) => {
      this.props.onImageInserted(
        item,
        (image, imageName) => {
          callbacksCount += 1;
          this.insertImage(image, imageName);
          if (callbacksCount === files.length) {
            this.setState({
              imageUploading: false,
            });
          }
        },
        () => {
          this.setState({
            imageUploading: false,
          });
        },
      );
    });
  };

  handleDragEnter = () => this.setState({ dropzoneActive: true });

  handleDragLeave = () => this.setState({ dropzoneActive: false });

  insertAtCursor = (before, after, deltaStart = 0, deltaEnd = 0) => {
    if (!this.input) return;

    const startPos = this.input.selectionStart;
    const endPos = this.input.selectionEnd;
    this.input.value =
      this.input.value.substring(0, startPos) +
      before +
      this.input.value.substring(startPos, endPos) +
      after +
      this.input.value.substring(endPos, this.input.value.length);

    this.input.selectionStart = startPos + deltaStart;
    this.input.selectionEnd = endPos + deltaEnd;
  };

  insertImage = (image, imageName = 'image') => {
    if (!this.input) return;

    const startPos = this.input.selectionStart;
    const endPos = this.input.selectionEnd;
    this.input.value = `${this.input.value.substring(
      0,
      startPos,
    )}![${imageName}](${image})${this.input.value.substring(endPos, this.input.value.length)}\n`;

    this.resizeTextarea();
    this.renderMarkdown(this.input.value);
    this.onUpdate();
  };

  insertCode = (type) => {
    if (!this.input) return;
    this.input.focus();

    switch (type) {
      case 'h1':
        this.insertAtCursor('# ', '', 2, 2);
        break;
      case 'h2':
        this.insertAtCursor('## ', '', 3, 3);
        break;
      case 'h3':
        this.insertAtCursor('### ', '', 4, 4);
        break;
      case 'h4':
        this.insertAtCursor('#### ', '', 5, 5);
        break;
      case 'h5':
        this.insertAtCursor('##### ', '', 6, 6);
        break;
      case 'h6':
        this.insertAtCursor('###### ', '', 7, 7);
        break;
      case 'b':
        this.insertAtCursor('**', '**', 2, 2);
        break;
      case 'i':
        this.insertAtCursor('*', '*', 1, 1);
        break;
      case 'q':
        this.insertAtCursor('> ', '', 2, 2);
        break;
      case 'link':
        this.insertAtCursor('[', '](url)', 1, 1);
        break;
      case 'image':
        this.insertAtCursor('![', '](url)', 2, 2);
        break;
      default:
        break;
    }

    this.resizeTextarea();
    this.renderMarkdown(this.input.value);
    this.onUpdate();
  };

  handlers = {
    h1: () => this.insertCode('h1'),
    h2: () => this.insertCode('h2'),
    h3: () => this.insertCode('h3'),
    h4: () => this.insertCode('h4'),
    h5: () => this.insertCode('h5'),
    h6: () => this.insertCode('h6'),
    bold: () => this.insertCode('b'),
    italic: () => this.insertCode('i'),
    quote: () => this.insertCode('q'),
    link: (e) => {
      e.preventDefault();
      this.insertCode('link');
    },
    image: () => this.insertCode('image'),
  };

  renderMarkdown = (value) => {
    this.setState({
      contentHtml: remarkable.render(value),
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { intl, loading, isUpdating, type, saving, repository } = this.props;

    const chosenType = this.state.currentType || type || 'task-ideas';

    return (
      <Form className="Editor" layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span className="Editor__label">
              What are you looking for?
            </span>
          }
        >
          <div className="Editor__category">
            {getFieldDecorator('type')(
              <RadioGroup onChange={(e) => {
                this.onUpdate(e);
                this.handleChangeCategory(e);
              }}>
                <label>
                  <Radio value="task-ideas" name="type" />
                  <div className={`ideas box`}>
                    <span>Thinkers</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-development" name="type" />
                  <div className={`development box`}>
                    <span>Developers</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-bug-hunting" name="type" />
                  <div className={`bug-hunting box`}>
                    <span>Bug Hunters</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-translations" name="type" />
                  <div className={`translations box`}>
                    <span>Translators</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-graphics" name="type" />
                  <div className={`graphics box`}>
                    <span>Designers</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-documentation" name="type"/>
                  <div className={`documentation box`}>
                    <span>Tech Writers</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-analysis" name="type"/>
                  <div className={`analysis box`}>
                    <span>Data Analysts</span>
                  </div>
                </label>
                <label>
                  <Radio value="task-social" name="type"/>
                  <div className={`social box`}>
                    <span>Influencers</span>
                  </div>
                </label>
              </RadioGroup>
            )}
          </div>
        </Form.Item>

        {!this.state.rulesAccepted && !isUpdating  ? <RulesTask
            inEditor={true}
            type={chosenType}
            acceptRules={() => this.setState({rulesAccepted: true})} />
          : null}

        <div className={this.state.rulesAccepted || isUpdating ? 'rulesAccepted' : 'rulesNotAccepted'}>
          <Form.Item
            validateStatus={this.state.noRepository ? 'error' : ''}
            help={this.state.noRepository && "Please enter an existing Github repository"}
            label={
              <span className="Editor__label">
              <Icon type='github' /> Github project
            </span>
            }
          >
            <input className="ant-input ant-input-lg Editor__repository disabled" disabled="true" defaultValue={repository.full_name} />
          </Form.Item>
          <Form.Item
            label={
              <span className="Editor__label">
              Task request title
            </span>
            }
          >
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Title cannot be empty',
                },
                {
                  max: 255,
                  message: "Title can't be longer than 255 characters.",
                },
              ],
            })(
              <Input
                ref={(title) => {
                  this.title = title;
                }}
                onChange={this.onUpdate}
                className="Editor__title"
                placeholder='Add title'
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={this.state.noContent ? 'error' : ''}
            help={this.state.noContent && "Story content can't be empty."}
          >

            <EditorToolbar onSelect={this.insertCode} />

            <div className="Editor__dropzone-base">
              <Dropzone
                disableClick
                style={{}}
                accept="image/*"
                onDrop={this.handleDrop}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
              >
                {this.state.dropzoneActive && (
                  <div className="Editor__dropzone">
                    <div>
                      <i className="iconfont icon-picture" />
                      <FormattedMessage id="drop_image" defaultMessage="Drop your images here" />
                    </div>
                  </div>
                )}
                <HotKeys keyMap={EditorTask.hotkeys} handlers={this.handlers}>
                  <Input
                    autosize={{ minRows: 6, maxRows: 12 }}
                    onChange={this.onUpdate}
                    ref={ref => this.setInput(ref)}
                    type="textarea"
                    placeholder={intl.formatMessage({
                      id: 'story_placeholder',
                      defaultMessage: 'Write your story...',
                    })}
                    defaultValue={this.setDefaultTemplate()}
                  />
                </HotKeys>
              </Dropzone>
            </div>
            <p className="Editor__imagebox">
              <input type="file" id="inputfile" onChange={this.handleImageChange} />
              <label htmlFor="inputfile">
                {this.state.imageUploading ? (
                    <Icon type="loading" />
                  ) : (
                    <i className="iconfont icon-picture" />
                  )}
                {this.state.imageUploading ? (
                    <FormattedMessage id="image_uploading" defaultMessage="Uploading your image..." />
                  ) : (
                    <FormattedMessage
                      id="select_or_past_image"
                      defaultMessage="Select image or paste it from the clipboard."
                    />
                  )}
              </label>
            </p>
          </Form.Item>
          {this.state.contentHtml && (
            <Form.Item
              label={
                <span className="Editor__label">
                <FormattedMessage id="preview" defaultMessage="Preview" />
              </span>
              }
            >
              <Body full body={this.state.contentHtml} />
            </Form.Item>
          )}
          <Form.Item
            label={
              <span className="Editor__label">
              Tags
            </span>
            }
            extra='Separate tags with commas. Only lowercase letters, numbers and hyphen character is permitted.'
          >
            {getFieldDecorator('topics', {
              rules: [
                {
                  required: true,
                  message: 'Please enter some tags',
                  type: 'array',
                },
                { validator: this.checkTopics },
              ],
            })(
              <Select
                ref={(ref) => {
                  this.select = ref;
                }}
                onChange={this.onUpdate}
                className="Editor__topics"
                mode="tags"
                placeholder='Add story topics here'
                dropdownStyle={{ display: 'none' }}
                tokenSeparators={[' ', ',']}
              />,
            )}
          </Form.Item>
          <Form.Item
            className={classNames({ Editor__hidden: isUpdating })}
            label={
              <span className="Editor__label">
              Reward
            </span>
            }
          >
            {getFieldDecorator('reward', { initialValue: '50' })(
              <Select onChange={this.onUpdate} disabled={isUpdating}>
                <Select.Option value="100">
                  100% Steem Power
                </Select.Option>
                <Select.Option value="50">
                  50% SBD and 50% SP
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <div className="Editor__bottom">
              <span className="Editor__bottom__info">
              <i className="iconfont icon-markdown" />{' '}
                <FormattedMessage
                  id="markdown_supported"
                  defaultMessage="Styling with markdown supported"
                />
              </span>
            <div className="Editor__bottom__right">
              {saving && (
                <span className="Editor__bottom__right__saving">
                Saving...
              </span>
              )}
              <Form.Item className="Editor__bottom__submit">
                {isUpdating ? (
                    <Action
                      primary
                      loading={loading}
                      disabled={loading}
                      text={intl.formatMessage({
                        id: loading ? 'post_send_progress' : 'post_update_send',
                        defaultMessage: loading ? 'Submitting' : 'Update post',
                      })}
                    />
                  ) : (
                    <Action
                      primary
                      loading={loading}
                      disabled={loading}
                      text={intl.formatMessage({
                        id: loading ? 'post_send_progress' : 'post_send',
                        defaultMessage: loading ? 'Submitting' : 'Post',
                      })}
                    />
                  )}
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

export default Form.create()(EditorTask);
