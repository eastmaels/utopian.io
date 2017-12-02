import React from 'react';
import { FormattedMessage } from 'react-intl';
import './WelcomeModerator.less';

export default () =>
  (<div className="main-panel">
    <div className="mt-5 text-center">
      <h1>
        <center>Frequently Asked Questions</center>
      </h1>
      <h4>
          <center>Here are the most asked questions, and their answers.</center>
          </h4>
      <p className="container pb-5">
        <h2 id="post-payout">
        Post Payout
            </h2>
            <h4> Why do I see a sudden drop in earnings 7 days after I post?
                </h4>
                <p>
                This is due to how the STEEM Blockchain operates, and is not the fault of Utopian. 
                Every post <b>pays out</b> 7 days after the posting date. When that happens, the dollar value shown before has to be
                exchanged for other currencies like STEEM and SBD. This is why these rates can differ.
                    </p>
            <h4>Why does the 50/50 Rewards Mode not give me exactly the same amount of STEEM and SBD?</h4>
            <p>
                Due to the fact that the STEEM Blockchain pays out by exchanging these cryptocurrencies, there is lots of approximation.
                Your payout may not be <em>exactly</em> 50/50 but it should be quite close, if you chose that option.</p>
        <h2 id="bot-vote">
        Utopian Bot Vote 
        </h2>
            <h4>What can I do to increase my vote?</h4>
            <p>
                The Utopian Bot mirrors and amplifies human and real curators. Try to attract real followers and upvoters to your account.
                </p>
            <h4>Why are some posts rewarded more/less?</h4>
            <p>
                The Utopian Bot has a separate <em>reward pool</em> for each contribution category, depending on how useful, influential, and competitive each  one is.
            </p>
            <h4>My post was rewarded with a very low vote. What can I do?</h4>
            <p>
                Post a message in the <code>#human-curators</code> channel on <a href="https://discord.gg/8Wx7STU">Discord.</a>
                </p>
            <h4>
                When does the bot vote come?
                </h4>
                <p>
                    It is hard to judge and specify the <em>timing</em> of the Utopian Bot because it varies constantly.
                    STEEM has a metric called "Voting Power" deciding how effective your votes are, and this metric goes up and down depending on your voting.<br/>
                    Utopian Bot waits for the voting power to increase to 100%, then starts voting posts as much as possible. Then, it waits for the voting power to increase to 100% again, and starts all over.
                </p>
                
                
                
                
                
                
                <em>Document Last Modified December 1st, 2017</em><br/><br/>
            
            <br className="Welcome__bigbreak"/>
            
      </p>
      
    </div>
  </div>);
