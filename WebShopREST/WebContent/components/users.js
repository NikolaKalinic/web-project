Vue.component("users",{
	data:function(){
		return{
			users: null,
			searchSurname: '',
	     	searchName: '',
	     	searchUsername: '',
	     	role:null,
	     	type:null,
	     	currentUser: {}
		}
	},
	template: `
	<div>
		<nav class="navbar navbar-inverse">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a  href="/web-project/#/home">Sports Objects</a>
				  <a class="active" href="/web-project/#/users">Users</a>
				  <a  href="/web-project/#/promo-code">Promo Code</a>
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
		    				<h2>Review of users</h2>
		    			</div>
		    			
		    		</div>
		    		<div class="row">
		    			<div>
		    				<button class="btn btn-primary form-control my-2 py-1" v-on:click="addNewUser()">Add new user</button>
		    			</div>	
		    			<div class="col-2">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchName" placeholder="Name..." />
		    			</div>
		    			<div class="col-2">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchSurname" placeholder="Surname..." />
		    			</div>
		    			<div class="col-2">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchUsername" placeholder="Username..." />
		    			</div>
		    			<div class="col-2">
		    				<select  id="role" placeholder="Role..." v-model="role" @change="onChange($event)" class="browser-default form-control form-control-lg">
		    				<option value="None" selected>None</option>
							  <option value="Admin">Admin</option>
							  <option value="Customer">Customer</option>
							  <option value="Coach">Coach</option>
							  <option value="Manager">Manager</option>
							</select>
		    			</div>
		    			<div class="col-2">
		    				<select  id="type" placeholder="Customer Type..." v-model="type" @change="onChangeType($event)" class="browser-default form-control form-control-lg">
		    				<option value="None" selected>None</option>
							  <option value="Beginner">Beginner</option>
							  <option value="Bronze">Bronze</option>
							  <option value="Silver">Silver</option>
							  <option value="Gold">Gold</option>
							</select>
		    			</div>
		    			<div class="col-1">
		    				<button v-on:click="search()" type="button" class="btn btn-default btn-sm">
					          <span class="glyphicon glyphicon-search"></span> Search 
					        </button>
		    			</div>
		    		</div>
		    		<div class="row">
		    			<div class="col">
			    		<table class="table table-striped table-dark" :data="users">
			    			<thead>
				    		<tr>
				    			<th>First name</th>
				    			<th>Last name</th>
				    			<th>Username</th>
				    			<th>Gender</th>
				    			<th>Email</th>
				    			<th>Type</th>	
				    			<th>More</th>	
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="u in users" v-if="u.deleted == false">
				    			<td>{{u.firstName}}</td>
				    			<td>{{u.lastName}}</td>
				    			<td>{{u.username}}</td>
				    			<td>{{u.gender}}</td>
				    			<td>{{u.email}}</td>
				    			<td>{{u.role}}</td>	
				    			<td><button type="button" v-on:click="deleteUser(u.id)" class="btn btn-light btn-sm">Delete</button></td>	
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
		.get('rest/users')
		.then(response => (this.users = response.data))
		axios
		.get('rest/currentUser')
		.then(response => (this.currentUser = response.data))
	},	
	
   methods: {
    	addNewUser : function() {
    		router.push(`/add-new-user`);
    	},
    	search: function(){
			axios
			.put('rest/users/search',
			{
				"searchSurname":this.searchSurname,
				"searchName": this.searchName,
				"searchUsername": this.searchUsername
			})
			.then(response =>(this.users= response.data))
		},
		onChange: function(event){
       		axios
       		.get('rest/users/filterRole'+event.target.value)
       		.then(response=>(this.users = response.data))
    		},
    	onChangeType: function(event){
       		axios
       		.get('rest/users/filterType'+event.target.value)
       		.then(response=>(this.users = response.data))
    		},
    	deleteUser: function(id){
			if(this.currentUser.id == id){
				alert("You can't delete yourself!");
				return;
			}
			r = confirm("Are you sure?")
			if(r){
			axios
			.put('rest/users/delete-' + id)
			.then(response => 	axios
								.get('rest/users')
								.then(response => (this.users = response.data)))	
			}
		}
    }
});