<template>
  <div id="seller">
    <div class="seller" ref="seller">
    	<div class="seller-content">
    		<div class="overview">
    			<h1 class="title">{{seller.name}}</h1>
    			<div class="desc">
    				<star :size="36" :score="seller.score"></star>
    				<span class="text">({{seller.ratingCount}})</span>
    				<span class="text">月售{{seller.sellCount}}单</span>
    			</div>
    			<ul class="remark">
    				<li class="block">
    					<h2>起送价</h2>
    					<div class="content">
    						<span class="stress">{{seller.minPrice}}</span>元
    					</div>
    				</li>
    				<li class="block">
    					<h2>商家配送</h2>
    					<div class="content">
    						<span class="stress">{{seller.deliveryPrice}}</span>元
    					</div>
    				</li>
    				<li class="block">
    					<h2>平均配送时间</h2>
    					<div class="content">
    						<span class="stress">{{seller.deliveryTime}}</span>元
    					</div>
    				</li>
    			</ul>
    			<div class="favorite" @click="toggleFavorite">
    				<span class="icon-favorite" :class="{'active':favorite}"></span>
    				<span class="text">{{favoriteText}}</span>
    			</div>
    		</div>
    		<split></split>
    		<div class="bulletin">
    			<h1 class="title">公告与活动</h1>
    			<div class="content-wrapper">
    				<p class="content">{{seller.bulletin}}</p>
    			</div>
    			<ul v-if="seller.supports" class="supports">
  					<li class="support-item" v-for="(item,index) in seller.supports">
  						<span class="icon" :class="classMap[item.type]"> 
  						</span>
  						<span class="text">
  							{{seller.supports[index].description}}
  						</span>
  					</li>
  				</ul>
    		</div>
    		<split></split>
    		<div class="pics">
    			<h1 class="title">商家实景</h1>
    			<div class="pic-wrapper" ref="picWrapper">
    				<ul class="pic-list" ref="picList">
    					<li class="pic-item" v-for="pic in seller.pics">
    						<img :src="pic" width="120" height="90" />
    					</li>
    				</ul>
    			</div>
    		</div>
    		<split></split>
    		<div class="info">
    			<h1 class="title">商家信息</h1>
    			<ul>
    				<li class="info-item" v-for="info in seller.infos">{{info}}</li>
    			</ul>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'

import star from './star.vue'
import split from './split.vue'
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				favorite:false
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?'已收藏':'收藏'
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
		},
		watch:{
			'seller'(){
				this._initScroll();
				this._initPics();
			}
		},
		mounted(){
			this._initScroll();
			this._initPics();
		},
		methods:{
			toggleFavorite(event){
				if(!event._constructed){
					return
				}
				this.favorite=!this.favorite;
			},
			_initScroll(){
				this.$nextTick(()=>{
  				if(!this.scroll){
	  				this.scroll=new BScroll(this.$refs.seller, {
	            click: true
	        	});
	        }else{
		  			this.scroll.refresh();
		  		}
  			})
    	},
    	_initPics(){
        if(this.seller.pics){
					let picWidth=120;
					let margin=6;
					let width=(picWidth+margin)*this.seller.pics.length-margin;
					
					this.$refs.picList.style.width=width+'px';
					this.$nextTick(()=>{
						if(!this.picScroll){
							this.picScroll=new BScroll(this.$refs.picWrapper, {
		            scrollX: true,
		            eventPassthrough:'vertical'
		        	});
						}else{
							this.picScroll.refresh();
						}
	  				
	  			})
				}
    	}
		},
		components:{
			star,
			split
		}
	}
</script>
<style type="text/css">
	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.seller .overview{
		padding: 18px;
		position: relative;
	}
	.seller .overview .title{
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7,17,27);
		font-size: 14px;
	}
	.seller .desc{
		padding-bottom: 18px;
		line-height: 18px;
		font-size: 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller #star{
		display: inline-block;
		margin-right: 8px;
		vertical-align: top;
	}
	.seller .seller-content .desc .text{
		margin-right: 12px;
		font-size: 10px;
		display: inline-block;
		vertical-align: top;
		color: rgb(7,85,93);
	}
	.seller .remark{
		padding-top: 8px;
		display: flex;
	}
	.seller .remark .block{
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7,17,27,0.1);
	}
	.seller .remark .block:last-child{
		border:none;
	}
	.seller .favorite{
		position: absolute;
		top: 18px;
		right: 5px;
		width:50px;
		text-align: center;
	}
	.icon-favorite{
		font-size: 24px;
		line-height: 24px;
		display: block;
		color: #d4d6d9;
		margin-bottom: 4px;
	}
	.icon-favorite.active{
		color: rgb(240,20,20);
	}
	.seller .favorite .text{
		line-height: 10px;
		font-size: 10px;
		color: rgb(7,85,93);
	}
	.seller .block h2{
		margin-bottom: 4px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.seller .block .content{
			font-size: 10px;
			line-height: 24px;
			color: rgb(7,17,27);
	}
	.seller .stress{
		font-size: 24px;
	}
	.seller .bulletin{
		padding: 18px 18px 0 18px;
	}
	.seller .bulletin .title{
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7,17,27);
		font-size: 14px;
	}
	.seller .content-wrapper{
		padding: 0 12px 16px 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller .content-wrapper .content{
		line-height: 24px;
		font-size: 12px;
		color: rgb(240,20,20);
	}
	.seller .supports .support-item{
		padding: 16px 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		font-size: 0;
	}
	.icon{
		margin-right: 4px;
		vertical-align: top;
		width: 16px;
		height: 16px;
		display: inline-block;
		background-repeat: no-repeat;
	}
	.seller .supports .text{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.pics{
		padding: 18px;
	}
	.pics .title{
		margin-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.pic-wrapper{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.pic-list{
		font-size: 0;
	}
	.pic-item{
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.pic-item:last-child{
		margin: 0;
	}
	.seller .info{
		padding: 18px 8px 0 18px;
	}
	.seller .info .title{
		padding-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller .info-item{
		padding: 16px 12px;
		line-height: 16px;
		font-size: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller .info-item:last-child{
		border: none;
	}
	
	
	
	
	
	
	
	.decrease{
		background: url(../img/decrease_3@2x.png);
		background-size: 16px 16px;
	}
	.discount{
		background: url(../img/discount_3@2x.png);
		background-size: 16px 16px;
	}
	.special{
		background: url(../img/guarantee_3@2x.png);
		background-size: 16px 16px;
	}
	.invoice{
		background: url(../img/invoice_3@2x.png);
		background-size: 16px 16px;
	}
	.guarantee{
		background: url(../img/special_3@2x.png);
		background-size: 16px 16px;
	}
</style>