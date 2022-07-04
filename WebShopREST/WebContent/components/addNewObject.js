Vue.component("add-new-object",{
	data:function(){
		return{
			user:null,
			freeManagers:null
		}
	},
	template:`
		<div>
			<nav class="navbar navbar-inverse" v-if="user.role == 'Admin'">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/home">Sports Objects</a>
				  <a class="active" href="/web-project/#/users">Users</a>
				  <a href="/web-project/#/promo-code">Promo Code</a>
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
              <div class="card shadow-2-strong card-registration"style="border-radius: 15px">
                <div class="card-body p-4 p-md-5">
                  <h3 class="text-center mt-3">Add new sport object</h3>
                  <br>
                  <form  @submit.prevent="getFormValues">
                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="Name">Name</label>
                          <input
                          type="text"
                          id="name"
                          v-model="name"
                          name = "name"
                          class="form-control form-control-lg"
                          placeholder="Name"
                          required
                          />
                        </div>
                      </div>
                      <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <label class="form-label" for="userType">Object type</label>
                          <select v-model="type" class="browser-default custom-select form-control form-control-lg">
					        <option value="Gym" selected>Gym</option>
					        <option value="Pool">Pool</option>
					        <option value="SportCenter">SportCenter</option>
					        <option value="DanceStudio">DanceStudio</option>
					      </select>
                        </div> 
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
                      <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <label class="form-label" for="userType">Free managers</label>
					        <select v-model="testVal" class="browser-default custom-select form-control form-control-lg">
						    <option v-for="item in freeManagers" :value="item.username">{{item.firstName}} {{item.lastName}}</option>
							</select>
                        </div> 
                      </div>
                    </div>

                    <!--<div class="row">
                      <div class="col-md-6 mb-4 d-flex align-items-center">
                        <div class="form-outline datepicker w-100">
                          <label for="birthdayDate" class="form-label">Birthday</label>
                          <input
                            type="text"
                            name="dateOfBirth"
                            v-model="dateOfBirth"
                            class="form-control form-control-lg"
                            id="dateOfBirth"
                            placeholder="Date of Birthday"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <h6 class="mb-2 pb-1">Gender:</h6>
                        <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          v-model="picked"
                          id="femaleGender"
                          value="Female"
                          checked
                        />
                        <label class="form-check-label" for="femaleGender">Female</label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          v-model="picked"
                          id="maleGender"
                          value="Male"
                        />
                        <label class="form-check-label" for="maleGender">Male</label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          v-model="picked"
                          id="otherGender"
                          value="Other"
                        />
                        <label class="form-check-label" for="otherGender">Other</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <label class="form-label" for="emailAddress">Email</label>
                          <input
                            type="email"
                            name="email"
                            v-model="email"
                            id="emailAddress"
                            class="form-control form-control-lg"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div> -->
                      
                    </div>
                  </div>
                  
                  
                  <div class="text-center mt-5">
                    <input
                      class="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                      v-on:click="submit()"
                    />
                  </div>
                </form>
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
		
		axios
		.get('rest/users/freeManager')
		.then(response => {this.freeManagers= response.data;})
	},
	methods:{
		submit: function(){
			axios
			.post('rest/objects',
			{
				name:this.name,
				type:this.type,
				location: 
				{
		            "longitude": 124,
		            "latitude": 214,
		            "address": {
				                "street": "Bulevar",
				                "number": "123",
				                "place": "Novi Sad",
				                "zipCode": "122121",
				                "state": "Serbia"
								}
        		},
        		path:"images/"+document.getElementById('path').files[0].name
			})
			.then(response =>(alert("Dodao sam")))
		}
	}
});