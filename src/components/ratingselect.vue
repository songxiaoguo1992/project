<template>
  <div id="ratingselect">
    <div class="ratingselect">
    	<div class="rating-type">
    		<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">
    			{{desc.all}}
    			<span class="count">{{ratings.length}}</span>
    		</span>
    		<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">
    			{{desc.positive}}
    			<span class="count">{{positives.length}}</span>
    		</span>
    		<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">
    			{{desc.negative}}
    			<span class="count">{{negatives.length}}</span>
    		</span>
    	</div>
    	<div @click="toggleContent($event)" class="swich" :class="{'on':onlyContent}">
    		<span class="icon-check_circle"></span>
    		<span class="text">只看有内容的评价</span>
    	</div>
  	</div>
  </div>
</template>
<script type="text/javascript">
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;

	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType===POSITIVE;
				})
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType===NEGATIVE;
				})
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return
				}
				this.$emit('select', type);
			},
			toggleContent(event){
				if(!event._constructed){
					return
				}
				this.$emit('toggle');
			}
		}
	}
</script>
<style type="text/css">
	.rating-type{
		padding: 18px;
		margin: 0 18px;
		border-bottom: 1px solid rgb(7,17,27,0.1);
		font-size: 0;
	}
	.block{
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		border-radius: 1px;
		color: rgb(77,85,93);
		font-size: 12px;
		line-height: 12px;
	}
	.block .count{
		font-size: 8px;
		margin-left: 2px;
	}
	.positive{
		background: rgba(0,120,220,0.2);
	}
	.negative{
		background: rgba(77,85,93,0.2);
	}
	.ratingselect .block.active{
		color:#fff ;
	}
	.ratingselect .positive.active{
		background: rgb(0,120,220);
	}
	.ratingselect .negative.active{
		background: rgb(77,85,93);
	}
	.swich{
		padding: 12px 18px;
		line-height: 24px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		color: rgb(147,153,159);
		font-size: 0;
	}
	.icon-check_circle{
		margin-right: 4px;
		font-size: 24px;
		display: inline-block;
		vertical-align: top;
	}
	.swich.on .icon-check_circle{
		color: green;
	}
	.swich .text{
		font-size: 12px;
		display: inline-block;
		vertical-align: top;
	}
</style>