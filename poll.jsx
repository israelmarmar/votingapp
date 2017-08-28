 var jsonuser=getCookie("user");
		
		
		function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
          return "";
      }
		
             $(function() {
				 
				 
				if(jsonuser!=="undefined"){
					$("#sign-in-with-twitter").text(JSON.parse(jsonuser).name+" Sign out");
					$("#mypolls").css("display","block");
					$("#newpoll").css("display","block");
					$("#sign-in-with-twitter").on("click", function() {
				     window.location.href="/logout";
                });
					 
				}else{
				$("#sign-in-with-twitter").text("Sign in with Twitter");
				$("#mypolls").css("display","none");
				$("#newpoll").css("display","none");
                $("#sign-in-with-twitter").on("click", function() {
                    window.location.href = "/request-token";
                });
				}
            });
			
var Polls = React.createClass({
  
  getInitialState: function () {
    return { 
            data:[]

           };
  },
  
   componentDidMount: function() {
   var urlpath="";
   
   if(jsonuser!=="undefined")
   urlpath=JSON.parse(jsonuser).screen_name;
   
  var th = this;
    this.serverRequest = 
      axios.get('/apijson/'+urlpath)
     
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