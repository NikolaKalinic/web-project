Vue.component("sportsObjects", { 
	data: function () {
	    return {
	      sportsObjects: null,
	      searchQuery: '',
	      searchName: '',
	      searchType: '',
	      searchLocation: '',
	      searchAverageRating: '',
	      type:null
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
		    			
		    		</div>
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
				    		<tr v-for="so in sportsObjects">
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
    /*computed: {
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
  } */
   	
    
});