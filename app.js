import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import * as jsfunc from './jsonfunctions'

jsfunc.init()

 class Polls extends Component {
  
  constructor(props) {
    super(props);
    this.state = {data:[]} 
  }


   componentDidMount() {
  
   
  const th = this;
    this.serverRequest = 
      axios.get("/apijson")
     
        .then(function(result) {    
      
          th.setState({
            data: result.data,
 
          });
      
        })
     
     
  }
  
  render() {
     
	 
		 
 console.log(this.state.data);
		
	         if (this.state.data.length>0){
          return (
          <div className='container'>
	{this.state.data.map(function(item) {

          return (<a href={'/polls/'+item._id}><div className='poll'>{item.title}</div></a>)
		  
		  })}
	</div>
		
		) }else return (<h3>Loading...</h3>)

}
  
}

ReactDOM.render(<Polls/>, document.getElementById('polllist'));