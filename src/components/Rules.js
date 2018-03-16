import React from 'react';
import CategoryIcon from './CategoriesIcons';
import Action from './Button/Action';

const AcceptRules = ({acceptRules}) => (
  <Action
    className="accept-rules-btn"
    primary
    text={'I understand. Proceed'}
    onClick={e => {
      e.preventDefault();
      acceptRules();
    }}
  />
);

const SyncGithub = () => (
  <Action
    className="accept-rules-btn"
    disabled
    primary
    text={'Your Utopian account must be connected to your GitHub account'}
    onClick={e => {
      e.preventDefault();
    }}
  />
);

export const Rules = ({type, acceptRules, inEditor, githubSynced}) => {
  switch(type) {
    case 'ideas':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="ideas"/> Suggestion Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>Suggestions are minor features / enhancements to an Open Source project.</li>
            <li>Suggestions may only relate to significant technical aspects of the project (rather than processes or organisational issues).</li>
            <li>Suggestions must provide all the information and details for the requested features to be actualized.</li>
            <li>Images, charts, screenshots, links and examples should be included contributions to this category.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'development':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="development"/> Development Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Acceptable submissions in the development category include (1) Bug Fixes; (2) New Features and (3) Contributor’s Own Projects.
          </p>
          <ul>
            <li>Contributions must have a comprehensible commit history. Projects or updates submitted in a single commit will not be accepted.</li>
            <li>Outdated or low quality code will lead to rejection.</li>
            <li>Generated code or other results of automated processes will not be accepted.</li>
            <li>Submitted projects must have unique value. Redundant projects will not be accepted.</li>
            <li>Trivial code snippets, example code or simple templates will not be accepted.</li>
            <li>Bug Fixes and New Features must be submitted via Pull Requests. The Pull Request must have been merged within the past 14 days.</li>
            <li>Updates on Own Projects can be committed directly, without a Pull Request. Commits must not be older than 14 days.</li>
            <li>Bug Fixes for contributor’s Own Projects will not be accepted, unless the Bugs were caused by third party dependencies.</li>
            <li>The repository must contain a readme file with usage and install instructions, as well as an appropriate open source license.</li>
          </ul>
          {inEditor ? (githubSynced ? <AcceptRules acceptRules={acceptRules} /> : <SyncGithub />)  : null}
        </div>
      )
    case 'bug-hunting':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="bug-hunting"/> Bug Hunting Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Acceptable contributions in this category must include Bug Reports for actively maintained Open Source projects on GitHub.
          </p>
          <ul>
            <li>The repository on GitHub must <a href="https://help.github.com/articles/about-issues/" target={'_blank'}>accept issues</a>.</li>
            <li>Bug Reports for projects in <a href="https://en.wikipedia.org/wiki/Software_release_life_cycle" target={'_blank'}>pre-alpha stage</a> will not be accepted.</li>
            <li>Cosmetic issues that do not affect the functionality of the software will not be accepted.</li>
            <li>Submissions must include sufficient detail to reproduce the bug.</li>
            <li>Submissions must Include information about the debugging technical environment such as Device, Operating System, Browser and Application versions used.</li>
            <li>Submissions must refer to bugs on the latest released version of the application (not older versions).</li>
            <li>Submission title must briefly describe the occuring issue and include searchable keywords.</li>
            <li>Bug Reports previously submitted as issues on GitHub (either by the contribution author or another party), will not be accepted. Approved Bug Reports will automatically be published on GitHub.</li>
            <li>Submissions should include screenshots, video recordings or animated GIFs if they can help to describe and understand the bug reported.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'translations':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="translations"/> Translations Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Acceptable contributions in this category must include original translations created or updated for an active Open Source project.
          </p>
          <ul>
            <li>Translations must be explicitly requested by the project owner. A link to the respective Task Request must be provided.</li>
            <li>Before you become active, you must obtain the direct permission of the project owner.</li>
            <li>Submissions must have a minimum of 2000 words per translation contribution.</li>
            <li>Translation of static text (that is supposed to remain untranslated) like links, code and paths, will lead to immediate rejection.</li>
            <li>Duplicated strings / text cannot be counted toward the minimum translation volume requirements.</li>
            <li>Shorter translations can be accepted if the total volume of text in the project is less than 2000 words. Note that this may lead to a lower vote from Utopian or rejection if the work done is found trivial, incomplete or lacking in any way.</li>
            <li>Full translations are always preferred. Partial translations must be cohesive and consistent with existing translations to other parts of the project.</li>
            <li>If a contributor’s lack of proficiency in the source or target language of the translation is apparent, the submission will be rejected.</li>
            <li>Translating books or git-books or the content of repositories that do not contain programming code, will lead to immediate rejection unless the repository has been included in the Utopian whitelist.</li>
            <li>Translations submitted on CrowdIn must be proofread.</li>
            <li>The CrowdIn account of the contributor must be public and include verifiable activity and proof of identity on the profile. The profile must include at least 30 days of global activity before submitting contributions to Utopian.</li>
            <li>The CrowdIn account of the proofreader verifying the contributed translation must also have at least 30 days of activity to be accepted.</li>
            <li>Non-CrowdIn translation contributions must be provided as a <a href="https://help.github.com/articles/about-pull-requests/" target={'_blank'}>Pull Request</a> on the GitHub repository of the project.</li>
            <li>The Pull Request must have been merged within the past 14 days.</li>
            <li>Updates on Own Projects can be committed directly, without a Pull Request. Commits must not be older than 14 days.</li>
            <li>Submissions must include extensive detail to allow for the proofing of the translation, as well as the tools used to translate (when applicable).</li>
            <li>Translations of the same text by different contributors will be accepted only if the moderator can recognise the newest translation as one of higher quality that ones previously submitted.</li>
            <li>Translations of obviously low quality and machine-generated translations (more than 10% of the text) will be rejected immediately and the user submitting it may be banned.</li>
            <li>Proofreading is not accepted as a valid contribution.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'graphics':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="graphics"/> Graphics Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submissions to this category must include (1) graphics; (2) videos and/or (3) motion graphics created for an open source project by the contributor.
          </p>
          <ul>
            <li>Any type of graphics submissions is acceptable only if it was explicitly requested by the project owner or if the contributor can provide a clear proof that their submission has been accepted and used in the project.</li>
            <li>The submission must be a direct result of the contributor’s own work. It is strictly prohibited to modify other people’s work/assets or use a template and claim it as original work.</li>
            <li>T-shirts and merchandise production will be rejected.</li>
            <li>Submissions must include sufficient detail to allow for author verification to ensure the work was done by the contributor.</li>
            <li>Submissions must contain the final product (downloadable file of the work), sample of the work, applications of it, comparison to the existing product, and benefits of the work to the project owner.</li>
            <li>Graphics submissions (excluding logo designs) should be delivered in .psd, .ai, .cdr or any other universally accepted file format.</li>
            <li>Logos must be delivered in a vector file (e.g. .eps/.svg/.pdf) for flexibility and scalability, as well as .png file format for immediate use of the logo.</li>
            <li>Logo design submissions must contain the actual logo (logomark/logotype), the logo in a form of an app icon in case that the project has a mobile application, logo variations in terms of size and colour (one colour and full-colour versions).</li>
            <li>Any text or fonts must be converted into shapes or “outlined”.</li>
            <li>Submissions must include credits to all third-party images/assets used in the contribution. It is up to the contributor to ensure they have permission to use these assets (images, videos, fonts, 3D models etc.) for commercial use.</li>
            <li>Intro videos are acceptable only if the contributed video replaces an existing one of inferior quality already included in the project or if it was explicitly requested by the project owner.</li>
            <li>All submissions must be licensed under the <a href="https://creativecommons.org/choose/" target={'_blank'}>creative commons license</a>.</li>
            <li>All designs should be delivered in a vector format unless otherwise specified by the project owner.</li>
            <li>Submissions should (ideally) be coordinated with the project owner throughout the design process.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'analysis':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Analysis Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Valid submissions to this category must include data analysis generated for an Open Source project.
          </p>
          <ul>
            <li>Submissions must include the reasons for the analysis performed and its results.</li>
            <li>Submissions must include (when applicable) example scripts used for the generation of the results, or extensive information detailing how the data was gathered and analyzed.</li>
            <li>Submissions must include visual representation of analysis result in the form of charts and tables.</li>
            <li>Submissions including recurring analyses that are obviously script generated will lead to a lower vote.</li>
            <li>If submissions include partial analysis, public links to the full analysis must be provided.</li>
            <li>Submissions containing mainly data visualization without any conclusions or predictions based on the gathered data will be rejected.</li>
            <li>Analyses of social and behavioural changes of a specific group involved in the project will be rejected.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'social':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Visibility Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submission to this category must include proof of results in online and social media engagement for an Open Source project that was driven by promotional activities on public channels online.
          </p>
          <ul>
            <li>Visibility efforts must be explicitly requested by the project owner and meet their requirements. A link to the respective Task Request must be provided.</li>
            <li>Before you become active, you must obtain the direct permission of the project owner and clarify the details.</li>
            <li>Valid submissions to the visibility category are (1) paid search engine and display ads placement; (2) paid social media ads; (3) Thunderclap campaigns and (4) posts to social media accounts with at least  10,000 unique followers.</li>
            <li>Promotions on chat platforms (e.g. Whatsapp, Telegram and similar) will not be accepted as valid submissions.</li>
            <li>The campaign must have a total reach of at least 10,000 unique users and proof of valid user engagement (over 1.5% on Twitter and 1% on Facebook).</li>
            <li>Submissions must include valid and verifiable proof of the visibility activities undertaken including:</li>
            <li>Downloadable reports (when available) pertaining the activity.</li>
            <li>Screenshots of the promotional activity from the platform used.</li>
            <li>Links to promoted content.</li>
            <li>Ad copy and graphics used in the campaign.</li>
            <li>An overview of the goals, bidding strategy, details and choice of target audience, reasoning of said choice, as well as results of the campaign.</li>
            <li>Submissions of campaigns on Open Source projects with more than 100,000 users will be accepted only if the submission includes proof of project owner request for promotional activity performed.</li>
            <li>Submissions must include proof of authorship by matching the Steem / Utopian account of the contributor to that used in the campaign, or any other means of verification.</li>
            <li>Ad content and social media messages in any language other than English must be accompanied by a translation.</li>
            <li>Ad content and targeting chosen must show the contributor’s understanding of the project and experience in its applications and uses.</li>
            <li>Submission of Instagram campaigns will not be accepted.</li>
            <li>Low quality ads, ads that containing obvious grammatical and/or copyrighted content will be rejected.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'documentation':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="documentation"/> Documentation Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submissions to this category are limited to official documentation of Open Source projects on GitHub.
          </p>
          <ul>
            <li>Only merged Pull Requests on the official repository or on a fork will be accepted, as long as the fork is not just a mirror of the original repository.</li>
            <li>If the submission does not include the full documentation project, public links to it must be provided.</li>
            <li>Unofficial documentation will not be accepted in this category.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'tutorials':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="tutorials"/> Tutorial Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submissions to this category must include technical instructions that use text and graphics to clearly explain and teach significant aspects of an Open Source project.
          </p>
          <p>
            Contributors may refer to the following resource when writing tutorial submissions - <a href="https://owl.english.purdue.edu/owl/resource/656/02/" target={'_blank'}>https://owl.english.purdue.edu/owl/resource/656/02/</a>.
          </p>
          <ul>
            <li>Submissions presenting content creation and simple on-screen instruction will be rejected.</li>
            <li>End-user focused tutorials must provide clear instruction of substantial project functions that are unique to that specific Open Source project and essential learning requirements for end-users.</li>
            <li>Submissions addressing only circuit design and/or the build of specific electronic modules will be rejected.</li>
            <li>Submissions focused on the use of functions that are already well documented in the project documentation will be rejected.</li>
            <li>Submissions containing substantial instruction in ubiquitous functions (Save, Open, Print, etc.) or basic programming concepts (variables, operators, loops, etc.) will be rejected.</li>
            <li>Submissions must include the full tutorial in the Utopian post.</li>
            <li>A submission may be rejected if the moderator provides a link to a superior tutorial on the same subject.</li>
            <li>Machine translated tutorials will be rejected.</li>
            <li>Contributors providing a video version of a text tutorial must embed or a link to the video in the post. Contributors cannot submit this video as a separate contribution in the Video Tutorial category.</li>
            <li>Submissions that include a GitHub repository with additional materials (like code samples), should be linked to the repository of the original project discussed in the tutorial and not the supplementary repository created for the contribution. Links to the supplementary repository for the post should be included in the submission post.</li>
            <li>Submissions containing unexplained essential steps, codes or examples will be rejected.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'video-tutorials':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="video-tutorials"/> Video Tutorial Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submission to this category must include technical instructions that explain and teach significant aspects of an Open Source project, and must be presented in video format.
          </p>
          <ul>
            <li>Submissions about the usage of functions which are already well documented in the project documentation are not accepted.</li>
            <li>End-user focused tutorials must provide clear instruction of substantial project functions that are unique to that specific Open Source project and essential learning requirements for end-users.</li>
            <li>Tutorials containing process videos, such as gameplay, content creation and simple on-screen instruction will be rejected.</li>
            <li>Tutorials containing substantial instruction in ubiquitous functions (Save, Open, Print, etc.) or basic programming concepts (variables, operators, loops, etc.) will be rejected.</li>
            <li>Submissions must include mention of the contributor’s Utopian account name at  the beginning of the video.</li>
            <li>Submissions must include supplementary text following the contribution template found in the Utopian.io contribution editor.</li>
            <li>A submission may be rejected if the moderator provides a link to a superior tutorial on the same subject.</li>
            <li>Video tutorials must be presented in an organized and well prepared fashion. Presenters must speak clearly and professionally and videos must not contain any substantial pauses.</li>
            <li>Video Tutorials using machine generated voice-over will be rejected.</li>
            <li>Video resolution must be a minimum of 720p (HD). Audio must high quality and not contain any substantial background noise or distortions.</li>
            <li>Submitted video must be hosted on either YouTube or DTube and embedded in the submission post. The hosting YouTube or DTube account must be clearly associated with the contributor.</li>
            <li>Submitted video must not be older than 14 days.</li>
            <li>Contributors providing a text version of a video tutorial must include the text or a link to the text in the post. Contributors cannot submit this text as a separate contribution in the Tutorial category.</li>
            <li>Submissions that include a GitHub repository with additional materials (like code samples), should be linked to the repository of the original project discussed in the tutorial and not the supplementary repository created for the contribution. Links to the supplementary repository for the post should be included in the submission post.</li>
            <li>Submissions containing unexplained essential steps, codes or examples will be rejected.</li>
            <li>Submissions addressing only circuit design and/or the build of specific electronic modules will be rejected.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'copywriting':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="copywriting"/> Copywriting Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submissions to this category are limited to copywriting of text content for Open Source projects on GitHub.
          </p>
          <ul>
            <li>Submissions to this category must include verifiable proof of authorship for the work done.</li>
            <li>Only merged Pull Requests on the official repository or on a fork will be accepted, as long as the fork is not just a mirror of the original repository.</li>
            <li>If the submission does not include the full project, public links to it must be provided.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
    case 'blog':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="blog"/> Blog Post Rules</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Submissions to this category are designated to promote open source projects and to inform about their development. The post may be one of the following: (1) Project Promotion, (2) Project Introduction, (3) Development Log. Regardless of the type of the blog post, unique and insightful editorial content in a professional format are expected, ideally with high-quality visual supplement.
          </p>
          <ul>
            <li>The project introduction and development logs are reserved for project owners and closely collaborating members who have been appointed to publish the article.</li>
            <li>Project introduction must include detailed roadmaps and overviews. It should contain differences with similar projects and highlight its unique aspects.</li>
            <li>Development logs should incorporate details of meaningful changes and an overview of new features. Development logs are not meant for minor version changes and bug fixes only. Project owners can't present such posts in blog category if they submitted said information as a development contribution.</li>
            <li>Project promotion contributions must include author's personal experience with the project. Blog post with information processed from official sites and materials, and with no additional value will not be accepted. General promotion posts about the projects are not allowed. Only promotion of new features, events and innovations of the project may be approved.</li>
            <li>Promotion posts may include reports from recent conferences and social events dedicated to the project, which the author attended.</li>
            <li>Project owners can submit detailed results and summaries of recent public contests and task requests.</li>
            <li>Submissions should include illustration images, screenshots, links and examples. Submissions without high quality visual content will be rewarded with a lower vote.</li>
            <li>Content and format of the submissions should be unique to the author. Submissions without original content will be directly rejected.</li>
            <li>In the first submission of a blog posts series, it must provide a list of the following submissions and expectations of the series. Blog posts of a series must include links to the previous parts of the series.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} />  : null}
        </div>
      )
  }
};
