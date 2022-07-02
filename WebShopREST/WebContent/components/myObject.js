Vue.component("my-object",{
	data:function(){
		return{
			user:null,
			object:null,
			usersWhoVisitedObject:null,
			coachWhoWork:null
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
				            		<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
				              		class="rounded-circle img-fluid" style="width: 150px;">
									<h5 class="my-3">{{object.name}}</h5>
				            		<p class="text-muted mb-1">{{object.location.address.place}} {{object.location.address.zipCode}}</p>
				            		<p class="text-muted mb-4">{{object.location.longitude}}, {{object.location.latitude}}</p>
				            		<div class="d-flex justify-content-center mb-2" v-if="user.role === 'Admin' ">
				              			<button type="button" class="btn btn-primary" v-on:click="deleteObject(object.id)">Delete</button>
				            		</div>
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
		
	}
});