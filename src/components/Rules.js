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
            <li>Only merged Pull Requests will be accepted.</li>
            <li>Only merged Pull Requests on the official repository will be accepted or on a fork as long as the fork is not just a mirror of the original one.</li>
            <li>The contribution will be rejected if the merged Pull Request is <b>older than 7 days</b> since the submitted contribution.</li>
            <li>Simple and common code snippets that can be easily found or reproduced can't be submitted in the development category.</li>
            <li>You must always link the merged pull requests with the given functionality in the editor.</li>
            <li>If your username on Github does not correspond to the Utopian username you must use the "Name" field in the Github settings and enter there your Utopian/Steem username to verify you are the author.</li>
            <li>Images, screenshots, links and examples are not necessary but preferred.</li>
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
            <li>In this category you can only report bugs you have found in an Open Source project.</li>
            <li>You must provide every possible detail to reproduce the bug.</li>
            <li>You should show a video or an animated GIF if the bug can be recorded on screen.</li>
            <li>You must include: browsers, devices, operating systems used and similar info to reproduce the bug.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.</p>
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
            <li>This category is meant only for graphics/videos/motion graphics you have realised for an Open Source project.</li>
            <li>Use of templates is prohibited, the contribution must be direct result of your own work.</li>
            <li>T-shirts and merchandising in general are not valid contributions in Utopian.</li>
            <li>You must provide a link or credit to all assets you have used in your contribution and make sure you have permission to use them for commercial use. including: images, videos, fonts, 3D models, etc.</li>
            <li>You must provide samples of your creations directly on this post and include public links to the full design.</li>
            <li>You must include every possible detail to verify the work done.</li>
            <li>If you are spontaneously contributing by enhancing an existing design, you must provide all the details to compare your work with the existing one and the reasons/benefits why your work should be accepted.</li>
            <li>You must provide the editable files, as .Svg .Eps .Pdf ( .Ai .Psd .Cdr. ) . Flatten and rasterized layers are not editable.</li>
            <li>You should also provide the different variations in terms of sizes, colors and applications of your graphic design.</li>
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
            <li>You must provide an original and a unique editorial content of very high quality that is strongly related to the promotion and development of open-source related projects. Blogs must have a unique and consistent format.</li>
            <li>Blog posts must be part of a series. You must use the provided template and link other blog posts of your series</li>
            <li>If this is the first blog post of a series you are going to write, there must be clear explanations and expectations about the series you are going to propose.</li>
            <li>You may only write blog posts that are related to the promotion, development and functions of open-source projects.</li>
            <li>Blog posts must provide detailed content and overviews related to the open-source projects.</li>
            <li>Blog posts can be in any language. </li>
            <li>Images, screenshots, links and examples are not necessary but preferred.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your contribution won't be accepted.
          </p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
  }
};
