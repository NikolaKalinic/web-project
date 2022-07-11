Vue.component("home", { 
	data: function () {
	    return {
	      sportsObjects: null,
	      searchQuery: '',
	      user : null,
          searchName: '',
	      searchType: '',
	      searchLocation: '',
	      searchAverageRating: '',
	      type:null
	      
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
				  <a class="active" href="/web-project/#/home">Sport Object</a>
				  <a href="/web-project/#/training">Training</a>
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
				  <a class="active" href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/users">Users</a>
				  <a href="/web-project/#/promo-code">Promo Code</a>
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
				  <a class="active" href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/training">Training</a>
				  <a href="/web-project/#/my-object">My object</a>
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
				  <a class="active" href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/training">Training</a>				  
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
		    				
		    			</div>
		    			<button type="button" class="btn btn-primary" v-on:click="addNewObject()" v-if="user.role=='Admin'">Add new object</button>
		    			
		    			<div class="row">
		    			<div class="col-2">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchName" placeholder="Name..." />
		    			</div>
		    			<div class="col-2">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchType" placeholder="Type..." />
		    			</div>
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchLocation" placeholder="Location..." />
		    			</div>
		    			<div class="col-1">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchAverageRating" placeholder="Average rating..." />
		    			</div>
		    			<div class="col-2">
		    				<select  id="type" v-model="type" @change="onChange($event)" class="browser-default custom-select form-control form-control-lg">
		    				<option value="None">None</option>
							  <option value="Gym">Gym</option>
							  <option value="Pool">Pool</option>
							  <option value="SportCenter">SportCenter</option>
							  <option value="DanceStudio">DanceStudio</option>
							</select>
		    			</div>
	    				<div class="col-1">
							  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" @change="check($event)">
							  <label class="form-check-label" for="flexSwitchCheckDefault">Open</label>
	    				</div>
		    			<div class="col-1">
		    				<button v-on:click="search()" type="button" class="btn btn-default btn-sm">
					          <span class="glyphicon glyphicon-search"></span> Search 
					        </button>
		    			</div>
		    			
		    		</div>
		    		</div>
		    		<div class="row">
		    			<div class="col">
			    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Image</th>
				    			<th>Name</th>
				    			<th>Type</th>				    			
				    			<th>Status</th>
				    			<th>Location</th>
				    			<th>Average rating</th>	
				    			<th>Work time</th>	
				    			<th>More</td>
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="so in sportsObjects">
				    			<td><img v-bind:src="so.path" :alt="selectedDog" width="100" height="100" /></td>
				    			<td>{{so.name}}</td>
				    			<td>{{so.type}}</td>				    			
				    			<td>{{so.status}}</td>
				    			<td>{{so.location.address.state}}, {{so.location.address.place}}</td>
				    			<td>{{so.averageRating}}</td>
				    			<td>{{so.workTime}}</td>
				    			<td> <button type="button" v-on:click="showInfo(so.id)" class="btn btn-light">Show</button> </td>		
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
		.then(response => {this.user= response.data;})
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
    	},
    	showInfo: function(id){
			router.push(`/object/${id}`);
		},
		addNewObject: function(){
			router.push(`/add-new-object`);
		},
		search: function(){
			axios
			.put('rest/objects/search',{
				"searchName":this.searchName,
				"searchType":this.searchType,
				"location": this.searchLocation,
				"avg":this.searchAverageRating
			})
			.then(response =>{this.sportsObjects = response.data})
		},
		onChange:function(event){
       		axios
       		.get('rest/objects/filter/'+event.target.value)
       		.then(response=>(this.sportsObjects = response.data))
    	},
    	check (e) {
	  		this.$nextTick(() => {
	     		if (e.target.checked) {
       				axios
       				.get('rest/objects/filterOpen')
       				.then(response=>((this.sportsObjects = response.data)))
    			}else{
					axios
       				.get('rest/objects/')
       				.then(response=>((this.sportsObjects = response.data)))
			}		
	  })
	}
	},
    
  
   	
    
});