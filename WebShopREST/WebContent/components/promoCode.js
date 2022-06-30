Vue.component("promo-code",{
	data:function(){
		return{
			
		}
	},
	template:
	`
	<div>
		<nav class="navbar navbar-inverse">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Fitness</a>
			    </div>
			    <div class="topnav">
				  <a  href="/web-project/#/home">Sports Objects</a>
				  <a href="/web-project/#/users">Users</a>
				  <a href="/web-project/#/training">Training</a>
				  <a class="active" href="/web-project/#/promo-code">Promo Code</a>
				</div>
			    <div class="nav navbar-nav navbar-right">
			      <a href="/web-project/#/myProfile" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile<li></a>
			      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
			    </div>
			  </div>
			</nav>
	</div>
	`
});