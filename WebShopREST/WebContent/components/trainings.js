Vue.component("training", {
	data:function(){
		return{
			user:null,			
			trainingHistory: null,
			trainings: null,
			sportObjects: null,
			coachTrainings: null,
			mode: "PERSONAL",
			users: null,
			customerName: null,
			menagerSportObject: null,
			searchName:null
			
			
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
			
			<nav class="navbar navbar-inverse" v-if="user.role == 'Coach'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sport Object</a>
				  <a class="active" href="/web-project/#/training">Training</a>				  
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
			
			<nav class="navbar navbar-inverse" v-if="user.role == 'Manager'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sport Object</a>
				  <a class="active" href="/web-project/#/training">Training</a>		
				  <a href="/web-project/#/my-object">My object</a>		  
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
		    			<button type="button" v-on:click="newTraining()" class="btn btn-primary" >Add new training</button>
		    			<div class="row">	
			    			<div class="col-2">
			    				<select  id="type" v-model="type" @change="onChange($event)" class="browser-default custom-select form-control form-control-lg">
			    				<option value="None">None</option>
								  <option value="Personal">Personal</option>
								  <option value="Group">Group</option>
								</select>
			    			</div>	    
			    			<div class="col-2">
			    				<select  id="type" v-model="type" @change="onChangeObjType($event)" class="browser-default custom-select form-control form-control-lg">
			    				<option value="None">None</option>
								  <option value="Gym">Gym</option>
								  <option value="Pool">Pool</option>
								  <option value="SportCenter">SportCenter</option>
								  <option value="DanceStudio">DanceStudio</option>
								</select>
			    			</div>
			    		</div>					    			
			    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Image</th>
				    			<th>Name</th>
				    			<th>Type</th>
				    			<th>Sport Object</th>
				    			<th>Date</th>				    							    				
				    		</tr>
				    		</thead>
				    		<tbody >
					    		<tr v-for="t in trainings">
					    			<td v-for="ut in user.trainingId" v-if="ut == t.id && t.dateTime > new Date() - 2592000000  && t.canceled == false"><img class="img-circle" v-bind:src="t.path" :alt="image" width="50" height="50" /></td>
					    			<td v-for="ut in user.trainingId" v-if="ut == t.id && t.dateTime > new Date() - 2592000000  && t.canceled == false">{{t.name}}</td>
					    			<td v-for="ut in user.trainingId" v-if="ut == t.id && t.dateTime > new Date() - 2592000000  && t.canceled == false">{{t.type}}</td>
					    			<td v-for="ut in user.trainingId" v-if="ut == t.id && t.dateTime > new Date() - 2592000000  && t.canceled == false"><span v-for="so in sportObjects" v-if="so.id == t.sportObject">{{so.name}}</span></td>
					    			<td v-for="ut in user.trainingId" v-if="ut == t.id && t.dateTime > new Date() - 2592000000  && t.canceled == false">{{t.dateTime | dateFormat('DD.MM.YYYY.')}}</td>				    						    				
					    		</tr>
				    		</tbody>
				    	</table>    
				    </div>
			    </div>
			    <div class="row" v-if="user.role == 'Coach'">
			    	<div class="col-sm justify-content-center">
			    		<button v-on:click="personalMode()" type="button" class="btn btn-secondary">Personal trainings</button>
			    		<button v-on:click="groupMode()" type="button" class="btn btn-secondary">Group trainings</button>
			    		<h1 v-if="mode == 'GROUP' ">Group trainings</h1>
			    		<h1 v-else-if="mode == 'PERSONAL' ">Personal trainings</h1>
			    		<div class="row">
				    		<div class="col-2">
			    				<select  id="type" v-model="type" @change="onChangeObjType($event)" class="browser-default custom-select form-control form-control-lg">
			    				<option value="None">None</option>
								  <option value="Gym">Gym</option>
								  <option value="Pool">Pool</option>
								  <option value="SportCenter">SportCenter</option>
								  <option value="DanceStudio">DanceStudio</option>
								</select>
			    			</div>
			    			<div class="col-2">
		    					<input class="form-control my-2 py-1" type="text" v-model="searchName" placeholder="Name..." />
		    				</div>
		    				<div class="col-1">
			    				<button v-on:click="search()" type="button" class="btn btn-default btn-sm">
						          <span class="glyphicon glyphicon-search"></span> Search 
						        </button>
		    				</div>
			    		</div>
			    	</div class="col-sm">
			    	
			    </div>
			    <div class="row" v-if="user.role == 'Coach' && this.mode == 'GROUP'">
		    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Image</th>
				    			<th>Name</th>
				    			<th>Sport object</th>
				    			<th>Date</th>					    							    				
				    		</tr>
				    		</thead>
				    		<tbody >
					    		<tr v-for="t in this.coachTrainings" v-if="t.dateTime > new Date() && t.type == 'Group' ">
					    			<td><img class="img-circle" v-bind:src="t.path" :alt="image" width="50" height="50" /></td>
					    			<td>{{t.name}}</td>
					    			<td v-for="so in sportObjects"  v-if="so.id == t.sportObject">{{so.name}}</td>
					    			<td>{{t.dateTime | dateFormat('DD.MM.YYYY.')}}</td>	
					    		</tr>
				    		</tbody>
				    	</table>
			    </div>
			    <div class="row" v-if="user.role == 'Coach' && this.mode == 'PERSONAL'">
		    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Image</th>
				    			<th>Name</th>
				    			<th>Customer</th>
				    			<th>Sport object</th>
				    			<th>Date</th>		
				    			<th>More</th>			    							    				
				    		</tr>
				    		</thead>
				    		<tbody >
					    		<tr v-for="t in this.coachTrainings" v-if="t.dateTime > new Date() && t.type == 'Personal' && t.canceled == false">
					    			<td><img class="img-circle" v-bind:src="t.path" :alt="image" width="50" height="50" /></td>
					    			<td>{{t.name}}</td>
					    			<td>{{getCustomerName(t.id)}} {{customerName}} </td>
					    			<td v-for="so in sportObjects"  v-if="so.id == t.sportObject">{{so.name}}</td>
					    			<td>{{t.dateTime | dateFormat('DD.MM.YYYY.')}}</td>	
					    			<td><button type="button" v-on:click="cancelTraining(t.id, t.dateTime)" class="btn btn-secondary btn-sm btn-rounded">Cancel</button></td>
					    		</tr>
				    		</tbody>
				    	</table>
			    </div>
			    <div class="row" v-if="user.role == 'Manager'">
		    		<div class="col">
			    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Name</th>
				    			<th>Type</th>
				    			<th>Date</th>				    							    				
				    		</tr>
				    		</thead>
				    		<tbody >
					    		<tr v-for="t in trainings" v-if="t.sportObject == menagerSportObject">
					    			<td>{{t.name}}</td>	
					    			<td>{{t.type}}</td>				    			
					    			<td>{{t.dateTime | dateFormat('DD.MM.YYYY.')}}</td>				    						    				
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
		.then(response=>{this.user = response.data,
			axios
			.get('rest/trainings/getByCoach-' + this.user.id)
			.then(response=>{this.coachTrainings = response.data}); if(this.user.role == 'Manager'){this.menagerSportObject = this.user.sportObjectId}});
		axios
		.get('rest/trainings')
		.then(response=>{this.trainings = response.data});
		axios
		.get('rest/trainingHistory')
		.then(response=>{this.trainingHistory = response.data});
		axios
		.get('rest/objects')
		.then(response=>{this.sportObjects = response.data});
		axios
		.get('rest/users')
		.then(response=>{this.users = response.data});
		
		
		
	},
	filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	},
   	
   	methods: {
		personalMode: function(){
			this.mode = "PERSONAL";
		},
		groupMode: function(){
			this.mode = "GROUP";
		},
		getCustomerName: function(id){
			axios
			.get("rest/users/userByTrainingId-" + id)
			.then(response=>{this.customerName = response.data});
			
		},
		cancelTraining: function(id, date){			
			if(date - 172800000 < new Date()){				
				confirm("Training can be canceled maximum 2 days before start!");
				return;
			}			
			r = confirm("Are you sure?")
			if(r){
				axios
				.put('rest/trainings/cancel-' + id)
				.then(response=>{console.log("Training canceled!");
							axios
							.get('rest/trainings/getByCoach-' + this.user.id)
							.then(response=>{this.coachTrainings = response.data})});
			}
			
		},
		newTraining: function(){
			if(this.user.membershipFee.expirationDate < new Date()){
				alert('Inactive membership fee!')
				return;
			}
			
			router.push('/new-training');
		},
		onChange:function(event){
       		axios
       		.get('rest/trainings/filterType/'+event.target.value)
       		.then(response=>(this.trainings = response.data))
    	},
    	onChangeObjType:function(event){
       		axios
       		.get('rest/trainings/filterObj/'+event.target.value)
       		.then(response=>{if(this.user.role=="Customer")
       							this.trainings = response.data;
       						else
       							this.coachTrainings = response.data;});
    	},
		search: function(){
			axios
			.get('rest/trainings/search/'+this.searchName)
			.then(response =>{if(this.user.role=="Customer")
       							this.trainings = response.data;
       						else
       							this.coachTrainings = response.data;});
		},
		
	 },
	 
});