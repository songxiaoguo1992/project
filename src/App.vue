<template>
  <div id="app">
    <headers :seller="seller"></headers>
    <div class="tab">
    	<ul class="ul">
    		<router-link tag="li" class="tab-item" to='/goods'>商品</router-link>
    		<router-link tag="li" class="tab-item" to='/rating'>评论</router-link>
    		<router-link tag="li" class="tab-item" to='/seller'>商家</router-link>
    	</ul>
    	<router-view :seller="seller"></router-view>
    </div>
    <contents></contents>
  </div>
</template>

<script>
import axios from 'axios'
import headers from './components/header.vue'
import contents from './components/content.vue'

export default {
  name: 'app',
  data () {
    return {
    	seller:{
    	}
    }
  },
  components:{
  	headers,
  	contents
  },
  created: function (){
  	axios.get('./data.json').then(function(res){
	 	 	this.seller=res.data.seller
	 	 }.bind(this)).catch(function(res){
	 	 		console.log(res)
	 	 });
  },
  methods:{
  }
}
</script>
<style>
	.tab .ul{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.tab-item{
		flex: 1;
		text-align: center;
		cursor: pointer;
		font-size: 14px;
		color: rgb(77,85,93);
	}
	.router-link-active{
		color: rgb(200,20,20);
	}
</style>