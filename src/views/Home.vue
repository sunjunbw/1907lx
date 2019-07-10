<template>
  <div class="home">
     
   

    <router-view class="home_box" />

    <ul class="footer">
		<li class="item">
		    <router-link to="/home/film">
			<span class="iconfont icon-dianying"></span>
			<span>影片</span>
			</router-link>
		</li>
		<li>
			<router-link to="/home/cinema">
				<span class="iconfont icon-yingyuana"></span>
				<span>影院</span>
			</router-link>
			
			
		</li>
		<li>
			<router-link to="/home/shop">
				<span class="iconfont icon-youhui"></span>
				<span>特惠</span>
			</router-link>
		</li>
		<li>
		<router-link to="/home/my">
				   <span class="iconfont icon-iconfuzhi"></span>
					<span>我的</span>
			</router-link>
		</li>
    </ul>

  </div>
</template>

<script>


export default {
  name: 'home',
  components: {
    
  },
  

}
</script>
<style>
   
	.footer{
		position: fixed;
		bottom: 0;
		display: flex;
		width:100%;
	    background: #FFF;
		

	}
	.footer li{
		flex:1;
		height: 0.98rem;
	}
	.footer li a{
		height: 0.98rem;
		display: flex;		
		text-align: center;
		flex-direction: column;

	}
	.home_box{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0.98rem;
	}
	.router-link-active{
		color:#ff5f16;
	}
	
</style>