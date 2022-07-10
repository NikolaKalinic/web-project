Vue.component("new-content", {
	data: function (){
		return {
			id: -1,
			objectId: -1
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
                <form  @submit.prevent="getFormValues">
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="componentName"
                          >Name</label
                        >
                        <input
                          type="text"
                          id="componentName"
                          v-model="name"
                          name = "componentName"
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
					        <option value="Swimming">Swimming</option>
					        <option value="Crossfit">Crossfit</option>
					        <option value="Dancing">Dancing</option>
					        <option value="Bodybuilding">Bodybuilding</option>
					        <option value="Sauna">Sauna</option>
					      </select>
                        </div> 
						
                      </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 d-flex align-items-center">
                      <div class="form-outline datepicker w-100">
                        <label for="birthdayDate" class="form-label"
                          >Description</label
                        >
                        <input
                          type="text"
                          name="description"
                          v-model="description"
                          class="form-control form-control-lg"
                          id="description"
                          placeholder="Description"                          
                        />
                      </div>
                    </div>
                 <div class="row">
                      <div class="col-md-6 mb-4">
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

                  

                  <div class="text-center mt-5">
                    <input
                      class="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    	</section>
      </div>
      </div>
	`,
	mounted() {
		this.objectId = this.$route.params.id;
		console.log(this.objectId);
	},
	methods: {
		newContent() {
			axios.post(
				'rest/contents',
				{
					name: this.name,
					type: this.type,
					description: this.description,
					path: "images/"+document.getElementById('path').files[0].name
					
				}).then ( response => {
					axios.get('rest/contents/name-' + this.name)
					.then( response => {this.id = response.data, 
					axios.put('rest/objects/addContent-' + this.id + '/' + this.objectId)
					.then( response => {router.push('/my-object')});});										
				}).catch( error => {
					this.error = 'Name already exists!';
				});
			
			
			
		},
		
		getFormValues (submitEvent){
			axios
			.get('rest/contents/exists/' + this.name)
			.then(response => {if(response.status != 200)
								document.getElementById("nameExists").hidden=false;
								else{
									document.getElementById("nameExists").hidden=true;
									console.log("prosao");
									this.newContent();
								}})
			.catch(document.getElementById("nameExists").hidden=false);
		}
	}
	
	
});