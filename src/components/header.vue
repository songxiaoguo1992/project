<template>
  <div id="header">
  	<div class="content-wrapper">
  		<div class="avatar">
  			<img width="64" height="64" :src="seller.avatar" />
  		</div>
  		<div class="content">
  			<!--标题-->
  			<div class="title">
  				<span class="brand"><img width="30" height="18" src="../img/brand@2x.png" /></span>
  				<span class="name">{{seller.name}}</span>
  			</div>
  			<!--描述-->
  			<div class="description">
  				{{seller.description}}/{{seller.deliveryTime}}分钟送达
  			</div>
  			<div v-if="seller.supports" class="support">
  				<span class="icon"><img width="12" height="12" src="../img/decrease_1@2x.png"/></span>
  				<span class="text">{{seller.supports[0].description}}</span>
  			</div>
	  		<div v-if="seller.supports" class="support-count" @click="showDetail">
	  			<span class="count">{{seller.supports.length}}个 ></span>
	  		</div>
	  	</div>
  	</div>
  	<div class="bulletin-wrapper" @click="showDetail">
  		<span class="bulletin-title"><img width="22" height="12" src="../img/bulletin@2x.png"/></span>
  		<span class="bulletin-text">{{seller.bulletin}}</span>>
  	</div>
  	<div class="background">
  		<img width="100%" height="100%" :src="seller.avatar" />
  	</div>
  	<div v-show="detailShow" class="detail">
  		<div class="detail-wrapper clearfix">
  			<div class="detail-main">
  				<h1 class="name">{{seller.name}}</h1>
  				<div class="start-wrapper">
  					<star :size='48' :score="seller.score"></star>
  				</div>
  				<div class="title">
  					<div class="line"></div>
  					<div class="text">优惠信息</div>
  					<div class="line"></div>
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
  				<div class="title">
  					<div class="line"></div>
  					<div class="text">商家公告</div>
  					<div class="line"></div>
  				</div>
  				<div class="bulletin">
  					<p class="content">{{seller.bulletin}}</p>
  				</div>
  			</div>
  		</div>
  		<div class="detail-close" @click="hideDetail">
  			<i class="icon-close"></i>
  		</div>
  	</div>
  </div>
</template>
<script>
import star from './star.vue'
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true
			},
			hideDetail(){
				this.detailShow=false
			}
		},
		components:{
			star
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee']
		}
	}
</script>
<style>
body,html{
	line-height: 1;
	font-weight: 200;
	font-family: "palatino linotype","微软雅黑",helvetica,arial,sans-serif;
}
	#header{
		position: relative;
		display: inline-block;
		background: rgba(7,17,27,0.5);
		width: 100%;
		color: #fff;
		overflow: hidden;
	}
	#header .content-wrapper{
		position: relative;
		padding: 24px 12px 18px 24px;
	}
	#header .avatar,#header .content{
		vertical-align: top;
		display: inline-block;
		font-size: 14px;
	}
	#header .avatar img{
		border-radius: 2px;
	}
	#header .content{
		margin-left: 16px;
	}
  #header .content .title{
		margin: 2px 0 8px 0;
	}
	#header .brand{
		vertical-align: top;
	}
	#header .content .name{
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	#header .description{
		font-size: 12px;
		line-height: 12px;
		margin-bottom: 10px;
	}
	#header .icon{
		margin-right: 4px;
		vertical-align: top;
		width: 16px;
		height: 16px;
		display: inline-block;
		background-repeat: no-repeat;
	}
	#header .support .text{
		font-size: 12px;
		line-height: 12px;
	}
	#header .support-count{
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background: rgba(0,0,0,0.2);
		text-align: center;
	}
	#header .count{
		font-size: 10px;
	}
	#header .bulletin-wrapper{
		background: #7E8C8D;
		height: 24px;
		line-height: 24px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	#header .bulletin-title{
		display: inline-block;
		vertical-align: top;
	}
	#header .bulletin-text{
		margin: 0 3px;
		font-size: 10px;
		vertical-align: top;
	}
	#header .background{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		filter:blur(10px);
	}
	#header .detail{
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: rgba(7,17,27,0.8);
		top: 0;
		left: 0;
	}
	.clearfix{
		display: inline-block;
	}
	.clearfix ::after{
		content: '.';
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
	#header .detail-wrapper{
		min-height: 100%;
		width: 100%;
	}
	#header .detail-main{
		margin-top: 64px;
		padding-bottom: 64px;
	}
	#header .detail-main .name{
		line-height: 16px;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
	}
	.detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 32px;
		cursor: pointer;
	}
	#header .detail-wrapper .start-wrapper{
		margin-top: 18px;
		padding: 0;
		text-align: center;
	}
	#header .detail-main .title{
		display: flex;
		width: 80%;
		margin: 2px auto 24px auto;
	}
	#header .detail-main .line{
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	#header .detail-main .text{
		padding: 0 12px;
		font-weight: 700;
		font-size: 14px;
		vertical-align: bottom;
	}
	#header .supports{
		width: 80%;
		margin: 0 auto;
	}
	#header .support-item{
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	#header .support-item .icon{
		background-size: 16px 16px;
		width: 16px;
		height: 16px;
		background-repeat: no-repeat;
		display: inline-block;
	}
	#header .bulletin{
		width: 80%;
		margin: 0 auto;
	}
	#header .bulletin .content{
		padding: 0 12px;
		line-height: 24px;
		font-size: 12px;
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