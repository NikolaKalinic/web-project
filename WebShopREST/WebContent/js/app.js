const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const SportsObjects = { template: '<sportsObjects></sportsObjects>' }
const Login = { template: '<login></login>'}
const Register = {template: '<register></register>'}
const Home = { template: '<home></home>'}
const MyProfile = {template: '<myProfile></myProfile>'}
const Users = {template: '<users></users>'}
const ObjectInfo = { template: '<object-info></object-info>'}
const Training = { template: '<training></training>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [		
		{ path: '/', name: 'home', component: SportsObjects},
	    { path: '/products', component: Products},
	    { path: '/login', component: Login},
	    { path: '/register', component: Register},
	    { path: '/home', component: Home},
	    { path: '/myProfile', component: MyProfile},
	    { path: '/users', component: Users},
	    { path: '/object/:id', component: ObjectInfo},
	    { path: '/training', component: Training}
	  ]
});

var app = new Vue({
	router,
	el: '#sportsObjects'
});