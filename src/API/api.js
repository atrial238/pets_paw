import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.thedogapi.com/v1/',
	headers: {'x-api-key': 'dfa2b984-f7ef-4dbe-a06f-6c37c1b17461'},
	
});

const sub_id = 'user_123';

// API for vouting. create vote, delete vote, get all my vote 
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

//API for favourites image. Add favourite, delete favourite, get all my favourites image
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

//API for image
export const imageAPI = {
	getSpecificImage(id){
		return instance.get(`/images/${id}`)
			.then(res => res.status === 200 && res.data)
			.catch(() => 'error');
	},
	getRandomPet(){
		return instance.get('/images/search')
		 .then(res => res.status === 200 && res.data[0])
		 .catch(() => 'error');
	},
	getImageByBreed(breed_id, limit, page, mime_types = ['gif', 'jpg', 'png'], order = 'RANDOM'){
		return instance.get('/images/search', {params: {limit, page, sub_id, breed_id, mime_types, order}})
			.then(res => res.status === 200 && res.data[0])
			.catch(() => 'error');
	}
} 

//API for breeds. Get all breeds, search breed by name
export const breedsAPI = {
	getBreeds(limit, page){
		console.log(limit, page)
		return instance.get('/breeds', {params: {limit, page, sub_id}})
			.then(res => res.status === 200 && res.data)
			.catch(() => 'error');
	}
}