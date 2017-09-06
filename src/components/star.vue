<template>
  <div id="star" class="star" :class="starType">
  	<span v-for="itemClass in itemClasses" :class="itemClass">
  	</span>
  </div>
</template>
<script type="text/javascript">
const LENGTH=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off';

	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-'+this.size;
			},
			itemClasses(){
				let result=[];
				let score=Math.floor(this.score*2)/2;
				let hasDecimal=score*1!==0;
				let integer=Math.floor(score);
				
				for(let i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				if(hasDecimal){
					result.push(CLS_HALF);
				}
				while(result.length<LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>
<style type="text/css">
	#star{
		font-size: 0;
	}
	.star-48 span{
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 12px;
	}
	.star-48 span:last-child{
		margin: 0;
	}
	.star-48 .on{
		background: url(../img/star48_on@2x.png);
		background-size: 20px 20px;
	}
	.star-48 .half{
		background: url(../img/star48_half@2x.png);
		background-size: 20px 20px;
	}
	.star-48 .off{
		background: url(../img/star48_off@2x.png);
		background-size: 20px 20px;
	}
	.star-36 span{
		width: 15px;
		height: 15px;
		display: inline-block;
		margin-right: 4px;
	}
	.star-36 span:last-child{
		margin: 0;
	}
	.star-36 .on{
		background: url(../img/star36_on@2x.png);
		background-size: 15px 15px;
	}
	.star-36 .half{
		background: url(../img/star36_half@2x.png);
		background-size: 15px 15px;
	}
	.star-36 .off{
		background: url(../img/star36_off@2x.png);
		background-size: 15px 15px;
	}
	.star-24 span{
		width: 10px;
		height: 10px;
		margin-right: 1px;
		display: inline-block;
	}
	.star-24 span:last-child{
		margin: 0;
	}
	.star-24 .on{
		background: url(../img/star24_on@2x.png);
		background-size: 10px 10px;
	}
	.star-24 .half{
		background: url(../img/star24_half@2x.png);
		background-size: 10px 10px;
	}
	.star-24 .off{
		background: url(../img/star24_off@2x.png);
		background-size: 10px 10px;
	}
	.star-item{
		display: inline-block;
		background-repeat: no-repeat;
		margin-right: 8px;
	}
</style>