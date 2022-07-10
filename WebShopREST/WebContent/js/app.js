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
const PromoCode = { template: '<promo-code></promo-code>'}
const MembershipFee = { template: '<membership-fee></membership-fee>'}
const MyObject = { template: '<my-object></my-object>'}
const AddNewUser = { template: '<add-new-user></add-new-user>'}
const AddNewObject = { template: '<add-new-object></add-new-object>'}
const newContent = { template: '<new-content></new-content'}
const changeContent = { template : '<change-content></change-content'}
const addNewContentTraining = { template : '<new-content-training></new-content-training>'}

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
	    { path: '/training', component: Training},
	    { path: '/promo-code', component: PromoCode},
	    { path: '/membership-fee', component: MembershipFee},
	    { path: '/my-object', component: MyObject},
	    { path: '/add-new-user', component: AddNewUser},
	    { path: '/add-new-object', component:AddNewObject},
	    { path: '/new-content/:id', component: newContent},
	    { path: '/change-content/:id', component: changeContent},
	    { path: '/new-content-training/:id', component: addNewContentTraining}
	  ]
});

var app = new Vue({
	router,
	el: '#sportsObjects'
});