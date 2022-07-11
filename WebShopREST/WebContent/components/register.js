Vue.component("register", { 
	data: function () {
	    return {		
	    }
	},
	    template: ` 
    	<div>	
		 <nav class="navbar navbar-inverse">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a href="/web-project/#/">Home</a>
				  <a href="/web-project/#/login">Login</a>
				  <a class="active" href="/web-project/#/register">Register</a>
				</div>
			    <div class="nav navbar-nav navbar-right" style="visibility: hidden">
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
                <h3 class="text-center mt-3">Registration Form</h3>
                <br>
                <form  @submit.prevent="getFormValues">
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="firstName"
                          >First Name</label
                        >
                        <input
                          type="text"
                          id="firstName"
                          v-model="firstName"
                          name = "firstName"
                          class="form-control form-control-lg"
                          placeholder="First Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="lastName"
                          >Last Name</label
                        >
                        <input
                          type="text"
                          id="lastName"
                          v-model="lastName"
                          name="lastName"
                          class="form-control form-control-lg"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="firstName"
                          >Username</label
                        >
                        <input
                          type="text"
                          id="username"
                          v-model="username"
                          name="username"
                          class="form-control form-control-lg"
                          placeholder="Username"
                          required
                        />
                        <p id="usernameExists" hidden="true" style="color:red">Username already exists</p>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <label class="form-label" for="lastName"
                          >Password</label
                        >
                        <input
                          type="password"
                          v-model="password"
                          id="password"
                          name="password"
                          class="form-control form-control-lg"
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 d-flex align-items-center">
                      <div class="form-outline datepicker w-100">
                        <label for="birthdayDate" class="form-label"
                          >Birthday</label
                        >
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
                   <!--  --> <div class="col-md-6 mb-4">
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
                        <label class="form-check-label" for="femaleGender"
                          >Female</label
                        >
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
                        <label class="form-check-label" for="maleGender"
                          >Male</label
                        >
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
                        <label class="form-check-label" for="otherGender"
                          >Other</label
                        >
                      </div>
                    </div>
                  </div> 

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <label class="form-label" for="emailAddress"
                          >Email</label
                        >
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
    mounted () {
        
    },
    methods: {
    	async register() {
            await axios.post(
                "rest/users",
                {
                    username: this.username,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    gender: this.picked,
                    dateOfBirth: this.dateOfBirth,
                    role: "Customer",
                    email: this.email
                }
            )
            .then( response =>{
               // window.location.href = 'sportsObjects.html';
               router.push(`/login`);
            })
            .catch( error => {
                this.error = 'Postoji korisnik sa datim korisnickim imenom';
            })
        },
        
        getFormValues (submitEvent) {
			axios
			.get('rest/users/exists/'+this.username)
			.then(response => {if(response.status !=200)
									document.getElementById("usernameExists").hidden=false;
								else{
									document.getElementById("usernameExists").hidden=true;
									this.register();
								}})
            .catch(document.getElementById("usernameExists").hidden=false);
            
        }
    }
});