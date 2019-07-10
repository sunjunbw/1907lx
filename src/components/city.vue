<template>
	<div>
		<ul class="city">
			<li v-for="(city,index) in cities" >
				<h3 v-if="index===0 || index!==0 && cities[index-1].letter!==city.letter" :ref="city.letter">{{city.letter}}</h3>
				<p @click="changeCity(city.name)">{{city.name}}</p>
			</li>
		</ul>
		<ol class="letters">
			<li v-for="item in letters" @click="go(item)">{{item}}</li>
		</ol>
	</div>
</template>
<script>
export default {
	data(){
		return {
			cities:[],
			letters:""
		}
	},
	created(){

		this.getLetters();
		this.$axios.get("/mz/gateway",{
			params:{
				k:Date.now()
			},
			headers:{
				"X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
				"X-Host": "mall.film-ticket.city.list"
			}
		}).then((res)=>{
			var arr =res.data.data.cities.sort((a,b)=>{
				return a.pinyin.localeCompare(b.pinyin)
			}).map((item)=>{
				return {
					'letter':item.pinyin[0].toUpperCase(),
					'name':item.name
				}
			})
			this.cities = arr;
			//产生字母系列的第二种方式利用了set 不能用重复元素
			// var set=new Set([]);
			// var obj={}
			// arr.forEach((item)=>{
			// if(array.isArray(obj[item.pinyin]))
			// 	set.add(item.letter)
			// })
			// console.log([...set]);
			
		})
	},
	
	methods:{
		changeCity(name){
			sessionStorage.setItem("city",name);
			this.$router.go(-1)
		},
		 getLetters(){
		 	var str="";
		 	for(var i=65;i<91;i++){
		 		if(String.fromCharCode(i)==='U' || String.fromCharCode(i)==='V' ||
		 			String.fromCharCode(i)==='I' || String.fromCharCode(i)==='O'  )
		 		 {	
		 		 	continue;
		 		 }
		 		str+= String.fromCharCode(i);
		 	}
		 	this.letters=str;
		 },
		 go(letter){
		 	var top = this.$refs[letter][0].offsetTop;
		 	document.documentElement.scrollTop=top;
		 }
	}
}
</script>
<style>
	h3{
		background: #ccc;
	}
	.city{
		margin-top: 3rem;
		
	}
	.city p{
		height: 0.7rem;
		line-height: 0.7rem;
		border-bottom: 1px solid #ccc;
		
	}
	.letters{
		position: fixed;
		top:50%;
		right:0;
		transform: translateY(-50%);
	}
</style>