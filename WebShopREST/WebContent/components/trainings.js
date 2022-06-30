Vue.component("training", {
	data:function(){
		return{
			user:null,
			items:null,
			sportObject : null
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
				<div class="row  align-items-center">
					<div class="col-8 d-flex justify-content-center" >
						<h2>Review of sport objects</h2>
					</div>
					<div class="col-4">
						<input class="form-control my-2 py-1" type="text" v-model="searchQuery" placeholder="Search..." />
					</div>
				</div>
				<div class="row">
					<div class="col">
						<table class="table table-striped table-dark">
							<thead>
								<tr>
									<th>Training Name</th>
									<th>Sport object</th>
									<th>Training date</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="so in user.historyCustomer">
									<td>{{so.training.name}}</td>
									<td>{{}}</td>
									<td>{{so.dateTime}}</td>		
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
	},
	methods:{
		 
			
			
		
	}
});