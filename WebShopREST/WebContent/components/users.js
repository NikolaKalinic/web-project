Vue.component("users",{
	data:function(){
		return{
			users: null,
			searchSurname: '',
	     	searchName: '',
	     	searchUsername: ''
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
		    			<div class="col-4">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchName" placeholder="Name..." />
		    			</div>
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchSurname" placeholder="Surname..." />
		    			</div>
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchUsername" placeholder="Username..." />
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
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="u in filteredResources">
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
	},	
	computed: {
    filteredResources (){
      if(this.searchName){		
      return this.users.filter((item)=>{		
		if(item.firstName.toLowerCase().startsWith(this.searchName.toLowerCase()) && item.lastName.toLowerCase().startsWith(this.searchSurname.toLowerCase())
		&& item.username.toLowerCase().startsWith(this.searchUsername.toLowerCase())){			
			return item;
		}
      })
      } if(this.searchSurname){		
      return this.users.filter((item)=>{		
		if(item.firstName.toLowerCase().startsWith(this.searchName.toLowerCase()) && item.lastName.toLowerCase().startsWith(this.searchSurname.toLowerCase())
		&& item.username.toLowerCase().startsWith(this.searchUsername.toLowerCase())){			
			return item;
		}
      })
      } if(this.searchUsername){		
      return this.users.filter((item)=>{		
		if(item.firstName.toLowerCase().startsWith(this.searchName.toLowerCase()) && item.lastName.toLowerCase().startsWith(this.searchSurname.toLowerCase())
		&& item.username.toLowerCase().startsWith(this.searchUsername.toLowerCase())){			
			return item;
		}
      })
      }
       else{
        return this.users;
      }
    }
  },
   methods: {
    	addNewUser : function() {
    		router.push(`/add-new-user`);
    	}
    }
});