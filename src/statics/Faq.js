import React from 'react';
import { FormattedMessage } from 'react-intl';
import './Faq.less';

export default () =>
  (<div className="main-panel FAQ">
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
                Post a message in the <code>#human-curators</code> channel on <a href="https://discord.gg/Cscp8et">Discord.</a>
                </p>
            <h4>
                When does the bot vote come?
                </h4>
                <p>
                    It is hard to judge and specify the <em>timing</em> of the Utopian Bot because it varies constantly.
                    STEEM has a metric called "Voting Power" deciding how effective your votes are, and this metric goes up and down depending on your voting.<br/>
                    Utopian Bot waits for the voting power to increase to 100%, then starts voting posts as much as possible. Then, it waits for the voting power to increase to 100% again, and starts all over.
                </p>

        <h2 id="errors">
        Site Errors and Warnings
        </h2>
        {/*
        001 - Posting: Utopian could not connect to Steem
        */}
            <h4 id="errors-001">Posting: Utopian could not connect to Steem</h4>
            <p>
                This error is found mostly while <b>posting</b> or <b>creating a new contribution</b> through Utopian.  The error can be caused by many issues, from a slow Internet connection to a downtime on SteemConnect's end.
                <br/>
            </p>
                <b style={{marginLeft: "20px"}}>Fixes</b>
            <p>
                Before you attempt to do anything, make sure to <b>copy</b> or otherwise <b>save</b> the contents/body of your post.
                Utopian will attempt to save it as a draft, but at times certain issues can prevent that from happening.
                <br/>
                Possible fixes include <b>(a)</b> using a private/incognito window, <b>(b)</b> switching to a different web browser, <b>(c)</b> reloading the page,
                or <b>(d)</b> simply waiting for the issue to resolve itself.
                Additionally, it's remotely possible that the post actually did go through even though you got the error, so check <code>https://steemit.com/@<b>your-username</b></code> to see if this occurred.
            </p>



            <p className="Welcome__bigbreak">
            &nbsp;<br className="Welcome__bigbreak"/>
            &nbsp;<br className="Welcome__bigbreak"/>
            <br className="Welcome__bigbreak"/>
            </p>

                <em><center>Document Last Modified <b>December 13th, 2017</b></center></em><br/><br/>

            <br className="Welcome__bigbreak"/>

      </p>

    </div>
  </div>);
