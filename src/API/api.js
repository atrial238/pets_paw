import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.thedogapi.com/v1/',
	headers: {'x-api-key': 'dfa2b984-f7ef-4dbe-a06f-6c37c1b17461'},
	
});
// axios.defaults.headers.common['x-api-key'] = "dfa2b984-f7ef-4dbe-a06f-6c37c1b17461";
// axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';

const sub_id = 'user_123';
export const votingAPI = {

	addVote({image_id, value}){
		return instance.post('/votes', {image_id, value, sub_id})
			.then(res => res.status === 200 && res.data)
			.catch(() => 'error')
	},
	getMyVotes(limit, page){
		return instance.get('/votes', {params: {sub_id, limit, page}})
			.then(res =>  res.status === 200 && res.data)
			.catch(() => 'error')
	},
	removeVote(id){
		console.log(id)
		return instance.delete(`/votes/${id}`)
			.then(res => console.log(res) || (res.status === 200 && res.data))
			.catch(() => 'error')
	}
	
}

export const favouritesAPI = {
	getMyFavourites(limit, page){
		return instance.get('/favourites', {params: {limit, page, sub_id}})
			.then(res =>  res.status === 200 && res.data)
			.catch(() => 'error')
	},
	addFavourite({image_id}){
		return instance.post('/favourites', {image_id, sub_id})
			.then(res => res.status === 200 && res.data)
			.catch(() => 'error')
	},
	removeFavourite(id){
		return instance.delete(`/favourites/${id}`)
			.then(res => res.status === 200 && res.data)
			.catch(() => 'error')
	}
}

export const imageAPI = {
	getSpecificImage(id){
		return instance.get(`/images/${id}`)
			.then(res => res.status === 200 && res.data)
			.catch(() => 'error');
	},
	getRandomPet(){
		return instance.get('/images/search')
		 .then(res => res.status === 200 && res.data[0])
		 .catch(() => 'error')
	},
} 
let array = [1,2];
(array).push(3);
console.log(array)