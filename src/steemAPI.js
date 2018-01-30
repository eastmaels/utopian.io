import steem from 'steem';

steem.api.setOptions({ url: process.env.STEEM_NODE });

export default steem.api;
