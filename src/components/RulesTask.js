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
          <ul>
            <li>By submitting a task request in this category you are requesting contributors to provide concepts and ideas.</li>
            <li>You must provide great details about what you are looking for and the problems you want to solve with a concept.</li>
            <li>Images, screenshots, links and examples are always welcome in this category.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-development':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="development"/> Developers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>In this category you can only write if you are looking for developers joining your crew.</li>
            <li>You must provide all the details for the developers to contribute to your project.</li>
            <li>Documentation, Repositories, Communities (e.g. Slack, Discord) and specific details are necessary.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-bug-hunting':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="bug-hunting"/> Bug Hunters</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>In this category you can only post if you are looking to spot bugs in your system/software/website and similar.</li>
            <li>You must provide every possible detail for the bug hunters to be able to start the hunting.</li>
            <li>You must include for example browsers, devices, operating systems and similar info where you want bugs to be spotted.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-translations':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="translations"/> Translators</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>You can only post in this category if you are looking for translators to translate your project.</li>
            <li>You must provide any necessary information for the translators to start their work.</li>
            <li>Location of the files to be translated, tools to use, languages you are looking for and similar info are necessary.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-graphics':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="graphics"/> Designers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>You can only post in this category if you are looking for designers to join your Open Source project.</li>
            <li>You must provide exactly what you are looking and how would you like it to be in great details.</li>
            <li>Whether you are looking for a logo, layout, banner or similar, your request has to be very specific.</li>
          </ul>
          <p>Not respecting the rules will either give you lower votes or your announcement won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-documentation':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="documentation"/> Tech Writers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for requiring help in updating/creating the documentation of your Open Source project.</li>
            <li>You must be very specific about which part of the documentation you wish to update/create.</li>
            <li>It is important to provide the tools you wish to use and necessary info for the documentation to be actually written.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-analysis':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Data Analysts</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for requesting data analysis for your Open Source project.</li>
            <li>Your request must be very specific about the numbers you wish to extract.</li>
            <li>You must provide the tools and all the information necessary for the analyses to be actually completed.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
    case 'task-social':
      return (
        <div className="Editor__rules">
          <h2><CategoryIcon from="from-rules"  type="analysis"/> Influencers</h2>
          {inEditor ? <p><small><a href="https://utopian.io/rules" target="_blank">Read all the rules</a></small></p> : null}
          <ul>
            <li>This category is meant only for requesting help of social influencers in spreading the word about your project.</li>
            <li>You must provide any possible detail for the influencers to effectively share your Open Source project.</li>
            <li>You must also provide any graphic, video and similar digital goods the influencers are supposed to share.</li>
          </ul>
          <p>Not respecting the rules will either give you lower exposure or your task request won't be accepted.</p>
          {inEditor ? <AcceptRules acceptRules={acceptRules} /> : null}
        </div>
      )
  }
};
