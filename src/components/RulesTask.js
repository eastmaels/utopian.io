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

export const RulesTask = ({type, acceptRules, inEditor}) => {
  switch(type) {
    case 'task-ideas':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="ideas"/> Conceptors/Thinkers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner for contributors to provide concepts and ideas.
          </p>
          <ul>
            <li>Submissions to this tasks category must describe in great detail the requirements and needs of the project manager.</li>
            <li>Submissions must include details defining what you are looking for and the problems you want to solve with a concept.</li>
            <li><i>Images, screenshots, links and examples should be included as part of the submission.</i></li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-development':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="development"/> Developers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner recruiting developers to the project team.
          </p>
          <ul>
            <li>Submissions must include all the relevant and necessary details for the developers to contribute to your project, such as scope, timeframe, stage of development, etc.</li>
            <li>Submissions must link to Documentation, Repositories, Communities (e.g. Slack, Discord) and any other relevant information.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-bug-hunting':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="bug-hunting"/> Bug Hunters</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner to spot bugs in their project service / system / software / website.
          </p>
          <ul>
            <li>Submissions must include all available information for bug hunters to be able to begin the bug hunting.</li>
            <li>Submissions must list the environments on which bugs should be searched for (i.e. browsers, devices, operating systems and other conditions under which bugs may appear).</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-translations':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="translations"/> Translators</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner to translate the content or documentation of their system / software / website.
          </p>
          <ul>
            <li>Submissions must specify the target language(s) and (when applicable) desired translator specialization (technical, marketing, business applications, etc.).</li>
            <li>Submissions must include: the location of the files to be translated, tools and platforms to be used and any information pertinent to the project translation.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-graphics':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="graphics"/> Designers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner recruiting designers to the project team.
          </p>
          <ul>
            <li>Submissions must include extensive detail describing the desired outcome.</li>
            <li>Submissions must include prefered file type for submission, file dimensions and any additional information necessary for the graphic component design.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-documentation':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="documentation"/> Tech Writers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner for assistance in updating / creating the documentation of their project.
          </p>
          <ul>
            <li>Submissions must include extensive detail describing the desired outcome.</li>
            <li>Submissions must include the requested features for documentations, desired length of document and any information pertinent to project documentation.</li>
            <li>Submissions must include links to the tools and information necessary for documentation production and examples (when applicable).</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-analysis':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Data Analysts</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner for statistical analysis of their project.
          </p>
          <ul>
            <li>Submissions must specify the desired insights from the analysis requested.</li>
            <li>Submissions must include specific variables and conditions to process the extracted data.</li>
            <li>Submissions must include the tools and information necessary for the analysis process.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-social':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Influencers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <p>
            Task submissions to this category must include a request by an Open Source project owner for the assistance of social influencers in creating public awareness of their project.
          </p>
          <ul>
            <li>Submissions must include the information and data necessary for influencers to effectively share the Open Source project.</li>
            <li>Submissions must include all graphic, video and other resources influencers are expected to share.</li>
            <li>Submission must detail the requirements of the visibility effort on the behalf of the influencer in terms of target audience, language and expected results.</li>
          </ul>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
  }
};
