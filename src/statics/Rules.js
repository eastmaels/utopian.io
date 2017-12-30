import React from "react";
import {Rules} from "../components/Rules";
import "./Rules.less";

export default (props) =>
  (<div className="main-panel rules-section">
    <div className="container text-center my-5">
      <h2>
        See our FAQ
      </h2>
      <p>
        Click <b><a href="/faq">here</a></b> to view our <em>Frequently Asked Questions</em> (FAQ) page, where we detail the most asked questions and their answers.
      </p>
      <br />
      <h2>
        No Commercial/Copyrighted Materials
      </h2>
      <p>
        No commercial or copyrighted material should ever be used in a contribution.</p>
      <ul>
        <li>
          Only Creative Commons for Images and Videos can be accepted.
        </li>
        <li>
          You retain full responsibility if using copyrighted or commercial materials you are not allowed to use.
        </li>
      </ul>
      <br />
      <h2>
        Check the Github Repository
      </h2>
      <p>
        The linked Github repository <b>must be the correct one</b> and must actually contain code on Github. If this rule is not met, the contribution won't be accepted. A moderator can request for a change. The repository can be updated by editing the contribution.</p>
      <ul>
        <li>
          Contributions for un-official repositories will only be accepted if present in <a href="https://docs.google.com/spreadsheets/d/1RMQyfqKRmgeIWPM80h31hS1NdLxqLJ6qy3I5ucNGuuc/edit?usp=sharing">Utopian un-official repos whitelist</a>
        </li>
        <li>
          Contributions on <b>official</b> repositories that are just mirrors are always accepted.
        </li>
        <li>
          Contributions on repositories that had no updates for <b>longer than 1 year</b>, will be rejected.
        </li>
      </ul>
      <br />
      <h2>
        Check the Category
      </h2>
      <p>
        The contribution must be actually related to the category where it has been submitted. A moderator can request to change the category. The category can be updated by editing the contribution. See the available categories below.
      </p>
      <br />
      <h2>Contributions should be Formal and Professional</h2>
      <p>A moderator may reject a contribution if it is not written in a formal and professional style.</p>
      <ul>
        <li>
          The writing style should be formal not informal.
        </li>
        <li>
          The writing style should be professional.
        </li>
        <li>
          Quality of the images and videos should be high. Low res images and videos will be rejected.
        </li>
        <li>A contribution with bad grammar may be rejected if the contents may be really hard to understand.</li>
      </ul>
      <h2>Contributions should be Informative and Narrative</h2>
      <p>
        The contribution must contain as much detail as possible and have some graphical content in it (images, charts, videos, etc) where applicable. The length of the body of the contribution should be enough to give every possible detail about the submitted contribution. If this rule is not met, the contribution won't be accepted in Utopian. A moderator can request for changes before the contribution will be accepted. </p>
      <b>Some categories do not have to bind to this rule:</b>
      <ul>
        <li>Contributions on the Development category do not have to be narrative as long as the contributor gives enough details to evaluate the work done.</li>
        <li>Contributions in the Bug-Hunting category do not have to be narrative as long as the contributors gives enough details to reproduce the bug.</li>
      </ul>
      <br />
      <h2>Contributions should be in English</h2>
      Contributions should be in plain English and fully understandable. The only accepted exceptions are:
      <ul>
        <li>Contributions under the Tutorials and Video Tutorials Category, and Blog posts.</li>
        <li>Open Source projects that are meant to be for specific languages only.</li>
      </ul>
      <br />
      <h2>Never Submitted Before</h2>
      <p>
        Contributions must be unique. Users must first check if the same or very similar contribution has been submitted before. A moderator will check if the contribution has been reported before and won't accept it in the Utopian feed again if so.</p>
      <ul>
        <li>Same contributions will never be accepted in Utopian twice.</li>
        <li>Contents already shared on the Steem blockchain in general may still be rejected if submitted in Utopian.</li>
        <li>Contents already shared anywhere else may still be rejected if submitted in Utopian.</li>
        <li>Same contents already shared before in Utopian or anywhere else by different users may still be rejected if a moderator recognises plagiarism.</li>
      </ul>
      <br />
      <h2>Provides Proof Of Work</h2>
      <p>
        The contribution must provide as much detail as possible to verify the actual work done. For example: links to pull requests, forks, branches etc, if it's a code contribution. Contributors must provide the usernames they use on relevant third party sites, so their work can be verified by moderators. Read all the rules for the specific Utopian categories below.
      </p>
      <br />
      <h2>Contributions Must Not Contain Spam</h2>
      <p>
        The contribution should not contain any clear attempt to profit solely from a commercial perspective, and should not be written in a way that suggests the contributor is looking to maximise the returns. Moderators will ask you to edit contributions that use unrelated tags or unnecessary/spammy information in the post. Contributors are allowed to use their signature at the bottom of the post and link to their social profiles, but in a way that does not disturb the reader. <b>Contributors must not submit the work of someone else. Plagiarism is also forbidden.</b> Moderators will flag and forever hide spam posts that bring no real value.
      </p>
      <br />
      <h2>Contributions Must Not Contain Defamation</h2>
      <p>
        Contributions must not use namecalling directed at other users of the Steem blockchain. Contributions may not contain false information about another user that may be perceived as defamatory.
      </p>
      <br/>
      <h2>Contributions Should Not Solicit for Steem/Steemit Related Activities</h2>
      <p>
        Contributors should not ask for Steem/Steemit related activities in their posts, such as upvotes, resteems and follows. This is because contributions get posted in the GitHub feed, where project maintainers have no interest in those activities.
      </p>
      <br />
      <h2>Moderators</h2>
      <p>For moderators, check <em><a href="https://utopian.io/welcome-moderator">Welcome Moderator</a></em> for guidelines on how to effectively moderate on Utopian.</p><br/>
      <p>A moderator should always give at least one opportunity to fix/edit a post, and never reject and hide it on the first sight.</p>
      <p>For contributors, remember that Utopian Moderators reserve the right to a) verify acceptable posts, b) deliberate and review pending posts, and c) flag/hide posts that do not follow the rules or posts that are of very low quality.
        Additionally, moderators reserve the right to apply temporal or permanent bans who have shown a history of consistently disobeying the rules. <br/>
        </p>
      <p>Every moderator works on a specified set of categories and is assigned to one supervisor. You can see the spreadsheet with the moderators teams <a href="https://docs.google.com/spreadsheets/d/11AqLQPgULU4F7fIwfArqYdAcexufSH3IBEY32yVVm4I">here</a></p>
      <h2>Categories Specific Rules</h2>
      <br />
      <Rules inEditor={false} type="ideas" />
      <br />
      <Rules inEditor={false} type="sub-projects" />
      <br />
      <Rules inEditor={false} type="development" />
      <br />
      <Rules inEditor={false} type="bug-hunting" />
      <br />
      <Rules inEditor={false} type="translations" />
      <br />
      <Rules inEditor={false} type="graphics" />
      <br />
      <Rules inEditor={false} type="analysis" />
      <br />
      <Rules inEditor={false} type="social" />
      <br />
      <Rules inEditor={false} type="documentation" />
      <br />
      <Rules inEditor={false} type="tutorials" />
      <br />
      <Rules inEditor={false} type="video-tutorials" />
      <br />
      <Rules inEditor={false} type="copywriting" />
      <br />
      <Rules inEditor={false} type="blog" />

      <br />
      <hr />
      <br />

      <h2>Task Requests</h2>
      <p>
        Task requests are meant to be made by the project owner when looking for contributions.
        A task must be explained in great detail and provide all the necessary details for it to actually be completed. In one task request, there should not be more than one task; and if more, they must be related to the category where the task request is being submitted.
        Generic task requests, like "We are looking for contributors" won't be accepted.
        Moderators may ask that you change a task request, if it does not meet the rules.
      </p>

      <br />
    </div>
  </div>);
