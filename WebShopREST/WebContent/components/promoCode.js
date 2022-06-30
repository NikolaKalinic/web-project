Vue.component("promo-code",{
	data:function(){
		return{
			promoCodes: null,
			validPromoCodes: null,
			name: null,
			dateStart: null,
			dateEnd: null,
			numberOfUse: null,
			percentage: null,
			mode: 'BROWSE'			
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
			<div class="container">
				<div class="row"  >
					<div class="justify-content-center">
				  		<div class="row">
				   			<div class="col-md-6 col-sm-6 col-xs-12 ">
								<div class="d-flex justify-content-center mb-2">
								  <button v-bind:hidden="this.mode=='NEW'" class="btn btn-primary" v-on:click="newPromoCodeButtonClick()">New promo code</button>
								</div>
				    		<!-- Form code begins -->
								<form>
								<div class="form-group"> 
									<label v-bind:hidden="this.mode=='BROWSE'" class="control-label text-center" for="date">Name</label>
									<input v-bind:hidden="this.mode=='BROWSE'" class="form-control" v-model="name" name="name"
									v-model="name"
									id="name"   type="text"/>
								</div>
								<div class="form-group"> 
									<label v-bind:hidden="this.mode=='BROWSE'" class="control-label" for="date">Date start</label>
									<input v-bind:hidden="this.mode=='BROWSE'" class="form-control"  name="dateStart"
									v-model="dateStart"
									id="dateStart"   type="date"/>
								</div>
								<div class="form-group"> 
									<label v-bind:hidden="this.mode=='BROWSE'" class="control-label" for="date">Date end</label>
									<input v-bind:hidden="this.mode=='BROWSE'" class="form-control" name="dateEnd"
									v-model="dateEnd"
									id="dateEnd"   type="date"/>
								</div>
								<div class="form-group"> 
									<label v-bind:hidden="this.mode=='BROWSE'" class="control-label" for="date">Number of use</label>
									<input v-bind:hidden="this.mode=='BROWSE'" class="form-control"  name="numberOfUse"
									v-model="numberOfUse"
									id="numberOfUse"  type="text"/>
								</div>
								<div class="form-group"> 
									<label v-bind:hidden="this.mode=='BROWSE'" class="control-label" for="date">Sale</label>
									<input v-bind:hidden="this.mode=='BROWSE'" class="form-control" name="percentage"
									v-model="percentage"
									id="percentage"  type="text"/>
								</div>
								
								<div class="form-group"> <!-- Submit button -->
									
									<div class="d-flex justify-content-center mb-2">
						              <button v-bind:hidden="this.mode=='BROWSE'" v-on:click="newPromoCode()" class="btn btn-primary" type="submit">Submit</button>
						              <button v-bind:hidden="this.mode=='BROWSE'" v-on:click="cancelButtonClick()" type="button" class="btn btn-outline-primary ms-1">Cancel</button>
						            </div>
								</div>
								</form>
								<!-- Form code ends --> 
							</div>
				    	</div>
				  	</div>    
				</div>				
				<div class="row">
		    		<div class="col">
			    		<table class="table table-striped table-dark">
			    			<thead>
				    		<tr>
				    			<th>Name</th>
				    			<th>Period</th>
				    			<th>Number of use</th>
				    			<th>Sale</th>				    				
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="pc in promoCodes" v-if="pc.dateEnd > new Date()">
				    			<td>{{pc.name}}</td>
				    			<td>{{pc.dateStart | dateFormat('DD.MM.YYYY.')}} - {{pc.dateEnd | dateFormat('DD.MM.YYYY.')}}</td>
				    			<td>{{pc.numberOfUse}}</td>
				    			<td>{{pc.percentage}}%</td>				    				
				    		</tr>
				    		</tbody>
				    	</table>    
				    </div>
			    </div>
			</div>
			
		</div>
		
	</div>
		
	`,
	mounted(){				
		axios
		.get('rest/promo-code')
		.then(response => (this.promoCodes = response.data));		
	},
	methods:{
		showDate: function(){
			alert(this.dateStart);
		},
		newPromoCode: function() {
            axios.post(
                "rest/promo-code",
                {
                    name: this.name,
                    dateStart: this.dateStart,
                    dateEnd: this.dateEnd,
                    numberOfUse: this.numberOfUse,
                    percentage: this.percentage,
                    
                }
            )
            .then( response =>{
               // window.location.href = 'sportsObjects.html';
               //alert("New promo code added!");
            });
            this.mode = 'BROWSE';
        },
        newPromoCodeButtonClick: function(){
			this.mode = 'NEW';
		},
		cancelButtonClick: function(){
			this.mode = 'BROWSE';
			this.name = null;
			this.dateStart = null;
			this.dateEnd = null;
			this.numberOfUse = null;
			this.percentage = null;
		}
		 
		
	},
	filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	},
   	
});