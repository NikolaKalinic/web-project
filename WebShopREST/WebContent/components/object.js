Vue.component("object-info",{
	data:function(){
		return{
			id:-1,
			object:null,
			user : null,
			comments:null,
			name:null,
			mark:-1
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
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                <div class="progress rounded mb-2" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                <div class="progress rounded mb-2" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
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
		
	},
	methods: {
		deleteObject : function(id) {
    		r = confirm("Are you sure?")
    		if (r){
	    		axios
	            .delete('rest/objects/' + id)
	            .then(router.push('/home'))
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