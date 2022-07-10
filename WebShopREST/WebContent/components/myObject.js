Vue.component("my-object",{
	data:function(){
		return{
			user:null,
			object:null,
			usersWhoVisitedObject:null,
			coachWhoWork:null,
			objects: null,
			contents: null,
			trainings: null
		}
	},
	template:`
		<div>
			<nav class="navbar navbar-inverse" v-if="user.role == 'Manager'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/training">Training</a>
				  <a class="active" href="/web-project/#/my-object">My object</a>
				</div>
			    <div class="nav navbar-nav navbar-right">
			      <a href="/web-project/#/myProfile" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile<li></a>
			      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
			    </div>
			  </div>
			</nav>
			<section style="background-color: #eee;">
  				<div class="container py-5">
				    <div class="row">
				      	<div class="col-lg-4">
				        	<div class="card mb-4">
				          		<div class="card-body text-center">
				            		<img v-bind:src="object.path" alt="avatar"
				              		class="rounded-circle img-fluid" style="width: 150px;">
									<h5 class="my-3">{{object.name}}</h5>
				            		<p class="text-muted mb-1">{{object.location.address.place}} {{object.location.address.zipCode}}</p>
				            		<p class="text-muted mb-4">{{object.location.longitude}}, {{object.location.latitude}}</p>
				            		<div class="d-flex justify-content-center mb-2" v-if="user.role === 'Admin' ">
				              			<button type="button" class="btn btn-primary" v-on:click="deleteObject(object.id)">Delete</button>
				            		</div>
				          		</div>
							</div>
							<div class="p-1">
								<h2 style="display: inline; margin: 0px 120px 0px 0px;">Contents</h2>								
								<input type="button" v-on:click="newContent()" class="btn btn-secondary" value="New content"/>							
							</div>
							
			<!-- CONTENT !!!!!!!!!!!!!!!!!!!!!! -->
							 
							<div class="card mb-4" v-for="content in object.content">
				          		<div class="card-body text-center" v-for="c in contents" v-if="c.id == content && c.deleted == false">
				          			<img v-bind:src="c.path" :alt="image" width="60" height="60" />				            		
				            		<h3 class="card-title mb-3" >
				            			{{c.name}}
				            		</h3>
				            		<h4>{{c.type}}</h4>
				            		<p>
				            			{{c.description}}
				            		</p>	
				            		<table class="table table-striped table-dark mt-3" v-if="c.trainingId != null">
						    			<thead>
							    		<tr>
							    			<th>Logo</th>
							    			<th>Name</th>
							    			<th>Type</th>
							    			<th>More</th>							    				
							    		</tr>
							    		</thead>
							    		<tbody>
							    		<tr v-for="tid in c.trainingId">
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false"><img class="img-circle" v-bind:src="t.path" :alt="image" width="50" height="50" /></td>
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false">{{t.name}}</td>
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false">{{t.type}}</td>	
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false"><button type="button" v-on:click="removeTraining(tid)" class="btn btn-light btn-sm">Remove</button></td>						    				
							    		</tr>
							    		</tbody>
							    	</table>			            						            		
				            		<button v-on:click="changeContent(content)" class="btn btn-primary">Change</button>
				            		<button class="btn btn-primary" v-on:click="newTraining(content)">Add training</button>
				            		<button class="btn btn-primary" v-on:click="deleteContent(content)">Delete</button>
				          		</div>
							</div>
							
							
				           <!-- <div class="overflow-auto">
				        		<div class="card mb-4 mb-lg-0">
									<div class="card-body p-0">
				          				<h4 style="font-family:'serif'">Users who visited this object:</h4>
					         			<div>
					          				<table class="table table-striped table-dark">
				    							<thead>
					    							<tr>
					    								<th>First name</th>
					    								<th>Last Name</th>
					    							</tr>
				    							</thead>
					    						<tbody>
					    							<tr v-for="so in usersWhoVisitedObject">
					    								<td>{{so.firstName}}</td>
					    								<td>{{so.lastName}}</td>	
					    							</tr>
					    						</tbody>
					    					</table>    
					          			</div>
			              			</div>
				        		</div>
				      		</div> -->
				        </div>
				    	<div class="col-lg-8">
				        	<div class="card mb-4">
				          		<div class="card-body">
				            		<div class="row">
				              			<div class="col-sm-3">
				                			<p class="mb-0">Name</p>
				              			</div>
				              		<div class="col-sm-9">
				                		<p class="text-muted mb-0">{{object.name}}</p>
				              		</div>
				            	</div>
				            	<hr>
				            	<div class="row">
				              		<div class="col-sm-3">
				                		<p class="mb-0">Type</p>
									</div>
				              		<div class="col-sm-9">
				                		<p class="text-muted mb-0">{{object.type}}</p>
				              		</div>
				            	</div>
				            	<hr>
				            	<div class="row">
				              		<div class="col-sm-3">
				                		<p class="mb-0">Status</p>
				              		</div>
				              		<div class="col-sm-9">
				                		<p class="text-muted mb-0">{{object.status}}</p>
				              		</div>
				            	</div>
				            	<hr>
								<div class="row">
				              		<div class="col-sm-3">
				                		<p class="mb-0">Location</p>
				              		</div>
				              	<div class="col-sm-9">
				                	<p class="text-muted mb-0">{{object.location.address.street}} {{object.location.address.number}}, {{object.location.address.place}}, {{object.location.address.state}} </p>
				              	</div>
							</div>
				            <hr>
				            <div class="row">
				              <div class="col-sm-3">
				                <p class="mb-0">Average rating</p>
				              </div>
				              <div class="col-sm-9">
				                <p class="text-muted mb-0">{{object.averageRating}}</p>
				              </div>
				            </div>
				          </div>
				        </div> 
				        <div class="row">
				          	<div class="col-md-6">
				            	<div class="card mb-4 mb-md-0">
				              		<div class="card-body">
									  <h4 style="font-family:'serif'">Users who visited this object:</h4>
									  <div>
										   <table class="table table-striped table-dark">
											 <thead>
												 <tr>
													 <th>First name</th>
													 <th>Last Name</th>
												 </tr>
											 </thead>
											 <tbody>
												 <tr v-for="so in usersWhoVisitedObject">
													 <td>{{so.firstName}}</td>
													 <td>{{so.lastName}}</td>	
												 </tr>
											 </tbody>
										 </table>    
									   </div>
				              		</div>
				            	</div>
				          	</div>
							<div class="col-md-6">
								<div class="card mb-4 mb-md-0">
									<div class="card-body">
									<h4 style="font-family:'serif'">Coach who works in object:</h4>
									<div>
										 <table class="table table-striped table-dark">
										   <thead>
											   <tr>
												   <th>First name</th>
												   <th>Last Name</th>
											   </tr>
										   </thead>
										   <tbody>
											   <tr v-for="so in coachWhoWork">
												   <td>{{so.firstName}}</td>
												   <td>{{so.lastName}}</td>	
											   </tr>
										   </tbody>
									   </table>    
									 </div>
									</div>
								</div>
							</div>
				        </div>
				    	</div>
				    </div>
				</div>
			</section>
			
		</div>
	`,
	 mounted () {
		axios
		.get('rest/currentUser')
		.then(response => {
							this.user= response.data;
							axios
							.get('rest/objects/'+this.user.sportObjectId)
							.then(response => {this.object = response.data;});
							axios
							.get('rest/users/object='+this.user.sportObjectId)
							.then(response => (this.usersWhoVisitedObject=response.data));
							axios
							.get('rest/users/objId='+this.user.sportObjectId)
							.then(response => (this.coachWhoWork=response.data));
							});
		axios
		.get('rest/objects')
		.then(response => {this.objects = response.data});
		axios
		.get('rest/contents')
		.then(response => {this.contents = response.data});
		axios
		.get('rest/trainings')
		.then(response => {this.trainings = response.data});
		
	},
	methods: {
	newContent : function(){		
			router.push(`/new-content/` + this.object.id);
		},
	changeContent : function(id) {
			router.push('/change-content/' + id);
		},
	newTraining : function(id){
			router.push('/new-content-training/' + id);
	},
	deleteContent: function(id){
			r = confirm("Are you sure?")
			if(r){
				axios
				.delete('rest/contents/' + id);			
					
			}
			
	},
	removeTraining: function(id){
			r = confirm("Are you sure?")
			if(r){
				axios
				.put('rest/trainings/cancel-' + id)					
			}
	}
	
	}	
	
	
});