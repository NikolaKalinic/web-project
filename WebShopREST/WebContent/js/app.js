const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const SportsObjects = { template: '<sportsObjects></sportsObjects>' }
const Login = { template: '<login></login>'}
const Register = {template: '<register></register>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [		
		{ path: '/', name: 'home', component: SportsObjects},
	    { path: '/products/:id', component: Product},
	    { path: '/login', component: Login},
	    { path: '/register', component: Register}
	  ]
});

var app = new Vue({
	router,
	el: '#sportsObjects'
});