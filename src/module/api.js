import axios from 'axios';
import { Indicator } from 'mint-ui';
axios.interceptors.request.use((config)=>{
	Indicator.open();
	return config;
})

axios.interceptors.response.use((res)=>{
	Indicator.close();
	return res;
})