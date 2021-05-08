import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.thedogapi.com/v1/',
	headers: {'x-api-key': 'dfa2b984-f7ef-4dbe-a06f-6c37c1b17461'},
	
});
// axios.defaults.headers.common['x-api-key'] = "dfa2b984-f7ef-4dbe-a06f-6c37c1b17461";
// axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';
export const votingAPI = {

	getRandomPet(){
		return instance.get('/images/search')
		 .then(res => res.status === 200 && res.data[0])
		 .catch(() => 'something went wrong')
	},
	vote({image_id, value}){
		return instance.post('/votes', {image_id, value})
			.then(res => res.status === 200 && res.data)
			.catch(() => 'something went wrong')
	},
	addFavourite({image_id}){
		console.log(image_id)
		return instance.post('/favourites', {image_id})
			.then(res => res.status === 200 && res.data)
			.catch((res) =>  res)
	}
}
