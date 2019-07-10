<template>
	<div class="box" v-gd="vis" dis="210"> 
 <!--  吸顶后进行显示的导航 -->
   <div class="myheader" v-show="vis.flag">电影
     <div class="nav">
      <h2><router-link to="/home/film/nowplaying">正在上映</router-link></h2>
      <h2><router-link to="/home/film/comingSoon">即将上映</router-link></h2>
    </div>
   </div>
<!--    一进入组件显示的东西 -->
    <div class="swiper">
    <p class="dw" @click="gocity">{{city}}</p>
      <mySwiper />  
    </div>
    <div class="nav">
      <h2><router-link to="/home/film/nowplaying">正在上映</router-link></h2>
      <h2><router-link to="/home/film/comingSoon">即将上映</router-link></h2>
    </div>
    
    <ul id="list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <li v-for="item in list" class="row" @click="godetail(item.filmId)">
       <!-- <router-link :to="'/detail/'+item.filmId"> -->
          <img :src="item.poster" width="100" />
          <div>
              {{item.name}}
              <p v-if="type==='nowplaying'">
              {{item.nation}} || {{item.runtime}}
              </p>
              <p v-else>
                  {{item.premiereAt*1000|formatTime}}
              </p>
          </div>
     <!--      </router-link> -->
      </li>
</ul>
	
	</div>
</template>
<script>
   import mySwiper from './mySwiper'
   import { Toast } from 'mint-ui';
   import { InfiniteScroll } from 'mint-ui';
   export default {
   	   data(){
   	   	return {
   	   		type:'',
          city:'',
          page:1, //当前的页码
          loading:false, //表示可以发请求  true 表示不可以发请求
   	   		list:[],
               vis:{
                  flag:false
               }
   	   	}
   	   },
       created(){
        this.$router.push("/home/film/nowplaying")
        this.city = sessionStorage.getItem("city")||"北京"
       },
         components:{
               mySwiper
         },
   	   methods:{

    gocity(){
      this.$router.push("/city")
    },

           loadMore(){ //下拉滚动加载新数据
              this.page++;             
              this.getData();
           },
           godetail(id){ //到详情页面
             this.$router.push('/detail/'+id)
           },
   	   		getData(){  //按页获取数据
            if(this.page>5){
              Toast({
                message:'已经到底了',
                position:'bottom',
                duration:2000
              })
              return;
            }
   	   			var type = this.type==='nowplaying'?1:2;
             this.loading=true; //表示同时只能发一次请求
   	   			this.$axios.get(`/mz/gateway?`,              
              {
                params:{
                  cityId:110100,
                  pageNum:this.page,
                  pageSize:10,
                  type,
                  k:Date.now()
              },    

   	   				headers:{
   	   					"X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
						"X-Host": `mall.film-ticket.film.list`
   	   				}
   	   			}).then((res)=>{
   	   				this.list=this.list.concat(res.data.data.films);
              this.loading=false;
   	   			})
   	   		},
          resetList(){
            this.list=[];
            this.loading=false;
            this.page=1;
          }
   	   },
   	   watch:{
   	   	 $route:{
   	   	 	handler(newV){
            if(newV.path==="/home/film"){
              this.$router.push("/home/film/nowplaying")
            }
            else{
              this.type=newV.params.type;
              this.resetList();
              this.getData();
            }
   	   	 		
   	   	 	},
   	   	 	deep:true,
   	   	 	immediate:true
   	   	 }
   	   }
   }

</script>
<style lang="scss">
      .box{
         position: fixed;
         top:0;
         bottom:0.98rem;
         right:0;
         left:0;
         overflow: auto;
      }
       .swiper {
      width:100%;
      height: 4.2rem;
      position: relative;
      background: #ccc;
    }
    .myheader{
      position: fixed;
      width:100%;
      top:0;
      left:0;
      text-align: center;
      background: #FFF;   
    }
    .row{
      display: flex;
    }
    .row{
      img{
          margin:0.3rem;
      }
      div{
        flex:1;
        margin-top: 0.3rem;
      }
    }
    .dw{
    background: #ccc;
    opacity: 0.5;
    width: 0.8rem;
    text-align: center;
    position:absolute;
    border-radius: 40%;
    top:0.3rem;
    left:0.4rem;
    z-index:100;
  }
</style>