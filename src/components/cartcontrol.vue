<template>
  <div id="cartcontrol">
  	<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)"></div>
  	<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
  	<div class="cart-add" @click="addCart($event)"></div>
  </div>
</template>
<script type="text/javascript">
	export default{
		props:{
			food:{
				type:Object
			}
		},
		created(){
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return
				}
				
				if(!this.food.count){
					this.$set(this.food,'count',1);
				}else{
					this.food.count++
				}
			},
			decreaseCart(event){
				if(!event._constructed){
					return
				}
				
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>
<style type="text/css">
#cartcontrol{
	font-size: 0;
}
	.cart-decrease{
		display: inline-block;
		background: url(../img/reduce.png);
		background-repeat: no-repeat;
		width: 24px;
		height: 24px;
	}
	.cart-count{
		display: inline-block;
		line-height: 24px;
		width: 20px;
		vertical-align: top;
		text-align: center;
		font-size: 16px;
		color: rgb(147,153,159);
	}
	.cart-add{
		display: inline-block;
		background: url(../img/plus.png);
		background-repeat: no-repeat;
		width: 24px;
		height: 24px;
	}
</style>