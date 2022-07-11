Vue.component("object-info",{
	data:function(){
		return{
			id:-1,
			object:null,
			user : null,
			comments:null,
			name:null,
			mark:-1,
			contents: [],
			coaches: [],
			trainings: []
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
				  <a href="/web-project/#/home">Home</a>
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
				  <a href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/users">Users</a>
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
        <div class="card mb-4 mb-lg-0">
          <div class="card-body p-0">
  <!--KOMENTARI-->
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-comment"></span> 
                        Recent Comments
                    </h3>
                </div>
                <div class="panel-body">
                    <ul class="media-list">
                        <li class="media" v-for="comment in comments">
                            <div class="media-left">
                            	<!-- TODO STAVIII SLIKUUU POSLE --> 
                            </div>
                            <div class="media-body" v-if="(user.role=='Admin')">
                                <h4 class="media-heading">
                                     {{comment.customerId}}
                                    <span v-if="comment.status=='Pending'">
	                                    <button type="button" v-on:click="rejectComment(comment.id)" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove"></span></button>
	                                    <button type="button" v-on:click="acceptComment(comment.id)" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-ok"></span></button>
	                                <span>
	     
                                    <br>
                                </h4>
                                <p>
                                    {{comment.text}}
                                    <span class="badge badge-secondary">{{comment.status}}</span>
                                </p>
                            </div>
                            
                            <div class="media-body" v-if="(user.role=='Manager' && comment.status!='Pending' && comment.sportObjectId == user.sportObjectId)">
                                <h4 class="media-heading">
                                    {{comment.customerId}}
                                    <br>
                                </h4>
                                <p>
                                    {{comment.text}}
                                    <span class="badge badge-secondary">{{comment.status}}</span>
                                </p>
                            </div>
                            
                            <div class="media-body" v-else-if="(comment.status =='Accepted' && user.role!='Admin')">
                                <h4 class="media-heading">
                                      {{comment.customerId}}
                                </h4>
                                <p>
                                    {{comment.text}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
<div class="card" v-if="user.role=='Customer' && user.visitedObject.includes(object.id)">
          <div class="card-body p-4">
            <div class="d-flex flex-start w-100">
              <img class="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                height="65" />
              <div class="w-100">
                <h5>Add a comment</h5>
                <div class="starrating risingstar d-flex justify-content-center flex-row-reverse">
		            <input type="radio" id="star5" name="rating" v-on:click="convertMark(5)" value="5" /><label for="star5" title="5 star">5</label>
		            <input type="radio" id="star4" name="rating" v-on:click="convertMark(4)" value="4" /><label for="star4" title="4 star">4</label>
		            <input type="radio" id="star3" name="rating" v-on:click="convertMark(3)" value="3" /><label for="star3" title="3 star">3</label>
		            <input type="radio" id="star2" name="rating" v-on:click="convertMark(2)" value="2" /><label for="star2" title="2 star">2</label>
		            <input type="radio" id="star1" name="rating" v-on:click="convertMark(1)" value="1" /><label for="star1" title="1 star">1</label>
		        </div>
                <div class="form-outline">
                  <textarea class="form-control" id="textAreaExample" v-model="text" rows="4"></textarea>
                  <label class="form-label" for="textAreaExample">What is your view?</label>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <button type="button" class="btn btn-danger">Cancel</button>
                  <button type="button" v-on:click="send()" class="btn btn-success">Send</button>
                </div>
              </div>
            </div>
          </div>
</div>

       
            </div>
          </div>
        </div>
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
        
        <!-- CONTENTS!!!!!!! -->
        
        <div class="row">
        	<h2>Contents</h2>
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
							    			<th>Trainer</th>
							    			<th>Price</th>							    										    				
							    		</tr>
							    		</thead>
							    		<tbody>
							    		<tr v-for="tid in c.trainingId">
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false"><img class="img-circle" v-bind:src="t.path" :alt="image" width="50" height="50" /></td>
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false">{{t.name}}</td>
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false"><span v-for="coach in coaches" v-if="coach.id == t.coach">{{coach.firstName}} {{coach.lastName}}</span><span v-else>None</span></td>
							    			<td v-for="t in trainings" v-if="t.id == tid && t.canceled == false"><span v-if="t.price != 0">{{t.price}}rsd</span><span v-else>Free</span></td>							    				
							    		</tr>
							    		</tbody>
							    	</table>		            						            		
				            		
				          		</div>
							</div>
          
        </div>
      </div>
    </div>
  </div>
</section>
		
		</div>
	`,
	mounted(){
		axios
		.get('rest/currentUser')
		.then(response => {this.user= response.data;})
		
		this.id = this.$route.params.id;
		axios
		.get('rest/objects/'+this.id)
		.then(response => {this.object = response.data;})
		
		axios
		.get('rest/comments/object='+this.id)
		.then(response =>{this.comments = response.data;})
		
		axios
		.get('rest/contents')
		.then(response => {this.contents = response.data});
		
		axios
		.get('rest/users/coaches')
		.then( response => { this.coaches = response.data});
		
		axios
		.get('rest/trainings')
		.then(response => {this.trainings = response.data});
		
	},
	methods: {
		deleteObject : function(id) {
    		r = confirm("Are you sure?")
    		if (r){
	    		axios
	            .delete('rest/objects/' + id)
	            .then(router.push('/home'))
	            
	            axios
	            .put('rest/users/sportObjId='+id)
	            .then(console.log('uspeo'))
    		}
    	},
    	getUserById: function(id){
			axios
			.get('rest/users/id='+id)
			.then(response =>{this.name = response.data.firstName +" "+ response.data.lastName})
		},
		
		rejectComment: function(id){
			axios
			.put('rest/comments/reject='+id)
			.then(response => {this.comments = response.data})
		},
    	acceptComment: function(id){
			axios
			.put('rest/comments/accept='+id)
			.then(response => {this.comments = response.data})
		},
		send: function(){
			axios
			.post('rest/comments',{
				customerId: this.user.username,
				sportObjectId: this.object.id,
				text: this.text,
				deleted: false,
				status: "Pending",
				mark:this.mark
			})
			.then(alert("poslao sam"))
		},
		convertMark: function(id){
			this.mark=id;
		}
	}
});