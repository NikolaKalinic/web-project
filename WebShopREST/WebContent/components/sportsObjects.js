Vue.component("sportsObjects", { 
	data: function () {
	    return {
	      sportsObjects: null
	    }
	},
	    template: `
	    <div> 
	    	<div class="topnav">
			  <a class="active" href="sportsObjects.html">Home</a>
			  <a href="login.html">Login</a>
			  <a href="register.html">Sign up</a>
			</div>
	    	<div style="position: absolute;top: 30%;left: 30%;">
	    		<h3>Prikaz sportskih objekata</h3>
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
		    			
		    		<tr v-for="so in sportsObjects">
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
    	</div>		  
    	`,
    mounted () {
        axios
          .get('rest/objects/')
          .then(response => (this.sportsObjects = response.data))
    }
    
});