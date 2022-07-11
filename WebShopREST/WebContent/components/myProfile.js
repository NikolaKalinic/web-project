Vue.component("myProfile", { 
	data: function () {
	    return {
	      user: null,
	      oldUsername: null
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
			  <a href="/web-project/#/home">Home</a>
			</div>
		    <div class="nav navbar-nav navbar-right">
		      <a href="/web-project/#/myProfile" class="active" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile<li></a>
		      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
		    </div>
		  </div>
		</nav>
    	
    	<div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">{{user.username}}</span><span class="text-black-50">{{user.email}}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" v-model="user.firstName"></div>
                    <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" v-model="user.lastName" placeholder="surname"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Username</label><input type="text" class="form-control" placeholder="enter username" v-model="user.username"><p id="usernameExists" hidden="true"  style="color:red">Username already exists</p></div>
                    <div class="col-md-12"><label class="labels">Password</label><input type="text" class="form-control" placeholder="enter password" v-model="user.password"></div>
                    <div class="col-md-12"><label class="labels">Gender</label><input type="text" class="form-control" placeholder="enter address line 2" v-model="user.gender"></div>
                    <div class="col-md-12"><label class="labels">Date of birth</label><input type="text" class="form-control" placeholder="enter date of birth" v-model="user.dateOfBirth"></div>
                    <div class="col-md-12"><label class="labels">Role</label><input type="text" disabled class="form-control" placeholder="enter role" v-model="user.role"></div>
                    <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="enter email" v-model="user.email"></div>
                    <div v-if="user.role === 'Customer' " class="col-md-12"><label class="labels">Customer type</label><input disabled type="text" class="form-control"  v-model="user.type"></div>
                    <div v-if="user.role === 'Customer' && user.membershipFee != null && user.membershipFee.expirationDate > new Date()" class="col-md-12"><label class="labels">Membership fee</label><input disabled type="text" class="form-control" v-model="user.membershipFee.type"></div>  
                    <div v-else class="col-md-12"><label class="labels">Membership fee</label><input disabled type="text" class="form-control" ></div>                  
                    <div v-if="user.role === 'Customer' " class="col-md-12"><label class="labels">Number of points</label><input disabled type="text" class="form-control"  v-model="user.numberOfPoints"></div>
                    
                    <div v-if="user.role === 'Manager' " class="col-md-12"><label class="labels">Sport object id</label><input disabled type="text" class="form-control"  v-model="user.sportObjectId"></div>
                </div>
                
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" v-on:click="updateProfile(this.user)">Save Profile</button></div>
            </div>
        </div>
        
    </div>
</div>
</div>
</div>
    		
    		
    	
    	</div>		
    	
    	
    	  
    	`,
    mounted () {
        axios
        .get('rest/currentUser')
        .then(response => {this.user = response.data;
        					 this.oldUsername = this.user.username;
        					 })
    },
    methods: {
   		updateProfile : function(user){
			axios
			.put("rest/users/" + this.oldUsername,
				{
                    username: this.user.username,
                    password: this.user.password,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    gender: this.user.gender,
                    dateOfBirth: this.user.dateOfBirth,
                    role: "Customer",
                    email: this.user.email
                })
			.then(response => {if(response.status !=200)
									document.getElementById("usernameExists").hidden=false;
								else{
									document.getElementById("usernameExists").hidden=true;									
								}})
            .catch(document.getElementById("usernameExists").hidden=false);
		}
    }
});