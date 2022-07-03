Vue.component("training", {
	data:function(){
		return{
			user:null,
			trainingHistory: null,
			trainings: null,
			sportObjects: null
		}
	},
	template:`
		<div>
			<nav class="navbar navbar-inverse" v-if="user.role == 'Customer'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sport Object</a>
				  <a class="active" href="/web-project/#/training">Training</a>
				  <a href="/web-project/#/membership-fee">Membership fee</a>
				</div>
			    <div class="nav navbar-nav navbar-right">
			      <a href="/web-project/#/myProfile" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile<li></a>
			      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
			    </div>
			  </div>
			</nav>
			
			<nav class="navbar navbar-inverse" v-if="user.role == 'Admin'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/users">Users</a>
				  <a class="active" href="/web-project/#/training">Training</a>				  
				</div>
			    <div class="nav navbar-nav navbar-right">
			      <a href="/web-project/#/myProfile" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile<li></a>
			      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
			    </div>
			  </div>
			</nav>
			<div class="container">
				<div class="row" v-if="user.role == 'Customer'">
		    		<div class="col">
			    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Name</th>
				    			<th>Sport Object</th>
				    			<th>Date</th>				    							    				
				    		</tr>
				    		</thead>
				    		<tbody >
					    		<tr v-for="trh in trainingHistory" v-if="trh.customerId == user.id">
					    			<td v-for="t in trainings" v-if="t.id == trh.trainingId">{{t.name}}</td>
					    			<td v-for="t in trainings" v-if="t.id == trh.trainingId"><span v-for="so in sportObjects" v-if="so.id == t.sportObject">{{so.name}}</span></td>
					    			<td v-for="t in trainings" v-if="t.id == trh.trainingId">{{t.dateTime | dateFormat('DD.MM.YYYY.')}}</td>				    						    				
					    		</tr>
				    		</tbody>
				    	</table>    
				    </div>
			    </div>
			</div>
		</div>
	`,
	mounted(){
		axios
		.get('rest/currentUser')
		.then(response=>{this.user = response.data;});
		axios
		.get('rest/trainings')
		.then(response=>{this.trainings = response.data});
		axios
		.get('rest/trainingHistory')
		.then(response=>{this.trainingHistory = response.data});
		axios
		.get('rest/objects')
		.then(response=>{this.sportObjects = response.data});
	},
	filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	},
});