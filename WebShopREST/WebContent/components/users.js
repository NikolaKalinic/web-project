Vue.component("users",{
	data:function(){
		return{
			users: null
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
		    			<div class="col">
			    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>First name</th>
				    			<th>Last name</th>
				    			<th>Username</th>
				    			<th>Gender</th>
				    			<th>Email</th>
				    			<th>Type</th>		
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="u in users">
				    			<td>{{u.firstName}}</td>
				    			<td>{{u.lastName}}</td>
				    			<td>{{u.username}}</td>
				    			<td>{{u.gender}}</td>
				    			<td>{{u.email}}</td>
				    			<td>{{u.role}}</td>		
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
	}
});