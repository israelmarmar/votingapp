import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {GoogleCharts} from 'google-charts';
import {jsonuser,jsonobj} from './jsonfunctions'
import * as jsfunc from './jsonfunctions'

jsfunc.init()


document.title=jsonobj.title;

GoogleCharts.load(drawChart);

function drawChart() {
var array=[];
array.push(["option","freq"]);
for(var i=0;i<jsonobj.chart.length;i++){
var ar=[];
ar.push(jsonobj.chart[i].option);
ar.push(jsonobj.chart[i].freq);

	array.push(ar);
}
console.log(array);
  var data = GoogleCharts.api.visualization.arrayToDataTable(array);
  var options = {'title':"",'width':800, 'height':700,'backgroundColor': 'transparent', chartArea:{left:"50%",top:0}};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

class Select extends Component{


	 constructor(props) {
    super(props);
    this.state = {disp:"none"} 
  }
 
 handleChange(event) {


     if(event.target.value=="ownop"){
	 	this.setState({ disp: "block" });
	 }else{
	 	this.setState({ disp: "none" });
	 }
    
    
  }
  
  deletepoll(evt){
  var obj;

    if (confirm("Are you sure to remove this poll?") == true) {
     obj=JSON.parse(Get("https://votingapp-isrmm.herokuapp.com/delete/"+evt.target.id));
      alert(obj.msg);
	window.location.href="https://votingapp-isrmm.herokuapp.com/";
    }
	
	}
  
  render() {
  
          return (
          
			<div>
		  <h2>{jsonobj.title}</h2>
		  <h2 style={{fontSize: "14px"}}><b>I'd like to vote for...:</b></h2>
		  <select id="selec"  onChange={this.handleChange}>
	{jsonobj.chart.map(function(item) {

          return (<option value={item.option}>{item.option}</option>)
		  
		  })}
		  
		  {() => {
		  if(jsonuser!=="undefined"){
		      return <option value={"ownop"}>{"I'd like to vote for...: "}</option>
			  }
		  }}
		  
		  </select>
		  <label style={{display: this.state.disp}}>Vote with my own option: 
			</label>
				<input type="text" style={{display: this.state.disp}} id="ownop"/>

			{() => {
		  		if(jsonuser!=="undefined" && JSON.parse(jsonuser).screen_name===jsonobj.user){
		      	return <button id={jsonobj._id} className="btn btn-danger" onClick={this.deletepoll}>{"Remove this Poll"}</button>
			  	}
		 	 }}
			</div>
		)

	}
  
}

ReactDOM.render(<Select/>, document.getElementById('sel'));