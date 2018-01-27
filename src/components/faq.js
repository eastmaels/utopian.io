import React from 'react';
import { FormattedMessage } from 'react-intl';
import Accordion from 'react-responsive-accordion';

class FAQ extends React.Component {

  constructor(){
    super();
    this.state={
      faq:null
    };
  }

componentDidMount(){
  fetch(process.env.UTOPIAN_API + 'faq')
  .then(results=>{
    return results.json();
  })
  .then(data=>{
    var cat=[];
    var cat_title=[];
    for (var sub of data.results)
    {
      if(!cat.includes(sub.category))
      {
        cat.push(sub.category);
        cat_title.push(sub.category_name);
      }
    }

      console.log(cat_title);

    let faq= cat.map(function(c,i){
        let subfaq=data.results.filter(function(sub,i){
          return sub.category==c;
        });
        subfaq=subfaq.map(function(s,i){
          return(<div className='sub_faq' data-trigger={s.title}>
             <div dangerouslySetInnerHTML={{__html:s.html}} /></div>)
        });
        return(<div id={c} data-trigger={cat_title[i]}>
          <Accordion>
            {subfaq}
          </Accordion>
        </div>)
    });
    let faqs=<Accordion className="main_accordion">{faq}</Accordion>;
    this.setState({faq:faqs});
  });
}
  render() {
    return (
      <div>
        {this.state.faq}
      </div>
    )
  }
}

export default FAQ;
