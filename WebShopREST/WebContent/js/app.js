const Product = { template: '<edit-product></edit-product>' }
const Products = { template: '<products></products>' }
const SportsObjects = { template: '<sportsObjects></sportsObjects>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [		
		{ path: '/', name: 'home', component: Products},
	    { path: '/products/:id', component: Product},
	    { path: '/sportsObjects', component: SportsObjects }
	  ]
});

var app = new Vue({
	router,
	el: '#products'
});