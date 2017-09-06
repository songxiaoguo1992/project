import goods from './components/goods.vue'
import rating from './components/rating.vue'
import seller from './components/seller.vue'


export default{
	mode:'history',
	
	routes:[
		{path:'/',name:"/",component:goods},
		{path:'/goods',name:"goods",component:goods},
		{path:'/rating',name:"rating",component:rating},
		{path:'/seller',name:"seller",component:seller},
		{path: "", redirect: '/goods' }
	]
}
