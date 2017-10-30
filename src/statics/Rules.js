import React from 'react';

import './Rules.less';

export default (props) =>
  (<div className="main-panel help-section">
    <div className="container text-center my-5">
      <h2>
        Check the Github Repository
      </h2>
      <p>
        The linked Github repository <b>must be the correct one</b> and must actually contain code on Github. If this rule is not met, the contribution won't be accepted. A moderator can request for a change. The repository can be updated by editing the contribution.
      </p>
      <br />
      <h2>
        Check the Category
      </h2>
      <p>
        The contribution must be actually related to the category where it has been submitted. A moderator can request to change the category. The category can be updated by editing the contribution. See the available categories below.
      </p>
      <br />
      <h2>Contributions MUST BE Informative and Narrative</h2>
      <p>
        The contribution must contain as much details as possible and have some graphical contents into it (videos, images, etc.) where applicable. The length of the body of the contribution must be enough to give every possible detail about the submitted contribution. If this rule is not met, the contribution won't be submitted in Utopian. A moderator can request for changes before the contribution will be accepted.
      </p>
      <br />
      <h2>Contributions should be in English</h2>
      <p>
        Contributions should be in plain english and fully understandable. The only accepted exceptions are: 1. The effort to document an Open Source project in a specific language. 2. Contributions under the Translations category. 3. Open Source projects that are meant to be only for specific languages.</p>
      <br />
      <h2>Never Submitted Before</h2>
      <p>
        Contributions must be unique. A moderator will check if the contribution has been reported before and won't accept it in the Utopian feed again if so.
      </p>
      <br />
      <h2>Provides Proof Of Work</h2>
      <p>
        The contribution must provide every possible detail to verify the actual work. For example: links to pull requests, forks, branches etc. if a code contribution. Read all the rules for the specific Utopian categories below.
      </p>
      <br />
      <h2>Contributions Must Not Contain Spam</h2>
      <p>
        The contribution should not contain any clear attempt to profit from a commercial perspective and should not be written in a way that suggests the contributor is looking to maximise the returns. Moderators will require to edit the contributions that use unrelated tags or unnecessary/spammy information in the post. Contributors are allowed to use their signature at the bottom of the post and link to their social profiles, in a way that does not disturb the reader. Moderators will flag and hide forever spam posts that bring no real value.
      </p>
      <br />
      <h2>Contributions Must Not Contain Defamation</h2>
      <p>
        Contributions must not use namecalling directed at other users of steem blockchain. Contributions also may not contain false information about another user that may be perceived as defamotory.
      </p>
      <br />
      <br />
      <h2>Contributions Cannot Refer To Steem</h2>
      <p>
        Contributions cannot have any direct reference to Steem, Steemit, Steemians and similar. This is because contributions get posted in the Github feed where project maintainers have no interest in your Steemit activities. "Follow", "Upvote", "Resteem" and similar sentences are not allowed.
      </p>
      <br />
      <h2>Ideas/Feature requests Category</h2>
      <p>
        Contributions submitted under this category are the most important ones, therefore they must provide as much details as possible. Ideas and feature requests must be well explained and in great details. They must include images or videos and include any necessary information for the idea/feature to be created.
      </p>
      <br />
      <h2>Code Development Category</h2>
      <p>
        Contributions under this category must include links to pull requests, branches, forks etc. where the code has been submitted.
      </p>
      <br />
      <h2>Bug Hunting Category</h2>
      <p>
        Contributions under this category must include all the possible information for reproducing the bug. Devices, Internet connection speed, Browser version and similar info are necessary to reproduce the submitted bugs.
      </p>
      <br />
      <h2>Translation Category</h2>
      <p>
        Translations can be either submitted directly on the Utopian post or there must be a link to the translated files, in order to verify the work done.
      </p>
      <br />
      <h2>Graphics Category</h2>
      <p>
        Graphics can be either submitted directly on the Utopian post or there must be a link to the layouts, logos and creativity in general, in order to verify the work done.
      </p>
      <br />
      <h2>Documentation Category</h2>
      <p>
        Documentation can be either submitted directly on the Utopian post or there must be a link to the newly created or updated documentation, in order to verify the work done.
      </p>
      <br />
      <h2>Analysis Category</h2>
      <p>
        Analyses realised for an Open Source project have to written directly on the Utopian post or there must be links, charts, etc. to very what has been done. The contribution must also explain in great details why the analyses have been conducted and how.
      </p>
      <br />
      <h2>Visibility Category</h2>
      <p>
        These contributions serve as a way to bring more visibility to an Open Source project. They must include links to social network posts, adv and similar, plus the results of the visibility effort.
      </p>

      <br/>

      <hr />

      <h2>Announcements</h2>
      <p>
        Announcements are meant to be tasks requests made by the project owner when looking for contributions.
        A task must be explained in great details and provide all the necessary details for the task to be actually completed. In one announcement there should not be more than one task and if more they must be related to the category where the announcement is being submitted.
        Generic announcements, like "We are looking for contributors" won't be accepted.
        Moderators may request to change an announcement if it does not meet the rules.
      </p>
    </div>
  </div>);
