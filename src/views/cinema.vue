<template>
  <div class="about">
  		<button @click="toggle">全城</button>
  		<ol v-show="flag" class="areas">
  			<li v-for="item in distributes" @click="change(item)">{{item}}</li>
  		</ol>
   		<ul>
			<li v-for="item in filterList">
			    <h3>{{item.name}}</h3>
			    <p>{{item.address}}</p>
			</li>
   		</ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	created(){
		this.$axios.get("/mz/gateway?cityId=110100&ticketFlag=1&k=8123232",{
			headers:{
				"X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
"X-Host": "mall.film-ticket.cinema.list"
			}
		}).then((res)=>{
			this.cinemas = res.data.data.cinemas;
			var set= new Set();
			this.cinemas.forEach((item)=>{
				set.add(item.districtName)
			})
			this.distributes =["全城",...set];
		})
	},
	data(){
		return {
			flag:false,
			cinemas:[],
			distributes:[], //存储区域
			// index:0 //0 全城  非0 其他区域
			curName:"全城"
		}
	},
	computed:{
		filterList(){
			if(this.curName==="全城"){
				return this.cinemas;
			}
			else{
				return this.cinemas.filter((item)=>{
				     return item.districtName===this.curName
				})
			}
		}
	},
	methods:{
		toggle(){
			this.flag =!this.flag;
		},
		change(item){
			this.curName =item;
			this.toggle();
		}
	}
}
</script>
<style lang="scss">
   .about{
   	  position: fixed;
   	  top:0.94rem;
	
   }
   h3{
   	background: none;
   }
	.areas{
		position: absolute;
		top:0.9rem;
		background: #FFF;
		width:100%;

	}
</style>