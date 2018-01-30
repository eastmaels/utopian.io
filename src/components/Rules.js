import React from 'react';
import CategoryIcon from './CategoriesIcons';
import Action from './Button/Action';

const AcceptRules = ({acceptRules}) => (
  <Action
    className="accept-rules-btn"
    primary
    text='I understand. Proceed'
    onClick={e => {
      e.preventDefault();
      acceptRules();
    }}
  />
);

export const Rules = ({type, acceptRules, inEditor}) => {
  switch(type) {
    case 'ideas':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="ideas"/> Suggestion Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>Suggestions are minor features/enhancements that you would like to have in an Open Source project.</li>
            <li>Suggestions may be only related to the technical aspects of the project not process or organisational issues.</li>
            <li>Suggestions must provide all the details for the requested features to be actually built.</li>
            <li>Images, screenshots, links and examples are always welcome in this category.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    /*case 'sub-projects':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="sub-projects"/> Sub-Project Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>A Sub-Project is a set of new unseen features having a great impact on the project.</li>
            <li>Sub-Projects must provide great details for the features to be actually built.</li>
            <li>Images, screenshots, links, flows, mockups and examples are always mandatory in this category.</li>
            <li>In this category quality of the contents is the main factor for being accepted in Utopian.</li>
            <li>If you believe your idea does not qualify as a Sub-project use the Suggestions category instead.</li>
            <li>Never write about projects you have already shared before or projects already shared by someone else.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )*/
    case 'development':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="development"/> Development Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>In the development category you can submit <b>Bug Fixes</b>, <b>New Features</b> and your <b>Own Projects</b>.</li>
            <li>Contributions must have a comprehensible commit history. Larger projects or updates submitted in a single commit will not be accepted.</li>
            <li>Outdated or low quality code can lead to rejection.</li>
            <li>Generated code or other results of automated processes will not be accepted.</li>
            <li>Submitted projects must have a unique value. Redundant projects will not be accepted.</li>
            <li>Trivial code snippets, example code or simple templates will not be accepted.</li>
            <li><b>Bug Fixes</b> and <b>New Features</b> must be submitted via Pull Requests. The Pull Request must have been <b>merged within the past 14 days</b>.</li>
            <li>Updates on <b>Own Projects</b> can be committed directly, without a Pull Request. <b>Commits must not be older than 14 days.</b></li>
            <li><b>Bug Fixes</b> for your <b>Own Projects</b> will not be accepted, unless the Bugs were caused by third party dependencies.</li>
            <li>Your Utopian account must be connected to your GitHub account.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'bug-hunting':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="bug-hunting"/> Bug Hunting Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>In this category you can submit <b>Bug Reports</b> for actively maintained Open Source projects on GitHub.</li>
            <li>The repository on GitHub must accept <a href="https://help.github.com/articles/about-issues/">issues</a>.</li>
            <li><b>Bug Reports</b> for projects in <a href="https://en.wikipedia.org/wiki/Software_release_life_cycle">pre-alpha stage</a> will not be accepted.</li>
            <li>Cosmetic issues, that do not affect the functionality of the software, will not be accepted.</li>
            <li>You must provide sufficiant detail to reproduce the bug.</li>
            <li>Add screenshots, video recordings or animated GIFs, if they can help to understand the bug. [SOFT]</li>
            <li>Include information about your technical environment such as Device, Operating System, Browser and Application versions.</li>
            <li>Bugs must be found on the latest released version of the application.</li>
            <li>If you or someone else submitted the issue on GitHub first, the <b>Bug Report</b> will not be accepted. Approved <b>Bug Reports</b> will automatically be published on GitHub.</li>
            <li>Your Utopian account must be connected to your GitHub account.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution will not be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'translations':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="translations"/> Translations Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for translations you have updated or created for an Open Source project.</li>
            <li><b>Minimum 1000 words per translation contribution.</b> Text that is supposed to remain untranslated (links, code, paths, ...) or duplicated strings/text can't be included in the minimum amount of words.</li>
            <li>Proofread or merged translations are always preferred. Submitting translations that are not proofread will lead to a lower vote.</li>
            <li>You could translate less than the minimum amount of words if the project itself has less to be translated in total. May lead to a lower vote.</li>
            <li>The contribution will be rejected if the submitted translation is <b>older than 7 days</b> since the submitted contribution. This rule does not apply for proofread translations.</li>
            <li>If it is obvious that you can't properly write in the source language of the translation, your contribution will be rejected.</li>
            <li>Only translations on CrowdIn or Github are accepted. You should not translate the words and provide them in your Utopian post directly.</li>
            <li>Your Github Account or Crowdin Account must match your Steem/Utopian account. If it does not you must use the field "Full Name" in Crowdin to show you are the author.</li>
            <li>You must include every possible detail to check the translations and the tools you have used to translate.</li>
            <li>Entire translations are always preferred. If you are writing about a partial translation we reserve the right to evaluate the actual work.</li>
            <li>Same translations from different authors will be accepted if the moderator can recognise the newest translation has better quality.</li>
            <li>If the provided translation is obviously machine-translated for more than its 20% or has low quality will be rejected.</li>
            <li>Proof-reading is not acceptable in Utopian as a valid contribution.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'graphics':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="graphics"/> Graphics Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for graphics/videos/motion graphics that you have realised for an open source project.</li>
            <li>The contribution must be a direct result of your own work. It is strictly prohibited to modify other people’s work/assets or use a template and claim it as yours.</li>
            <li>T-shirts and merchandising are generally not valid contributions in Utopian.</li>
            <li>You must include every possible detail in your contributions to verify the work is done by you.</li>
            <li>A contribution must contain the final file of your work, sample of the work, applications of your work, comparison to the existing product, and benefits of your work to the project owner.</li>
            <li>Graphics contributions can be delivered in .psd, .ai, .cdr or any other universally accepted file format except logo designs. Those must be delivered in a vector file (e.g. .eps/.svg/.pdf) for flexibility and scalability, and .png file format.</li>
            <li>Logo design contributions must contain the actual logo (logomark/logotype), the logo in a form of an icon, logo variations in terms of size and colour (monochrome and full-colour versions). You can see some examples of good contributions <a href="https://utopian.io/utopian-io/@andrejcibik/logo-for-chatsecure-open-source-private-chat-ios-app">here</a>, <a href="https://utopian.io/utopian-io/@oups/utopian-io-logo-re-design">here</a>, and <a href="https://utopian.io/utopian-io/@andrejcibik/steemgigs-2-logos-proposal">here</a>.</li>
            <li>Any text or fonts must be converted into shapes or “outlined”.</li>
            <li>You must provide credit to all third-party images/assets you have used in your contribution and make sure that you have permission to use them for commercial use. (images, videos, fonts, 3D models etc.)</li>
            <li>Intro videos are acceptable only if the project has already had an intro video before and your contributed video is of a better quality.</li>
            <li>It is highly recommended that you promote your work to the project owner.</li>
            <li>Banners, header images and other assets for use on social media platforms are not valid contributions at the moment.</li>
            <li>Designs are preferred to be in a vector format unless the project owner specifies a different format.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'analysis':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Analysis Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for providing a data analysis you have generated for an Open Source project.</li>
            <li>You must include the results of your analyses and the reasons why you have generated them.</li>
            <li>You should include example scripts which generated the results for your analysis, if applicable, or any information on how the data was generated.</li>
            <li>Recurring analyses that are obviously script generated will lead to a lower vote.</li>
            <li>If you are not pasting the entire analysis here you must provide public links to it.</li>
            <li>Results of the analyses, in the form of charts or tables are mandatory in this category.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'social':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Visibility Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for providing results of <b>online social engagement</b>, ads and similar for an Open Source project.</li>
            <li>Promotions done on chats (e.g. Whatsapp, Telegram and similar) won't be accepted as valid contributions.</li>
            <li>Only ads on Search engines, Social media platforms, Thunderclap campaigns, posts on social media accounts with at least 10000 followers / potential audience will be accepted as valid contributions.</li>
            <li>You must have reached at least an audience of 1000 people.</li>
            <li>You must include links and proofs of the visibility effort you made and write down the results.</li>
            <li>You must provide a clear way to recognise you are the author of the social effort, by matching your Steem/Utopian account with the one on the social platforms or by using any other field to immediately verify that.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'documentation':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="documentation"/> Documentation Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>Only merged Pull Requests on the official repository will be accepted or on a fork as long as the fork is not just a mirror of the original one.</li>
            <li>This category is meant only when working on the Official documentation of an Open Source project.</li>
            <li>If your username on Github does not correspond to the Utopian username you must use the "Name" field in the Github settings and enter there your Utopian/Steem username to verify you are the author.</li>
            <li>Documentation category is meant only for the official project documentation. Use the Tutorials category if this is not the case.</li>
            <li>If you are not pasting the entire documentation here you must provide public links to it.</li>
            <li>You must link Pull Requests you have submitted on Github for the official documentation using the functionality provided in the editor.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'tutorials':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="tutorials"/> Tutorial Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for providing tutorials about an Open Source project.</li>
            <li>Machine translated tutorials will be rejected.</li>
            <li>Tutorials may only be about the technical aspects of the project or how-tos for the final users.</li>
            <li>End-user focused tutorials must address a minimum of three substantial concepts that are unique to the Open Source project and essential learning requirements for end-users. Preference is given to tutorials that are part of a curriculum (series) of tutorials all of which are sequential and built on previously learned skills and knowledge. Ubiquitous functions, such as Save, Open, and Print are unacceptable as substantial concepts.</li>
            <li>Trivial on-screen installation processes are not acceptable as valid tutorials.</li>
            <li>Gameplay is not acceptable as a valid tutorial.</li>
            <li>How-tos about graphic and design softwares are not acceptable as valid contributions.</li>
            <li>Tutorials can be in any language.</li>
            <li>If your tutorial also contains a video you should use the Video Tutorials category.</li>
            <li>You must write the entire tutorial on the Utopian Post</li>
            <li>Tutorials should made up a course curriculum, while not mandatory this is highly suggested.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'video-tutorials':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="video-tutorials"/> Video Tutorial Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for providing video tutorials about an Open Source project.</li>
            <li>Video Tutorials using a machine voice will be rejected.</li>
            <li>The video and audio recording should be in HD (720 the min).</li>
            <li>Video Tutorials may only be about the technical aspects of the project or how-tos for the final users.</li>
            <li>End-user focused tutorials must address a minimum of three substantial concepts that are unique to the Open Source project and essential learning requirements for end-users. Preference is given to tutorials that are part of a curriculum (series) of tutorials all of which are sequential and built on previously learned skills and knowledge. Ubiquitous functions, such as Save, Open, and Print are unacceptable as substantial concepts.</li>
            <li>Trivial on-screen installation processes are not acceptable as valid tutorials.</li>
            <li>Gameplay is not acceptable as a valid tutorial</li>
            <li>How-tos about graphic and design softwares are not acceptable as valid contributions.</li>
            <li>Video Tutorials can be in any language. </li>
            <li>You must embed the video directly in this post. Youtube or Dtube videos are accepted.</li>
            <li>Video Tutorials should made up a course curriculum, while not mandatory this is highly suggested.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'copywriting':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="copywriting"/> Copywriting Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for showing copywriting work you have completed for an Open Source project.</li>
            <li>Linking pull requests from Github is encouraged, but not required if not applicable. </li>
            <li>Contents of your copywriting can be in any language.</li>
            <li>You must be the author of the copywriting work and provide a clear way to verify that.</li>
            <li><a href="https://en.wikipedia.org/wiki/Copywriting">Read the official Wikipedia explanation for what acceptable Copywriting work is.</a></li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'blog':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="blog"/> Blog Post Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
        <li>You must provide an original and unique editorial content of very high quality, not only news found on the web or general thoughts.</li>
        <li>Blogs must be strongly related to the promotion and development of an open-source project.</li>
        <li>Blogs must have a unique and consistent format. Posts must be part of a series and contain links to previous parts.</li>
        <li>The first blog post of a series, must contain clear explanations and expectations about the series.</li>
        <li>Blog posts must provide detailed content and overviews related to the open-source projects.</li>
        <li>Images, screenshots, links and examples are not necessary but preferred.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.
          </p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
  }
};
