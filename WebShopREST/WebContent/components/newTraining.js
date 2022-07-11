Vue.component("new-training", {
	data: function (){
		return {
			objectId: -1,	
			sportObjects: [],
			coaches: [],
			user: {}					
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
      <div id="app" class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div
              class="card shadow-2-strong card-registration"
              style="border-radius: 15px"
            >
              <div class="card-body p-4 p-md-5">
                <h3 class="text-center mt-3">New training</h3>
                <br>
                <form>
								<div class="form-group"> 
									<label  class="control-label text-center" for="date">Name</label>
									<input  class="form-control" v-model="name" name="name"
									v-model="name"
									id="name"   type="text" required/>
								</div>
								<div class="form-group"> 
									<label  class="control-label" for="date">Type</label>
										<select v-model="type" class="browser-default custom-select form-control form-control-lg">
								        <option selected="">Open this select menu</option>
								        <option value="Group">Group</option>
								        <option value="Personal">Personal</option>					        
					      			</select>
								</div>
								<div class="form-group"> 
									<label  class="control-label" for="date">Sport object</label>
									<select v-model="sportObject" class="browser-default custom-select form-control form-control-lg">
								    <option v-for="item in sportObjects" :value="item.id">{{item.name}}</option>
									</select>
								</div>
								<div class="form-group"> 
									<label  class="control-label" for="date">Duration in minutes</label>
									<input  class="form-control"  name="durationInMinutes"
									v-model="durationInMinutes"
									id="durationInMinutes"  type="text" required/>
								</div>
								<div class="form-group"> 
									<label  class="control-label" for="date">Coach</label>
									<select v-model="coach" class="browser-default custom-select form-control form-control-lg">
									<option value="0" >None</option>
								    <option v-for="item in coaches" :value="item.id">{{item.firstName}} {{item.lastName}}</option>
									</select>
								</div>
								<div class="form-group"> 
									<label class="control-label" for="date">Date</label>
									<input class="form-control"  name="dateTime"
									v-model="dateTime"
									id="dateTime"   type="date" required/>
								</div>
								<div class="form-group"> 
									<label  class="control-label" for="date">Describe</label>
									<input  class="form-control"  name="describe"
									v-model="describe"
									id="describe"  type="text"/>
								</div>
								<div class="form-group">
									<label  class="control-label" for="date">Image</label>
									<input
			                            type="file"
			                            id="path"
			                            v-model="path"			                            
			                            class="form-control form-control-lg"
			                            placeholder="Image"
			                            required
			                          />
								</div>
								
								<div class="form-group"> <!-- Submit button -->
									
									
								</div>
								</form>
								<div class="d-flex justify-content-center mb-2">
						              <button  class="btn btn-primary" v-on:click="submit()">Submit</button>
						              
						        </div>
                	<div class="text-center mt-5">
                		
                	</div>
              </div>
            </div>
          </div>
        </div>
    	</section>
      </div>
      </div>
	`,
	mounted() {
		axios
		.get('rest/objects')
		.then( response => { this.sportObjects = response.data});
		axios
		.get('rest/users/coaches')
		.then( response => { this.coaches = response.data});
		axios
		.get('rest/currentUser')
		.then(response => { this.user= response.data});
	},
	methods: {
		submit: function(){
			axios
			.post('rest/trainings',
			{
				name:this.name,
				type:this.type,	
				sportObject: this.sportObject,
				durationInMinutes: this.durationInMinutes,	
				coach: this.coach,
				dateTime: this.dateTime,
				describe: this.describe,						
        		path: "images/"+document.getElementById('path').files[0].name
			})
			.then( response => {axios
								.put('rest/users/trainings-' + this.user.id + '-' + response.data)
								.then( response => {router.push('/training')});
					});
			
		}
	}
});