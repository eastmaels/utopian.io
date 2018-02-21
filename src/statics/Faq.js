import React from 'react';
import './Faq.less';
import FAQ from '../components/faq';

export default () =>
  (<div className="main-panel FAQ">
    <div className="mt-5 text-center">
      <h1>
        <center>Frequently Asked Questions</center>
      </h1>
      <h4>
          <center>Here are the most asked questions, and their answers.</center>
      </h4>
      <div className="container pb-5">
      <FAQ></FAQ>

      <p className="Welcome__bigbreak">
      &nbsp;<br className="Welcome__bigbreak"/>
      &nbsp;<br className="Welcome__bigbreak"/>
      <br className="Welcome__bigbreak"/>
      </p> <br className="Welcome__bigbreak"/>
      </div>
      <div id="update">
        Document Last Modified <b>December 13th, 2017</b>
      </div>

    </div>
  </div>);
