Vue.component("sportsObjects", { 
	data: function () {
	    return {
	      sportsObjects: null,
	      searchQuery: '',
	      searchName: '',
	      searchType: '',
	      searchLocation: '',
	      searchAverageRating: ''
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
			  <a class="active" href="/web-project/#/">Home</a>
			</div>
		    <div class="nav navbar-nav navbar-right">
		      <a href="/web-project/#/login"><span class="glyphicon glyphicon-user"></span> Login<li></a>
		      <a href="/web-project/#/register" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Register</a>
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
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchName" placeholder="Name..." />
		    			</div>
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchType" placeholder="Type..." />
		    			</div>
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchLocation" placeholder="Location..." />
		    			</div>
		    			<div class="col-3">
		    				<input class="form-control my-2 py-1" type="text" v-model="searchAverageRating" placeholder="Average rating..." />
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
          .get('rest/objects/')
          .then(response => {
							this.sportsObjects = response.data;
							})
    },
    methods:{
		showInfo: function(id){
			router.push(`/object/${id}`);
		}
	},
    computed: {
    filteredResources (){
      if(this.searchName){		
      return this.sportsObjects.filter((item)=>{		
		if(item.averageRating.toString().startsWith(this.searchAverageRating) && item.name.toLowerCase().startsWith(this.searchName.toLowerCase())
		&& item.content.toLowerCase().startsWith(this.searchType.toLowerCase()) && (item.location.address.state.toLowerCase().startsWith(this.searchLocation.toLowerCase())
		|| item.location.address.place.toLowerCase().startsWith(this.searchLocation.toLowerCase()))){			
			return item;
		}
      })
      }  if(this.searchAverageRating){		
      return this.sportsObjects.filter((item)=>{		
		if(item.averageRating.toString().startsWith(this.searchAverageRating) && item.name.toLowerCase().startsWith(this.searchName.toLowerCase())
		&& item.content.toLowerCase().startsWith(this.searchType.toLowerCase()) && (item.location.address.state.toLowerCase().startsWith(this.searchLocation.toLowerCase())
		|| item.location.address.place.toLowerCase().startsWith(this.searchLocation.toLowerCase()))){			
			return item;
		}
      })
      } if(this.searchLocation){		
      return this.sportsObjects.filter((item)=>{		
		if(item.averageRating.toString().startsWith(this.searchAverageRating) && item.name.toLowerCase().startsWith(this.searchName.toLowerCase())
		&& item.content.toLowerCase().startsWith(this.searchType.toLowerCase()) && (item.location.address.state.toLowerCase().startsWith(this.searchLocation.toLowerCase())
		|| item.location.address.place.toLowerCase().startsWith(this.searchLocation.toLowerCase()))){			
			return item;
		}
      })}
      if(this.searchType){		
      return this.sportsObjects.filter((item)=>{		
		if(item.averageRating.toString().startsWith(this.searchAverageRating) && item.name.toLowerCase().startsWith(this.searchName.toLowerCase())
		&& item.content.toLowerCase().startsWith(this.searchType.toLowerCase()) && (item.location.address.state.toLowerCase().startsWith(this.searchLocation.toLowerCase())
		|| item.location.address.place.toLowerCase().startsWith(this.searchLocation.toLowerCase()))){			
			return item;
		}
      })}
       else{
        return this.sportsObjects;
      }
    }
  }
   	
    
});