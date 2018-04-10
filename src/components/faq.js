import React from 'react';
import Accordion from 'react-responsive-accordion';

class FAQ extends React.Component {

  constructor(){
    super();
    this.state={
      faq:null
    };

  this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    let hash='';
  setTimeout(function(){
     let open=[].slice.call(document.getElementsByClassName('is-open'));
     let open_s="";
     if(open.length!==0){
        open_s=open.filter( function(e){
           return e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].className.includes('is-open');
        });
        if(open_s.length==1)
          hash=open_s[0].parentNode.childNodes[1].childNodes[0].childNodes[0].className;
        if (hash!='')
          window.location.hash='#'+hash.replace('sub_faq ','');
      }
    },300);
  };

componentDidMount(){
  fetch(process.env.UTOPIAN_API + 'faq', {
    method: 'GET',
    headers: {
      'x-api-key-id': process.env.AWS_KEY_ID,
      'x-api-key': process.env.AWS_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
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
      let hash = window.location.hash.replace('#', '');
      if (hash) {
        console.log(hash);
      }

      let startP=-1;
      let faq= cat.map(function(c,i){
        let startPS=-1;
        let subfaq=data.results.filter(function(sub,j){
          return sub.category==c;
        });
        subfaq=subfaq.map(function(s,j){
          if(hash==s.hash)
          {
            startPS=j;
            startP=i;
          }
          return(<div className={'sub_faq '+s.hash} data-trigger={s.title}>
             <div dangerouslySetInnerHTML={{__html:s.html}} /></div>)
        });
        return(<div id={c} data-trigger={cat_title[i]}>
          <Accordion   startPosition={startPS}>
            {subfaq}
          </Accordion>
        </div>)
    }); 
    let faqs=<Accordion  startPosition={startP} className="main_accordion">{faq}</Accordion>;
    this.setState({faq:faqs});
  });
}

  render() {
    return (
      <div onClick={this.handleToggle}>
        {this.state.faq}
      </div>
    )
  }
}

export default FAQ;
