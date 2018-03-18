import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rules } from '../components/Rules';
import { RulesTask } from '../components/RulesTask';

import './Rules.less';

export default props =>
  (<div className="main-panel rules-section">
    <div className="container text-center my-5">

      <h1>General Rules</h1>

      <p>
        These are the rules that apply, if you want to submit a contribution to Utopian. If you have more general questions about Utopian please refer to our <NavLink className="CookiePolicyBanner__PolicyLink" to="/faq">Frequently Asked Questions</NavLink>.
      </p>

      <p>
        <b>Failing to adhere to one or more of the rules set below will lead to the immediate rejection of your contribution. Please be sure to read and understand the rules before submitting a contribution.</b>
      </p>

      <p>
        <b>Utopian moderators / supervisors have the full right to reject or accept submissions and to assess its quality, even if the submission meets all the rules.</b>
      </p>

      <p>
        <b>Supervisors may revert an accepted / rejected contribution.</b>
      </p>

      <h2>Rules vs Guidelines</h2>
      <p>
        Some of the instructions in this document are designated as <i>guidelines</i> in italics. Failure to follow these guidelines will not lead to immediate rejection, but instead to a notification from the category Moderator asking the submission to be corrected.
      </p>
      <p>
        Repeated failures to follow guidelines may lead to the rejection of your submissions.
      </p>

      <h2>Bans and Downvotes</h2>
      <p>
        The following behaviors may lead to a temporary or permanent ban from Utopian:
      </p>
      <ul>
        <li>Harassing any member of the Utopian team.</li>
        <li>Using multiple accounts to abuse the system.</li>
        <li>Consistently submitting low quality contributions even after being notified.</li>
        <li>Plagiarism.</li>
        <li>Inclusion of licensed or commercial materials or failing to cite the source of Creative Commons media even after being notified.</li>
        <li>Tag spamming.</li>
      </ul>

      <h2>Vote and Approval Retraction</h2>
      <ul>
        <li>Submissions found in violation of Utopian rules can be unvoted or rejected even after they have been accepted.</li>
        <li>Erroneous (accidental) Utopian upvotes will be retracted.</li>
      </ul>

      <h2>Post Writing and Style</h2>
      <p>
        To be accepted, submissions must be written in a formal and professional style. A moderator may reject a contribution if the writing is unprofessional or unclear.
      </p>
      <ul>
        <li>The writing style should be formal and informative.</li>
        <li>The writing style should be professional and clear.</li>
      </ul>
      <p>Guidelines:</p>
      <ul>
        <li><i>Sentences like: “Hello Utopians, What’s up Steemians, Dear friends” and similar informal greetings may lead to rejection.</i></li>
        <li><i>Images and videos used in contribution submissions should be of high resolution. Low resolution images and videos may be rejected.</i></li>
        <li><i>Submissions with grammar issues that make the content difficult to understand may be rejected.</i></li>
        <li><i>Failure to apply the templates provided in the editor for each category may lead to rejection. The standard contribution submission templates should be followed when detailing your contribution. However, templates can be edited and extended as long as the formatting is clear.</i></li>
        <li><i>Contributors may refer to the following resource when writing contribution submissions - <a href="https://owl.english.purdue.edu/owl/resource/656/02/" target={'_blank'}>https://owl.english.purdue.edu/owl/resource/656/02/</a></i></li>
      </ul>

      <h2>Contribution Value, Volume and Detail</h2>
      <ul>
        <li>The contribution must add value to the Open Source project. Moderators may reject (at their discretion) submissions that offer little to no added value to the project.</li>
        <li>The contribution must be informative and contain as much detail as possible describing the work done.</li>
        <li>When applicable, graphical content like images, charts, videos and screenshots must be included.</li>
        <li>The length of the body of the contribution should be sufficient to provide a thorough overview of the submitted contribution.</li>
        <li>Every contributor may only submit ONE contribution post per task request. Use of multiple accounts to circumvent this rule will lead to immediate ban from Utopian services.</li>
      </ul>

      <h2>Submission Language</h2>
      <p>
        Only contribution posts written in plain and easily understood English will be accepted.
      </p>

      <h2>Github Integration and Repositories</h2>
      <p>
        <b>Unless otherwise specified, Utopian contributors must have an active GitHub account connected to the contributor’s Utopian profile.</b>
      </p>
      <ul>
        <li>Only contributions made to open source projects with a GitHub repository can be approved.</li>
        <li>The Github repository linked to a Utopian contribution post must contain the project’s source code, a readme and a license.</li>
        <li>A contributor’s Utopian account must be connected to their GitHub account.</li>
        <li>Contributions for un-official repositories will only be accepted if the repository is listed in <a href="https://docs.google.com/spreadsheets/d/1RMQyfqKRmgeIWPM80h31hS1NdLxqLJ6qy3I5ucNGuuc/edit?usp=sharing" target={'_blank'}>Utopian un-official repository whitelist.</a></li>
        <li>Contributions for repositories listed on <a href="https://docs.google.com/spreadsheets/d/1q49j3mjjJVwqxRUdX0sqEApV7mAVil-K-OS-lKlFP_Y/edit?usp=sharing" target={'_blank'}>Utopian repository blacklist</a> will be automatically rejected.</li>
        <li>Contributions on official repositories that are mirrors of another subversioning system will be accepted.</li>
        <li>Contributions on repositories that have not received any program code updates for longer than 6 months, will be automatically rejected.</li>
        <li>Contributions on forks that do not have any difference / improvement over the original project will not be accepted.</li>
        <li>Contributions to repositories that contain books, texts or other types of content but no software code will be rejected.</li>
      </ul>

      <h2>Submission Originality</h2>
      <p>
        All submitted contributions <b>must be unique</b>. Users must check if an identical or very similar contribution has been previously submitted.
      </p>
      <ul>
        <li>Duplicate submissions (by the same or different user) will be automatically rejected.</li>
        <li>Content shared previously will be rejected if a moderator discovers plagiarism, and the user submitting it will be banned from Utopian.</li>
      </ul>

      <h2>Contribution Authorship</h2>
      <ul>
        <li>The contribution must provide the information necessary to verify the identity of the contributor as the post author.</li>
        <li>If a contributor’s Steem / Utopian username does not match the username used in an external platform, they must either edit the username on the external platform, or provide alternative means of verification.</li>
      </ul>

      <h2>Forbidden Content</h2>
      <h3>Commercial / Copyrighted Materials</h3>
      <p>
        Submissions and contributions must not include any commercial or copyrighted materials.
      </p>
      <ul>
        <li>Images and videos used must be distributed under the Creative Commons license and content source must be cited (when applicable).</li>
        <li>Contributors assume full responsibility if and when using copyrighted or commercial materials without proper permission.</li>
      </ul>
      <h3>Spam</h3>
      <ul>
        <li>The contribution should not contain any clear attempt to profit solely from a commercial perspective, and should not be written in a way that suggests the contributor is looking to maximise the returns.</li>
        <li>The author may include links to his social profiles in his submission if they appear in a non-disruptive way.</li>
        <li>Links to commercial products and affiliate links are forbidden.</li>
        <li>Tagging or mentioning other Steem / Utopian users without an appropriate reason should be avoided.</li>
      </ul>
      <h3>Defamation</h3>
      <ul>
        <li>Contributions and comments must not include offensive speech directed at others.</li>
        <li>Contributions and comments may not contain false information about another user that may be perceived as defamatory.</li>
      </ul>
      <h3>Solicitation</h3>
      <ul>
        <li>Contributors should not use submission posts to solicit for any activity that it is not strictly accepted by Utopian Rules.</li>
        <li>Contributors should not ask for Steem / Steemit engagement (upvotes, resteems and follows) in their contribution posts.</li>
        <li>Contributors should not ask for Utopian engagement (upvotes and follows) in their contribution posts.</li>
        <li>Contributors may ask for Steem witness votes in a short request (one paragraph) at the footer of their post.</li>
      </ul>
      <h3>Religious / Political Content</h3>
      <ul>
        <li>Content that disseminates religious or political ideologies or beliefs of any kind is rejected.</li>
      </ul>

      <div>
        <h1>Categories Rules</h1>
        <Rules inEditor={false} type="ideas" />
        <Rules inEditor={false} type="development" />
        <Rules inEditor={false} type="bug-hunting" />
        <Rules inEditor={false} type="translations" />
        <Rules inEditor={false} type="graphics" />
        <Rules inEditor={false} type="analysis" />
        <Rules inEditor={false} type="social" />
        <Rules inEditor={false} type="documentation" />
        <Rules inEditor={false} type="tutorials" />
        <Rules inEditor={false} type="video-tutorials" />
        <Rules inEditor={false} type="copywriting" />
        <Rules inEditor={false} type="blog" />
      </div>

      <div>
        <h1>Task Request Rules</h1>
        <p>
          Task requests should be submitted by an Open Source project owner seeking contributions to their project.
        </p>
        <ul>
          <li>Submitted tasks must be explained in great detail and provide all the necessary details for it to actually be completed.</li>
          <li>Every Task Request Submission post must include one task request only. Submissions with multiple tasks requests will be rejected.</li>
          <li>Task Request Submissions must be related to the category where the task request is being submitted.</li>
          <li>Generic Task Request Submissions, like "We are looking for contributors" will be rejected.</li>
          <li>Task Request Submissions must include a means of communication for the contributor to contact the task publisher.</li>
          <li>Task Request Submissions must specify a deadline.</li>
          <li>If no feedback or input from the project owner was received in 2 days, moderators will evaluate the submission at their own discretion.</li>
        </ul>

        <div>
          <RulesTask inEditor={false} type="task-ideas" />
          <RulesTask inEditor={false} type="task-development" />
          <RulesTask inEditor={false} type="task-bug-hunting" />
          <RulesTask inEditor={false} type="task-translations" />
          <RulesTask inEditor={false} type="task-graphics" />
          <RulesTask inEditor={false} type="task-documentation" />
          <RulesTask inEditor={false} type="task-analysis" />
          <RulesTask inEditor={false} type="task-social" />
        </div>
      </div>

      <div>
        <h1>Reporting a Moderation Issue</h1>
        <p>
          Get in touch with the Supervisor assigned to the moderator that reviewed your submission. <a href="https://docs.google.com/spreadsheets/u/1/d/11AqLQPgULU4F7fIwfArqYdAcexufSH3IBEY32yVVm4I/edit?usp=drive_web" target={'_blank'}>Find them on this document</a>.
        </p>
      </div>

    </div>
  </div>);
