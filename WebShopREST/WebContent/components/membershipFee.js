Vue.component("membership-fee", { 
	data: function () {
	    return {
			user: null,
			membershipFies: null,
			selectedMemebershipFee: null,
			mode: 'BROWSE',
			promoCode: null,
			validPromoCode: null,
			used: false
			
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
				  <a href="/web-project/#/home">Sport Object</a>
				  <a href="/web-project/#/training">Training</a>
				  <a class="active" href="/web-project/#/membership-fee">Membership fee</a>
				</div>
				
			    <div class="nav navbar-nav navbar-right">
			      <a href="/web-project/#/myProfile" v-on:click="myProfile()"><span class="glyphicon glyphicon-user"></span> My profile</a>
			      <a href="/web-project/#/" on:click="logout()"><span class="glyphicon glyphicon-log-in"></span> Logout</a>
			    </div>			    
			  </div>
			</nav>
			
			<div class="container">
				<div class="row justify-content-center" v-bind:hidden="this.mode=='BROWSE'" v-if="selectedMemebershipFee != null">
					<div class="col-6 bg-white px-3 mb-3 pb-3">
                        <div class="d-flex align-items-center justify-content-between border-bottom">
                            <p class="py-2">Type</p>
                            <p class="py-2 text-muted">{{selectedMemebershipFee.type}}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between border-bottom">
                            <p class="py-2">Payment date</p>
                            <p class="py-2 text-muted">{{new Date() | dateFormat('DD.MM.')}}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between border-bottom">
                            <p class="py-2">Expiration Date</p>
                            <p class="py-2 text-muted">{{selectedMemebershipFee.expirationDate | dateFormat('DD.MM.YYYY.')}}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between border-bottom">
                            <p class="py-2">Price</p>
                            <p class="py-2 text-muted">{{selectedMemebershipFee.price}}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="py-2">Possible training per day</p>
                            <p class="py-2 text-muted">{{selectedMemebershipFee.numberOfTerm}}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="py-2">Promo code</p>
                            <div>
                            	</br>	                            
	                            <input class=" d-inline-block" v-model="promoCode" style="width: 100px" type="text"/>
	                            <input class="btn btn-secondary btn-sm" v-on:click="checkPromoCode()" value="Check" type="button"/> 
	                            </br>
	                            <p id="invalidPromo" style="color: red" hidden="true">Invalid promo code</p>
                            </div>
                            
                        </div>
                        <div class="d-flex align-items-center justify-content-center">                                                      	                            
	                            <input v-on:click="confirmBuy()" class="btn btn-primary" style="margin: 20px 40px 0px 0px" value="Confirm"  type="button"/>
								<input class="btn btn-secondary" style="margin: 20px 0px 0px 0px" value="Cancel" type="button"/>          
                            	
                        </div>
                    </div>
				</div>
				<div class="row">
		    		<div class="col">
			    		<table class="table table-striped table-dark ">
			    			<thead>
				    		<tr>
				    			<th>Type</th>				    							    			
				    			<th>Price</th>		
				    			<th>Status</th>		
				    			<th>Per day</th>  
				    			<th>More</th>  				
				    		</tr>
				    		</thead>
				    		<tbody>
				    		<tr v-for="mf in membershipFies">
				    			<td>{{mf.type}}</td>				    							    			
				    			<td>{{mf.price}}</td>				    			
				    			<td v-if="user.membershipFee != null && mf.id == user.membershipFee.id && user.membershipFee.expirationDate >= new Date()"><span class="badge badge-success rounded-pill">{{user.membershipFee.status}}</span></td>					    							    							    			
				    			<td v-else><span class="badge badge-success rounded-pill">{{mf.status}}</span></td>
				    			<td>{{mf.numberOfTerm}}</td>
				    			<td><button type="button" v-on:click="showInfo(mf.id)" class="btn btn-secondary btn-sm btn-rounded">
				          Select
				        </button></td>	    				
				    		</tr>
				    		</tbody>
				    	</table>    
				    </div>
			    </div>
			</div>
	</div>	
	  `
	  ,
	  mounted () {
        axios
        .get('rest/currentUser')
        .then(response => (this.user = response.data));
        axios
        .get('rest/membership-fee')
        .then(response => (this.membershipFies = response.data));
        
    },
    methods: {
	generateExpirationDate: function(){			
			if(this.selectedMemebershipFee.type == 'Daily'){
				this.selectedMemebershipFee.expirationDate = new Date();
			} else if (this.selectedMemebershipFee.type == 'Monthly') {
				moment(this.selectedMemebershipFee.expirationDate).add(1, 'M');
			}
			
		},
    	showInfo: function(id){
			axios
			.get('rest/membership-fee/' + id)
			.then(response =>{this.selectedMemebershipFee = response.data;
			 this.selectedMemebershipFee.expirationDate = new Date();
			 if (this.selectedMemebershipFee.type == 'Monthly') {				
				this.selectedMemebershipFee.expirationDate.setDate(this.selectedMemebershipFee.expirationDate.getDate() + 31);				
			 } else if (this.selectedMemebershipFee.type == 'Annual'){				
				this.selectedMemebershipFee.expirationDate.setDate(this.selectedMemebershipFee.expirationDate.getDate() + 365);
			} else if (this.selectedMemebershipFee.type == 'Daily') {
				this.selectedMemebershipFee.expirationDate.setDate(this.selectedMemebershipFee.expirationDate.getDate() + 1);
			}
			 });
			this.mode = 'SELECT';	
			this.used = false;			
		},
		checkPromoCode: function(){
			if(this.promoCode == null){
				return;
			}
			axios
			.get('rest/promo-code/name='+ this.promoCode)
			.then(response => {if(response.status == 200){
									currentDate = new Date();
									document.getElementById("invalidPromo").hidden = true;	
									this.validPromoCode = response.data;	
									
									if(currentDate > this.validPromoCode.dateStart && currentDate < this.validPromoCode.dateEnd && this.validPromoCode.numberOfUse > 0){										
										if(this.used == false){
											this.selectedMemebershipFee.price = this.selectedMemebershipFee.price - (this.selectedMemebershipFee.price*this.validPromoCode.percentage)/100;
											this.used = true;	
										}									
																			
									} else {
										document.getElementById("invalidPromo").hidden = false
									}	
								}														  
							  })
			.catch(document.getElementById("invalidPromo").hidden = false)
				
		},
		confirmBuy: function(){
			axios
			.put('rest/users/fee-' + this.user.username, {
				"id": this.selectedMemebershipFee.id,
				"type": this.selectedMemebershipFee.type,
				"paymentDate": new Date(),
				"expirationDate": this.selectedMemebershipFee.expirationDate,
				"price": this.selectedMemebershipFee.price,
				"username": this.user.username,
				"status": "Active",
				"numberOfTerm": this.selectedMemebershipFee.numberOfTerm
			})
			.then( response =>{               
               this.mode = 'BROWSE';
               this.user.membershipFee.status = "Active";  
               alert('REFRESH PAGE!');             
            });
            if(this.used == true){
				axios
				.put('rest/promo-code/' + this.validPromoCode.id)
			}
            
			
		} 
		
    	},
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
   	},
	  
});