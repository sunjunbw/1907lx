<template>
	<div>
		<img :src="film.poster" class="imgfilm" />
			<p class="back" @click="go"><</p>
    </div>
</template>
<script>
export default {
	 data(){
	 	return {
	 		film:{}
	 	}
	 },
	 created(){
	 	this.$axios.get("/mz/gateway",{
	 		params:{
	 			filmId:this.$route.params.id,
	 			k:Date.now()
	 		},
	 		headers:{
	 			"X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"154399058310458245367575"}`,
				"X-Host": "mall.film-ticket.film.info"
	 		}
	 	}).then((res)=>{
	 		this.film = res.data.data.film
	 	})
	 },
	 methods:{
	 	go(){
	 		this.$router.go(-1);
	 	}
	 }
}
</script>
<style>
	.back{
		background: #ccc;
		opacity: 0.7;
		border-radius: 50%;
		width: 0.5rem;
		height: 0.5rem;
		text-align: center;
		line-height: 0.5rem;
		z-index:5;
		position: fixed;
		top:0.3rem;
		left:0.1rem;
	}
	.imgfilm{
		width:100%;
	}
</style>
