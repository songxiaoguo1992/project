<template>
	<div>
	  <div id="goods">
	    <div class="menu-wrapper" ref="menuWrapper">
	    	<ul>
	    		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
	    			<span class="text">
	    				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
	    				{{item.name}}
	    			</span>
	    		</li>
	    	</ul>
	    </div>
	    <div class="foods-wrapper" ref="foodsWrapper">
	    	<ul>
	    		<li v-for="item in goods" class="food-list food-list-hook">
	    			<h1 class="title">{{item.name}}</h1>
	    			<ul>
	    				<li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
	    					<div class="icon">
			    				<img width="57" height="57" :src="food.icon" />
			    			</div>
			    			<div class="content">
			    				<h2 class="name">{{food.name}}</h2>
			    				<p class="desc">{{food.description}}</p>
			    				<div class="extra">
			    					<span>月售{{food.sellCount}}份</span>
			    					<span>好评率{{food.rating}}%</span>
			    				</div>
			    				<div class="price">
			    					<span class="now">￥{{food.price}}</span>
			    					<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
			    				</div>
			    				<div class="cartcontrol-wrapper">
			    					<cartcontrol :food="food"></cartcontrol>
			    				</div>
			    			</div>
	    				</li>
	    			</ul>
	    			
	    				
	    		</li>
	    	</ul>
	    </div>
	  	<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	  	
	  </div>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from './shopcart.vue'
import cartcontrol from './cartcontrol.vue'
import food from './food.vue'

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee']
			
			axios.get('./data.json').then(function(res){
	 	 		this.goods=res.data.goods;
	 	 		this.$nextTick(() => { //初始加载BScroll
		            this._initScroll();
		            this._calculateHeight();
	        	});
	 	 		
		 	}.bind(this)).catch(function(res){
		 	 		console.log(res)
		 	});
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						return i
					}
				}
				return 0
			},
			selectFoods(){
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		methods:{
			selectMenu(index,event){
				if(!event._constructed){
					return
				}
				let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el=foodList[index];
				
				this.foodsScroll.scrollToElement(el,300);
			},
			_initScroll () {
		        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
		            click: true
		        });
		        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
		        	probeType:3,
		        	click: true
		        });
		        this.foodsScroll.on('scroll',(pos)=>{
		        	this.scrollY=Math.abs(Math.round(pos.y));
		        })
		    },
		    _calculateHeight () {
		        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
		        
		        let height=0;
		        this.listHeight.push(height);
		        for(let i=0;i<foodList.length;i++){
		        	let item=foodList[i];
		        	
		        	height+=item.clientHeight;
		        	this.listHeight.push(height);
		        }
    		},
    		selectFood(food,event){
	    		if(!event._constructed){
						return
					}
	    		this.selectedFood=food;
	    		
	     		this.$refs.food.show(); // 获取子组件里的方法
	    	}
		},
		components:{
			shopcart,
			cartcontrol,
			food
		}
	}
</script>
<style type="text/css">
	#goods{
		position: absolute;
		top: 174px;
		bottom: 46px;
		display: flex;
		width: 100%;
		overflow: hidden;
	}
	.menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu-wrapper .current{
		position: relative;
		z-index: 10;
		margin-top: -1px;
		font-weight: 700;
		background: #fff;
	}
	.menu-wrapper .icon{
		background-size: 16px 16px;
		vertical-align: top;
		width: 16px;
		height: 16px;
		background-repeat: no-repeat;
		display: inline-block;
	}	
	.menu-item{
		display: table;
		height: 54px;
		width: 56px;
		line-height: 14px;
		padding: 0 12px;
	}
	.menu-wrapper .text{
		display: table-cell;
		vertical-align: middle;
		font-size: 12px;
		width: 56px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.menu-wrapper .text:last-child,.food-item:last-child{
		border: none;
	}
	.foods-wrapper{
		flex: 1;
	}
	.foods-wrapper .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background: #F3F5F7;
	}
	.food-item{
		display: flex;
		margin: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-bottom: 18px;
	}
	.food-item .icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food-item .content{
		flex: 1;
		position: relative;
	}
	.food-item .name{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.extra, .desc{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.desc{
		margin-bottom: 8px;
		line-height: 12px;
	}
	.extra .count{
		margin-right: 12px;
	}
	.price{
		font-weight: 700;
		line-height: 24px;
	}
	.price .now{
		margin-right: 8px;
		font-size: 14px;
	}
	.price .old{
		text-decoration: line-through;
		font-size: 10px;
	}
	.cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	
	
	
	
	.decrease{
		background: url(../img/decrease_3@2x.png);
	}
	.discount{
		background: url(../img/discount_3@2x.png);
	}
	.special{
		background: url(../img/guarantee_3@2x.png);
	}
	.invoice{
		background: url(../img/invoice_3@2x.png);
	}
	.guarantee{
		background: url(../img/special_3@2x.png);
	}
</style>