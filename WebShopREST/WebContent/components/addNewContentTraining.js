Vue.component("new-content-training", {
	data: function (){
		return {
			id: -1,
			content: null,
			trainingId: -1			
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
                <h3 class="text-center mt-3">New content</h3>
                <br>
                <form>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="trainingName"
                          >Name</label
                        >
                        <input
                          type="text"
                          id="trainingName"
                          v-model="trainingName"
                          name = "trainingName"
                          class="form-control form-control-lg"
                          placeholder="Name"
                          required
                        />
                        <p id="nameExists" hidden="true" style="color:red">Name already exists</p>
                      </div>
                    </div>                    

                  <div class="row">
                    
                    <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <label class="form-label" for="userType">Type</label>
                          <select v-model="type" class="browser-default custom-select form-control form-control-lg">
					        <option selected="">Open this select menu</option>
					        <option value="Group">Group</option>
					        <option value="Personal">Personal</option>					        
					      </select>
                        </div> 
						
                      </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 d-flex align-items-center">
                      <div class="form-outline datepicker w-100">
                        <label for="durationInMinutes" class="form-label"
                          >Duration in minutes</label
                        >
                        <input
                          type="text"
                          name="durationInMinutes"
                          v-model="durationInMinutes"
                          class="form-control form-control-lg"
                          id="durationInMinutes"
                          placeholder="Duration" 
                          requared                         
                        />
                      </div>
                    </div>
                 <div class="row">
                      <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <label class="form-label" for="">Image</label>
                          <input
                            type="file"
                            id="path"
                            v-model="path"
                            name="username"
                            class="form-control form-control-lg"
                            placeholder="Image"
                            required
                          />
                        </div>
                      </div>

                  

                  
                    
                  
                </form>
                	<div class="text-center mt-5">
                		<button class="btn btn-primary profile-button" v-on:click="submit()">Submit</button>
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
		this.id = this.$route.params.id;
		axios
		.get('rest/contents/' + this.$route.params.id)
		.then(response => {this.content = response.data});		
	},
	methods: {
		submit: function(){
			axios
			.post('rest/trainings',
			{
				name:this.trainingName,
				type:this.type,	
				sportObject: null,
				durationInMinutes: this.durationInMinutes,	
				dateTime: null,
				describe: null,
				coach: null,		
        		path: "images/"+document.getElementById('path').files[0].name
			})
			.then(response =>{this.trainingId = response.data,
				axios
				.put('rest/contents/contentId-' + this.id + '/trainingId-' + this.trainingId)
				.then(response =>{alert('New training added')});
			});
			
		}
	}
	
	
});