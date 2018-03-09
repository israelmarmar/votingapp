import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {jsonuser,jsonobj} from './jsonfunctions'
import axios from 'axios'
import * as jsfunc from './jsonfunctions'

jsfunc.init()

class Polls extends Component{

   constructor(props) {
    super(props);
    this.state = {data:[]} 
  }
  
   componentDidMount() {
   var urlpath="";
   
   if(jsonuser!=="undefined")
   urlpath=jsonuser.screen_name;
   
  var th = this;
    this.serverRequest = 
      axios.get('/apijson/'+urlpath)
     
        .then(function(result) {    
      
          th.setState({
            data: result.data,
 
          });
      
        })
     
     
  }
  
  render() {
     
	 
		 
 console.log(this.state.data);
		
	
          return (
          <div>
	{this.state.data.map((item) => {

          return (<a href={'/polls/'+item._id}><div className='poll'>{item.title}</div></a>)
		  
		  })}
	</div>
		
		)

}
  
}

ReactDOM.render(<Polls/>, document.getElementById('polllist'));