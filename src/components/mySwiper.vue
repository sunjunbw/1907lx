<template>
	<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in list">
			<img :src="item.imgUrl" />
        </div>
        
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
   
</div>
</template>
<script>
import Swiper from 'swiper'
import "swiper/dist/css/swiper.css"
export default {
	data(){
		return {
			list:[]
		}
	},
	created(){
		this.$axios.get("/mz/gateway?type=2&cityId=110100&k=7312992",{
			"headers":{
				"X-Client-Info":`{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
						"X-Host": `mall.cfg.common-banner`
					}
				}).then((res)=>{
					this.list=res.data.data;
		})
	},
	mounted(){
		 
	},
	watch:{
		list(){  //保证数据变了   保证dom准备好了
			//nextTick 延迟回调函数的执行，直到dom就绪
			this.$nextTick(()=>{
					var mySwiper = new Swiper ('.swiper-container', {
				    loop: true, // 循环模式选项
				    autoplay: {
				    delay: 3000,    
				     disableOnInteraction: false,
				    },
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				    }
	     		})      
			})
			  
		}
	}
}

</script>
<style lang="scss">
	.swiper-container{
		width:100%;
		height: 100%;
		img{
			width:100%;
			height: 100%;
		}
	}
</style>