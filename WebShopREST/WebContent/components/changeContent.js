Vue.component("change-content", {
	data: function (){
		return {
			id: -1,
			oldName: null,
			content: null
		}
	}, 
	template: `
		<div>	
		 <nav class="navbar navbar-inverse" >
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/training">Training</a>
				  <a href="/web-project/#/my-object">My object</a>
				</div>
			    <div class="nav navbar-nav navbar-right">
			      <a href="/web-project/#/myProfile" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile<li></a>
			      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
			    </div>
			  </div>
			</nav>
    <section class="vh-100 gradient-custom">
    	<div class="container">
    		<div class="col-md-5 border-right">
            	
		  			<div class="row mt-3">
		                    <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" placeholder="Name" v-model="content.name"><p id="nameExists" hidden="true"  style="color:red">Name already exists</p></div>
		                    <div class="col-md-12"><label class="labels">Type</label><select v-model="content.type" class="browser-default custom-select form-control form-control-lg">
					        
					        <option value="Swimming">Swimming</option>
					        <option value="Crossfit">Crossfit</option>
					        <option value="Dancing">Dancing</option>
					        <option value="Bodybuilding">Bodybuilding</option>
					        <option value="Sauna">Sauna</option>
					      	</select></div>
		                    <div class="col-md-12"><label class="labels">Description</label><input type="text" class="form-control" placeholder="Description" v-model="content.description"></div>
                   </div>
               		
               			<button class="btn btn-primary profile-button" v-on:click="getFormValues()">Save</button>
               			
               		
            </div>
        </div>     
    </section>
      </div>
      </div>
	`,
	mounted() {
		this.id = this.$route.params.id;
		axios
		.get('rest/contents/' + this.id)
		.then(response=>{this.content = response.data, this.oldName = this.content.name});		
	},
	methods: {
		changeContent: function() {
			axios.put(
				'rest/contents/' + this.id,
				{
					name: this.content.name,
					type: this.content.type,
					description: this.content.description
					
				}).then ( response => {
					router.push('/my-object');
				}).catch( error => {
					this.error = 'Name already exists!';
				})
			
		},
		
		getFormValues: function (){
			if(this.oldName == this.content.name){
				this.changeContent();
				return;
			}
			axios
			.get('rest/contents/exists/' + this.content.name)
			.then(response => {if(response.status != 200)
								document.getElementById("nameExists").hidden=false;
								else{
									document.getElementById("nameExists").hidden=true;	
									console.log('usao sam');								
									this.changeContent();
								}})
			.catch(document.getElementById("nameExists").hidden=false);
		},
		
		
		
	}
	
	
});