<template>
	<div>
	  <div id="shopcart">
	    <div class="content" @click="toggleList">
		    <div class="content-left">
		    	<div class="logo-wrapper">
		    		<div class="logo" :class="{'heightlight':totalCount>0}">
		    			<span class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></span>
		    		</div>
		    		<div class="num" v-show="totalCount>0">{{totalCount}}</div>
		    	</div>
		    	<div class="price" :class="{'heightlight':totalPrice>0}">{{totalPrice}}元</div>
		    	<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		    </div>
		    <div class="content-right" @click.stop.prevent="pay">
		    	<div class="pay" :class="payClass">{{payDes}}</div>
		    </div>
	    </div>
	    <transition name="fold">
		  	<div class="shopcart-list" v-show="listShow">
		  		<div class="list-header">
		  			<h1 class="title">购物车</h1>
		  			<span class="empty" @click="empty">清空</span>
		  		</div>
		  		<div class="list-content" ref="listContent">
		  			<ul>
		  				<li class="food" v-for="food in selectFoods">
		  					<span class="name">{{food.name}}</span>
		  					<div class="price">
		  						<span>￥{{food.price*food.count}}</span>
		  					</div>
		  					<div class="cartcontrol-wrapper">
		  						<cartcontrol :food="food"></cartcontrol>
		  					</div>
		  				</li>
		  			</ul>
		  		</div>
		  	</div>
	  	</transition>
	  </div>
  	<div class="list-mask" @click="hideList" v-show="listShow"></div>
	</div>
</template>

<script  type="text/javascript">
import BScroll from 'better-scroll'
import cartcontrol from './cartcontrol.vue'

export default {
  props:{
  	selectFoods:{
  		type:Array,
  		default(){
  			return [{
  				price:10,
  				count:1
  			}]
  		}
  	},
  	deliveryPrice:{
  		type:Number,
  		default:0
  	},
  	minPrice:{
  		type:Number,
  		default:0
  	}
  },
  data(){
		return{
			fold:true
		}
	},
  computed:{
  	totalPrice(){
  		let total=0;
  		this.selectFoods.forEach((food)=>{
  			total+=food.price*food.count;
  		});
  		return total;
  	},
  	totalCount(){
  		let count=0;
  		this.selectFoods.forEach((food)=>{
  			count+=food.count;
  		});
  		return count;
  	},
  	payDes(){
  		if(this.totalPrice===0){
  			return `￥${this.totalPrice}元起送`;
  		}else if(this.totalPrice<this.minPrice){
  			let diff=this.minPrice-this.totalPrice;
  			return `还差￥${diff}元起送`;
  		}else{
  			return '去结算'
  		}
  	},
  	payClass(){
  		if(this.totalPrice<this.minPrice){
  			return 'not-enough'
  		}else{
  			return 'enough'
  		}
  	},
  	listShow(){
  		if(!this.totalCount){
  			this.fold=true;
  			return false;
  		}
  		let show=!this.fold;
  		
  		if(show){
  			this.$nextTick(()=>{
  				if(!this.scroll){
	  				this.scroll=new BScroll(this.$refs.listContent, {
	            click: true
	        	});
	        }else{
		  			this.scroll.refresh();
		  		}
  			})
  		}
  		return show;
  	}
  },
  components:{
  	cartcontrol
  },
  methods:{
  	toggleList(){
  		if(!this.totalCount){
  			return;
  		}
  		this.fold=!this.fold;
  	},
  	empty(){
  		this.selectFoods.forEach((food)=>{
  			food.count=0;
  		})
  	},
  	hideList(){
  		this.fold=true;
  	},
  	pay(){
  		if(this.totalPrice<this.minPrice){
  			return;
  		}
  		window.alert(`需要支付￥${this.totalPrice}元`)
  	}
  }
}
</script>
<style type="text/css">
	#shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		background: #141d27;
		color: rgba(255,255,255,0.4);
	}
	#shopcart .content{
		display: flex;
		font-size: 0;
	}
	.content-left{
		flex: 1;
	}
	.logo-wrapper{
		display: inline-block;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141D27;
	}
	.logo-wrapper .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.logo.heightlight{
		background: rgb(0,160,220);
	}
	.icon-shopping_cart{
		line-height: 44px;
		font-size: 24px;
		color: #80858a;
	}
	.icon-shopping_cart.heightlight{
		color: #fff;
	}
	.num{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.content-left .price{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin-top: 12px;
		box-shadow: border-box;
		padding-right: 12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
	}
	.price.heightlight{
		color: #fff;
	}
	.content-left .desc{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin:12px 0 0 12px ;
		font-size: 10px;
		font-weight: 700;
	}
	.content-right{
		flex: 0 0 105px;
		width: 105px;
	}
	.pay{
		height: 48px;
		line-height: 48px;
		font-size: 12px;
		text-align: center;
		font-weight: 700;
		background: #2b333b;
	}
	.not-enough{
		background: #2b333b;
	}
	.enough{
		background: #00b43c;
		color: #fff;
	}
	.shopcart-list{
		position: absolute;
		left: 0;
		bottom: 48px;
		z-index: -1;
		width: 100%;
	}
	.fold-enter-active, .fold-leave-active{
  	transition: all 0.5s ease 
  }   
	.fold-enter, .fold-leave-active{
  	opacity: 0;
  }
	.list-header{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.list-header .title{
		float: left;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.list-header .empty{
		float: right;
		font-size: 12px;
		color: rgb(0,160,220);
	}
	.list-content{
		padding: 0 18px;
		max-height: 217px;
		background: #fff;
		overflow: hidden;
	}
	.list-content .food{
		position: relative;
		padding: 12px 0;
		box-sizing:border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.list-content .name{
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.list-content .price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
	}
	.cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 6px;
	}
	.list-mask{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 40;
		background: rgba(7,17,27,0.6);
	}
</style>