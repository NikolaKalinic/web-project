Vue.component("home", { 
	data: function () {
	    return {
	      sportsObjects: null,
	      searchQuery: ''
	    }
	},
	    template: `
	    <div> 
	    	<div class="topnav d-flex">
			  <a class="active " href="/web-project/#/home">Home</a>
			  <button type="button" class="btn btn-info text-right" v-on:click="logout()">Logout</button>
			</div>
	    	<div style="position: absolute;top: 30%;left: 30%;">
	    		<h3>Review of sport objects</h3>
	    		<input type="text" v-model="searchQuery" placeholder="Search..." />
	    		<table border="1">
		    		<tr bgcolor="lightgrey">
		    			<th>Name</th>
		    			<th>Type</th>
		    			<th>Content</th>
		    			<th>Status</th>
		    			<th>Location</th>
		    			<th>Average rating</th>	
		    			<th>Work time</th>	
		    		</tr>
		    			
		    		<tr v-for="so in filteredResources">
		    			<td>{{so.name}}</td>
		    			<td>{{so.content}}</td>
		    			<td>{{so.type}}</td>
		    			<td>{{so.status}}</td>
		    			<td>{{so.location.address.state}}, {{so.location.address.place}}</td>
		    			<td>{{so.averageRating}}</td>
		    			<td>{{so.workTime}}</td>		
		    		</tr>
		    	</table>    		
	    	</div>
    	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/objects/')
          .then(response => (this.sportsObjects = response.data))
    },
    methods:{
		logout: function(){
			axios
			.post('rest/logout')
			.then(router.push('/'))
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