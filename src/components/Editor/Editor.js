import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import { HotKeys } from 'react-hotkeys';
import { throttle } from 'lodash';
import isArray from 'lodash/isArray';
import { Icon, Checkbox, Form, Input, Select, Radio } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import Dropzone from 'react-dropzone';
import EditorToolbar from './EditorToolbar';
import * as EditorTemplates from './templates';
import Action from '../Button/Action';
import Body, { remarkable } from '../Story/Body';
import Autocomplete from 'react-autocomplete';
import SimilarPosts from './SimilarPosts';
import 'mdi/css/materialdesignicons.min.css';
import './Editor.less';

import { getGithubRepos, setGithubRepos } from '../../actions/projects';
const RadioGroup = Radio.Group;
const Option = Select.Option;

// @UTOPIAN
import { Rules } from '../Rules';
import { getPullRequests } from '../../actions/pullRequests';


@connect(
  state => ({
    repos: state.repos,
  }),
  { getGithubRepos,
    setGithubRepos,
    getPullRequests,
  },
)
@injectIntl
class Editor extends React.Component {
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
    type: 'ideas',
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
    pullRequests: [],
    availablePullRequests: [],
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

    const removeChat = () => {
        if (document.getElementsByClassName("cometchat_ccmobiletab_redirect") && document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0]) {
          if (document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0].classList) {
            if (!document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0].classList.contains("Component__block")) {
              document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0].classList.add("Component__block");
              console.log("Blocking Chat");
            }
          }
        }
    }
    removeChat();
    setTimeout(removeChat, 2000);
    setTimeout(removeChat, 2500);
    setTimeout(removeChat, 4000);
  }


  

  componentWillUnmount() {
    if (document.getElementsByClassName("cometchat_ccmobiletab_redirect") && document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0]) {
      if (document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0].classList) {
        if (document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0].classList.contains("Component__block")) {
          document.getElementsByClassName("cometchat_ccmobiletab_redirect")[0].classList.remove("Component__block");
          console.log("Unblocking Chat");
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { title, topics, body, type, user, getPullRequests, repository, reward } = this.props;
    const chosenType = this.state.currentType || type || 'ideas';

    const getPulls = () => {
      getPullRequests(nextProps.repository.full_name).then(res => {
        if (res.response && res.response.length > 0) {
          const prs = res.response.filter(pr => pr.user.login === user.github.account);
          this.setState({
            availablePullRequests: prs
          });
        }
      });
    }

    if (this.props.repository !== nextProps.repository) {
      this.setState({
        value: nextProps.repository.full_name,
        repository: nextProps.repository,
      });
    }

    if (nextProps.repository !== nextProps.repository && user && user.github ||
      nextProps.user !== user && nextProps.user.github !== user.github &&
      (chosenType === 'development' || chosenType === 'documentation' || chosenType === 'copywriting') &&
      (nextProps.repository && nextProps.repository.full_name))
    {
      getPulls();
    }

    if (this.props.pullRequests !== nextProps.pullRequests) {
      this.setState({
        pullRequests: nextProps.pullRequests,
      });
    }

    if (
      title !== nextProps.title ||
      topics !== nextProps.topics ||
      reward !== nextProps.reward ||
      body !== nextProps.body ||
      type !== nextProps.type
    ) {
      this.setValues(nextProps);
    }
  }

  onUpdate = (e, type = null) => {
    const values = type === 'repository' || type === 'pullRequests' ? this.getValues() : this.getValues(e);

    if (type === 'repository') {
      this.props.onUpdate({
        ...values,
        repository: e
      });
    }else if (type === 'pullRequests') {
      console.log(e)
      this.props.onUpdate({
        ...values,
        pullRequests: e
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

  setDefaultTemplate = (type) => {
    const sanitisedType = type.replace('-', '');
    return EditorTemplates[sanitisedType]();
  }

  setValues = (post) => {
    this.props.form.setFieldsValue({
      title: post.title,
      // @UTOPIAN filtering out utopian-io since it's always added/re-added when posting
      topics: post.topics.filter(topic => topic !== process.env.UTOPIAN_CATEGORY),
      reward: post.reward,
      type: post.type || 'ideas',
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

  setInputCursorPosition = (pos) => {
    if (this.input && this.input.setSelectionRange) {
      this.input.setSelectionRange(pos, pos);
    }
  }

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
          pullRequests: this.state.pullRequests,
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
    const imageText = `![${imageName}](${image})\n`;
    this.input.value = `${this.input.value.substring(
      0,
      startPos,
    )}${imageText}${this.input.value.substring(endPos, this.input.value.length)}`;
    this.resizeTextarea();
    this.renderMarkdown(this.input.value);
    this.setInputCursorPosition(startPos + imageText.length);
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
    const { intl, loading, isUpdating, isReviewed, type, saving, getGithubRepos, repos, setGithubRepos, user, getPullRequests, pullRequests, parsedPostData } = this.props;

    const chosenType = this.state.currentType || type || 'ideas';

    return (
      <Form className="Editor" layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span className="Editor__label">
              What is this contribution about?
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
                  <Radio value="ideas" name="type" disabled={isReviewed}/>
                  <div className={`ideas box`}>
                    <span>Suggestion</span>
                  </div>
                </label>
                <label>
                  <Radio value="development" name="type" disabled={isReviewed}/>
                  <div className={`development box`}>
                    <span>Development</span>
                  </div>
                </label>
                <label>
                  <Radio value="bug-hunting" name="type" disabled={isReviewed}/>
                  <div className={`bug-hunting box`}>
                    <span>Bug Hunting</span>
                  </div>
                </label>
                <label>
                  <Radio value="translations" name="type" disabled={isReviewed}/>
                  <div className={`translations box`}>
                    <span>Translation</span>
                  </div>
                </label>
                <label>
                  <Radio value="graphics" name="type" disabled={isReviewed}/>
                  <div className={`graphics box`}>
                    <span>Graphics</span>
                  </div>
                </label>
                <label>
                  <Radio value="analysis" name="type" disabled={isReviewed}/>
                  <div className={`analysis box`}>
                    <span>Analysis</span>
                  </div>
                </label>
                <label>
                  <Radio value="social" name="type" disabled={isReviewed}/>
                  <div className={`social box`}>
                    <span>Visibility</span>
                  </div>
                </label>
                <label>
                  <Radio value="documentation" name="type" disabled={isReviewed}/>
                  <div className={`documentation box`}>
                    <span>Documentation</span>
                  </div>
                </label>
                <label>
                  <Radio value="tutorials" name="type" disabled={isReviewed}/>
                  <div className={`tutorials box`}>
                    <span>Tutorials</span>
                  </div>
                </label>
                <label>
                  <Radio value="video-tutorials" name="type" disabled={isReviewed}/>
                  <div className={`video-tutorials box`}>
                    <span>Video Tutorials</span>
                  </div>
                </label>
                <label>
                  <Radio value="copywriting" name="type" disabled={isReviewed}/>
                  <div className={`copywriting box`}>
                    <span>Copywriting</span>
                  </div>
                </label>
                <label>
                  <Radio value="blog" name="type" disabled={isReviewed}/>
                  <div className={`blog box`}>
                    <span>Blog Post</span>
                  </div>
                </label>
              </RadioGroup>
            )}
          </div>
        </Form.Item>

        {!this.state.rulesAccepted && !isUpdating  ? <Rules
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
              <Icon type='github' /> Github project (eg. Wordpress/Wordpress)
            </span>
            }
          >
            <Autocomplete
              ref={ search => this.search = search }
              value={ this.state.value }
              inputProps={{
                disabled: isReviewed,
                id: 'search-projects',
                placeholder: 'Browse Github repositories',
                className: `ant-input ant-input-lg Editor__repository ${isReviewed ? 'disabled' : ''}`,
                onKeyPress: (event) => {
                  let q = event.target.value;
                  q = q.replace('https://', '');
                  q = q.replace('http://', '');
                  q = q.replace('github.com/', '');
                  q = '"' + q + '"';

                  if (event.key === 'Enter') {
                    event.preventDefault();

                    this.setState({loading: true, loaded: false});
                    this.search.refs.input.click();

                    getGithubRepos({
                      q,
                    }).then(() => {
                      this.setState({loaded: true, loading: false});
                      this.search.refs.input.click();
                    });
                  }
                },
                onPaste: event => {
                  const pasted = event.clipboardData.getData('Text');
                  if (pasted.indexOf('github') > -1) {
                    let q = pasted.replace('https://', '');
                    q = q.replace('http://', '');
                    q = q.replace('github.com/', '');
                    q = '"' + q + '"';

                    this.search.refs.input.click();

                    getGithubRepos(q).then(() => {
                      this.setState({loaded: true, loading: false});
                      this.search.refs.input.click();
                    });
                  }
                },
              }}
              items={ repos }
              getItemValue={repo => repo.full_name}
              onSelect={(value, repo) => {
                const update = () => {
                  this.setState({
                    value: repo.full_name,
                    repository: repo,
                  });
                  this.onUpdate(repo, 'repository');
                };

                if (user.github && !isReviewed && (chosenType === 'development' || chosenType === 'documentation' || chosenType === 'copywriting')) {
                  getPullRequests(repo.full_name).then(res => {
                    if (res.response && res.response.length > 0) {
                      const prs = res.response.filter(pr => pr.user.login === user.github.account);
                      this.setState({
                        availablePullRequests: prs
                      });
                    }
                  });
                }
                update();
              }}
              onChange={(event, value) => {
                this.setState({value});

                if (value === '') {
                  setGithubRepos([]);
                  this.setState({loaded: false, repository: null});
                }

              }}
              renderItem={(repo, isHighlighted) => (
                <div
                  className='Topnav__search-item'
                  key={repo.full_name}
                >
                  <span><Icon type='github' /> <b>{repo.full_name}</b></span>
                  <span>{repo.html_url}</span>
                </div>
              )}
              renderMenu={(items, value) => (
                <div className="Topnav__search-menu-reg">
                  <div>
                    {items.length === 0 && !this.state.loaded && !this.state.loading && <div className="Topnav__search-tip"><b>Press enter to see results</b></div>}
                    {items.length === 0 && this.state.loaded && <div className="Topnav__search-tip">No projects found</div>}
                    {this.state.loading && <div className="Topnav__search-tip">Loading...</div>}
                    {items.length > 0 && this.renderItems(items)}
                  </div>
                </div>
              )}
            />
          </Form.Item>


          {(chosenType === 'development' || chosenType === 'documentation' || chosenType === 'copywriting') &&
          user.github &&
          (this.state.availablePullRequests.length > 0 || pullRequests.length > 0) ?
            <Form.Item
              label={
                <span className="Editor__label">
              Pull Requests
            </span>
              }
            >
              <Select
                disabled={isReviewed}
                mode="multiple"
                placeholder="Choose Pull Requests"
                defaultValue={pullRequests.map(pr => pr.id.toString())}
                onChange={ (prs) => {
                  this.setState({
                    pullRequests: this.state.availablePullRequests.filter(avPr => prs.indexOf(avPr.id.toString()) > -1),
                  });
                  this.onUpdate(prs, 'pullRequests');
                }}
              >
                {this.state.availablePullRequests.map(pr => <Option value={pr.id.toString()} key={pr.id}>{pr.id} - {pr.title}</Option>)}
              </Select>

            </Form.Item> : null}

          <Form.Item
            label={
              <span className="Editor__label">
            Contribution title
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
                <HotKeys keyMap={Editor.hotkeys} handlers={this.handlers}>
                  <Input
                    autosize={{ minRows: 6, maxRows: 12 }}
                    onChange={this.onUpdate}
                    ref={ref => this.setInput(ref)}
                    type="textarea"
                    placeholder={intl.formatMessage({
                      id: 'story_placeholder',
                      defaultMessage: 'Write your story...',
                    })}
                    defaultValue={this.setDefaultTemplate('ideas')}
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

          <SimilarPosts data={parsedPostData} />

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

export default Form.create()(Editor);
