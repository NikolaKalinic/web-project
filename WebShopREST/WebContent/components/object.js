Vue.component("object-info",{
	data:function(){
		return{
			id:-1,
			object:null,
			user : null
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
	}
});