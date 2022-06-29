Vue.component("home", { 
	data: function () {
	    return {
	      sportsObjects: null,
	      searchQuery: '',
	      user : null
	      
	    }
	},
	    template: `
	    <div> 
		    <nav class="navbar navbar-inverse" v-if="user.role == 'Customer'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a class="active" href="/web-project/#/home">Home</a>
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
				  <a class="active" href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/users">Users</a>
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
				    			<th>Name</th>
				    			<th>Type</th>
				    			<th>Content</th>
				    			<th>Status</th>
				    			<th>Location</th>
				    			<th>Average rating</th>	
				    			<th>Work time</th>	
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="so in filteredResources">
				    			<td>{{so.name}}</td>
				    			<td>{{so.content}}</td>
				    			<td>{{so.type}}</td>
				    			<td>{{so.status}}</td>
				    			<td>{{so.location.address.state}}, {{so.location.address.place}}</td>
				    			<td>{{so.averageRating}}</td>
				    			<td>{{so.workTime}}</td>		
				    		</tr>
				    		</tbody>
				    	</table>    
				    	</div>
			    	</div>
		    	</div>
    	</div>		  
    	`,
    mounted () {
		axios
		.get('rest/currentUser')
		.then(response => {this.user= response.data;alert(user.role);})
        axios
          .get('rest/objects/')
          .then(response => (this.sportsObjects = response.data))
    },
    methods:{
		logout: function(){
			axios
			.post('rest/logout')
			.then(router.push('/'))
		},
		myProfile : function() {
    		router.push(`/myProfile`);
    	}
	},
    computed: {
    filteredResources (){
      if(this.searchQuery){		
      return this.sportsObjects.filter((item)=>{		
		if(item.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())){			
			return item;
		}else if (item.averageRating.toString().startsWith(this.searchQuery)){
			return item;
		}else if (item.content.toLowerCase().startsWith(this.searchQuery.toLowerCase())){
			return item;
		}else if (item.location.address.state.toLowerCase().startsWith(this.searchQuery.toLowerCase())){
			return item;
		}
		else if (item.location.address.place.toLowerCase().startsWith(this.searchQuery.toLowerCase())){
			return item;
		}
      })
      } else{
        return this.sportsObjects;
      }
    }
  }
   	
    
});