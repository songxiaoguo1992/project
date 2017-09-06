import Vue from 'vue'
import App from './App.vue'
//import router from './router.config'
import goods from './components/goods.vue'
import rating from './components/rating.vue'
import seller from './components/seller.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//const router=new VueRouter(routerConfig)

const routes=[
		{path:'/',name:"/",component:goods},
		{path:'/goods',name:"goods",component:goods},
		{path:'/rating',name:"rating",component:rating},
		{path:'/seller',name:"seller",component:seller}
	]
const router = new VueRouter({ routes}) 

//时间戳过滤器
Vue.filter('data', function(value) {
   var d = new Date();
   var year = d.getFullYear();
   var month = d.getMonth() + 1;
   var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
   var hour = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();
   return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
})


new Vue({
  router:router,
  el: '#app',
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
