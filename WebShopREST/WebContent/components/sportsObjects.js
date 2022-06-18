Vue.component("sportsObjects", { 
	data: function () {
	    return {
	      sportsObjects: null
	    }
	},
	    template: ` 	 
    	<div>
    		<h3>Prikaz sportskih objekata</h3>
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Id</th>
	    			<th>Name</th>
	    			<th>Type</th>
	    			<th>Content</th>
	    			<th>Status</th>
	    			<th>Location</th>
	    			<th>Average rating</th>	
	    			<th>Work time</th>	
	    		</tr>
	    			
	    		<tr v-for="so in sportsObjects">
	    			<td>{{so.id}}</td>
	    			<td>{{so.name}}</td>
	    			<td>{{so.type}}</td>
	    			<td>{{so.content}}</td>
	    			<td>{{so.status}}</td>
	    			<td>{{so.location}}</td>
	    			<td>{{so.averageRating}}</td>
	    			<td>{{so.workTime}}</td>		
	    		</tr>
	    	</table>    		
    	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/objects/')
          .then(response => (this.sportsObjects = response.data))
    }
    
});