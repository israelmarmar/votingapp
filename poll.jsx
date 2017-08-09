var Polls = React.createClass({
  
  getInitialState: function () {
    return { 
            data:[]

           };
  },
  
   componentDidMount: function() {
   
  var th = this;
    this.serverRequest = 
      axios.get('/apijson')
     
        .then(function(result) {    
      
          th.setState({
            data: result.data,
 
          });
      
        })
     
     
  },
  
  render: function () {
     
	 
		 
 console.log(this.state.data);
		
	
          return (
          <div>
	{this.state.data.map(function(item) {

          return (<a href={'/polls/'+item._id}><div className='poll'>{item.title}</div></a>)
		  
		  })}
	</div>
		
		)

}
  
});

ReactDOM.render(<Polls/>, document.getElementById('polllist'));
  