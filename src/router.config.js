import Vue from 'vue'
import Router from 'vue-router'

import goods from './components/goods.vue'
import rating from './components/rating.vue'
import seller from './components/seller.vue'
Vue.use(Router)

export default new Router({
//	mode:'history',
	
	routes:[
		{path:'/',name:"/",component:goods},
		{path:'/goods',name:"goods",component:goods},
		{path:'/rating',name:"rating",component:rating},
		{path:'/seller',name:"seller",component:seller}
	]
})
