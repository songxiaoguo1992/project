<template>
  <div id="rating">
    <div class="ratings" ref="ratings">
    	<div class="ratings-content">
    		<div class="overview">
    			<div class="overview-left">
    				<h1 class="score">{{seller.score}}</h1>
    				<div class="title">综合评分</div>
    				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
    			</div>
    			<div class="overview-right">
    				<div class="score-wrapper">
    					<span class="title">服务态度</span>
    					<star :size="36" :score="seller.serviceScore"></star>
    					<span class="score">{{seller.serviceScore}}</span>
    				</div>
    				<div class="score-wrapper">
    					<span class="title">商品评分</span>
    					<star :size="36" :score="seller.foodScore"></star>
    					<span class="score">{{seller.foodScore}}</span>
    				</div>
    				<div class="delivery-wrapper">
    					<span class="title">送达时间</span>
    					<span class="delivery">{{seller.deliveryTime}}分钟</span>
    				</div>
    			</div>
    		</div>
    		<split></split>
    		<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
    		<div class="rating-wrapper">
    			<ul>
    				<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
    					<div class="avatar">
    						<img width="28" height="28" :src="rating.avatar" />
    					</div>
    					<div class="content">
    						<h1 class="name">{{rating.username}}</h1>
    						<div class="start-wrapper">
    							<star :size="24" :score="rating.score"></star>
    							<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
    						</div>
    						<p class="text">
    							<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
    							{{rating.text}}
    						</p>
    						<div class="recommend" v-show="rating.recommend && rating.recommend.length">
    							<span v-for="item in rating.recommend" class="item">{{item}}</span>
    						</div>
    						<div class="time">{{rating.rateTime | data}}</div>
    					</div>
    				</li>
    			</ul>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import BScroll from 'better-scroll'

import star from './star.vue'
import split from './split.vue'
import ratingselect from './ratingselect.vue'

const ALL=2;
const ERR_OK=0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				ratings:[],
				selectType:ALL,
				onlyContent:true
			}
		},
		created(){
			axios.get('./data.json').then(function(res){
	 	 		this.ratings=res.data.ratings;
	 	 		
	 	 		this.$nextTick(()=>{
  				if(!this.scroll){
	  				this.scroll=new BScroll(this.$refs.ratings, {
	            click: true
	        	});
	        }else{
		  			this.scroll.refresh();
		  		}
  			})
		 	}.bind(this)).catch(function(res){
		 	 		console.log(res)
		 	});
		},
		methods:{
			selectRating(type){
				this.selectType = type;
				this.$nextTick(()=>{
  				this.scroll.refresh();
  			})
			},
			toggleContent(only){
				this.onlyContent = !this.onlyContent;
				this.$nextTick(()=>{
  				this.scroll.refresh();
  			})
			},
			needShow(type,text){
				if(this.onlyContent && !text)
				{
					return false
				}
				if(this.selectType===ALL){
					return true
				}else{
					return type===this.selectType;
				}
			}
		},
		components:{
			star,
			split,
			ratingselect
		}
	}
</script>
<style type="text/css">
	.ratings{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.ratings-content{
		
	}
	.ratings .overview{
		display: flex;
		padding: 18px 0;
	}
	.ratings .overview-left{
		flex: 0 0 137px;
		width: 137px;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align: center;
		padding: 6px 0;
	}
	@media only screen and (min-width:320px ) {
		.ratings .overview-left{
			flex: 0 0 120px;
			width: 120px;
			padding:0;
		}
		.ratings .overview-right{
			padding: 0;
		}
		.ratings .star-item{
			margin: 0;
		}
	}
	.ratings .overview-left .score{
		font-size: 24px;
		line-height: 28px;
		color: rgb(255,153,0);
		margin-bottom: 6px;
	}
	.ratings .overview-left .title{
		line-height: 12px;
		font-size:12px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.ratings .overview-left .rank{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.ratings .overview-right{
		flex: 1;
		padding: 6px 0 6px 24px;
	}
	.ratings .score-wrapper{
		margin-bottom: 8px;
		line-height: 18px;
		font-size: 0;
	}
	.ratings .score-wrapper .title{
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 18px;
	}
	.ratings #star{
		display: inline-block;
		vertical-align: top;
		margin: 0 10px;
	}
	.ratings .score-wrapper .score{
		display: inline-block;
		vertical-align: top;
		font-size: 12px;
		color: rgb(255,153,0);
		line-height: 18px;
	}
	.ratings .delivery-wrapper{
		font-size: 0;
	}
	.ratings .delivery-wrapper .title{
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 18px;
	}
	.ratings .delivery{
		font-size: 12px;
		color: rgb(147,153,159);
		margin-left: 12px;
	}
	.ratings .rating-wrapper{
		padding: 0 18px;
	}
	.ratings .rating-item{
		display: flex;
		padding: 18px 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.ratings .rating-item .avatar{
		flex: 0 0 28px;
		width: 28px;
		margin-right: 12px;
	}
	.ratings .rating-item .avatar img{
		border-radius: 50%;
	}
	.ratings .rating-item .content{
		position: relative;
		flex: 1;
	}
	.ratings .rating-item .content .name{
		line-height: 12px;
		font-size: 10px;
		color: rgb(7,17,27);
	}
	.ratings .content .start-wrapper{
		margin-bottom: 6px;
		font-size: 0;
	}
	.ratings .content .start-wrapper .star{
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
	}
	.ratings .content .start-wrapper .delivery{
		display: inline-block;
		vertical-align: top;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.ratings .rating-item .content .text{
		line-height: 18px;
		color: rgb(7,17,27);
		font-size: 12px;
	}
	.ratings .recommend{
		line-height: 16px;
		font-size: 0;
	}
	.ratings .recommend .item{
		font-size: 9px;
		display: inline-block;
		margin: 0 8px 4px 0;
		padding: 0 6px;
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 1px;
		color: rgb(147,153,159);
		background: #fff;
	}
	.icon-thumb_up,.icon-thumb_down{
		margin-right: 4px;
		line-height: 24px;
		font-size: 12px;
	}
	.icon-thumb_up{
		color: rgb(0,160,220);
	}
	.icon-thumb_down{
		color: rgb(147,153,159);
	}
	.ratings .content .time{
		position: absolute;
		top: 0;
		right: 0;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
</style>