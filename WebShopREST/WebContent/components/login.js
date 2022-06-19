Vue.component("login", { 
	data: function () {
	    return {
			error:"You entered the wrong password or username.",
			user:null
	    }
	},
	    template: ` 
    	<div>	
		<div class="topnav">
			  <a href="/web-project/#/">Home</a>
			  <a class="active" href="/web-project/#/login">Login</a>
			  <a href="/web-project/#/register">Register</a>
		</div>
	
		<section>
	      <div  class="container mt-5 pt-5">
	        <div class="row">
	          <div class="col-12 col-sm-7 col-md-6 m-auto">
	            <div class="card border-0 shadow">
	              <div class="card-body">
	              <div class="text-center mt-3">
	                    <h2>Sign in</h2>
	                    <br>
	                    <p id="err"style="color:red" hidden="true">{{error}}</p>
	                </div>
	                <form @submit.prevent="getFormValues">
	                  <input type="text" v-model="username" name="" id="" class="form-control my-4 py-2" placeholder="Username" />
	                  <input type="password" v-model="password" name="" id="" class="form-control my-4 py-2" placeholder="Password" />
	                  <div class="text-center mt-3">
	                    <button class="btn btn-primary" v-on:click="login()">Login</button>
	                    <a href="/web-project/#/register" class="nav-link">Create account</a>
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
    mounted () {
        
    },
    methods: {
		login : function(){
			if(typeof this.username === typeof undefined || typeof this.password === typeof undefined){
				document.getElementById("err").hidden=false;
			}else{
				document.getElementById("err").hidden=true;
				
				axios
				.post('rest/login',   
                {
                    username: this.username,
                    password: this.password,
                })
				.then(response => {if(response.status != 200) document.getElementById("err").hidden=false; else router.push(`/home`);})
				.catch(document.getElementById("err").hidden=false);
			}
		},
		
		getFormValues (submitEvent) {
            this.login();
        }
    	/*addProduct : function() {
    		router.push(`/products/-1`);
    	},
    	editProduct : function(id) {
    		router.push(`/products/${id}`);
    	},
    	deleteProduct : function(id, index) {
    		r = confirm("Are you sure?")
    		if (r){
	    		axios
	            .delete('rest/products/' + id)
	            .then(response => (this.products.splice(index, 1)))
    		}
    	} */
    }
});