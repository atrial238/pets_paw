import {useReducer, useEffect} from 'react';
import {format} from 'date-fns';
import { imageAPI } from '../API/api';

export const useLogicHandleMyVoting = (getPetAPI, removePetAPI, likes = false, dislikes = false) => {

	const initState = {
		page: 0,
		favouritesPet: [],
		limit: 'Limit: 5',
		isLastPage: false,
		isLoading: false,
		isError: false,
		removeSuccess: false,
		removedVoteId: '',
		items: ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'],
	}

	const reducer = (state = initState, {type, body}) =>  {
		switch(type){
			case 'NEXT_PAGE':
				return {...state, page: ++state.page};
			case 'PREVIOUS_PAGE':
				return {...state, page: --state.page};
			case 'SET_PAGE_ZERO':
				return {...state, page: 0};
			case 'SET_LIMIT':
				return {...state, limit: body};
			case 'SET_VOTE_PETS':
				return {...state, favouritesPet: body};
			case 'SET_LAST_PAGE':
				return {...state, isLastPage: body};
			case 'SET_IS_LOADING':
				return {...state, isLoading: body};
			case 'SET_IS_ERROR':
				return {...state, isError: body};
			case 'SET_REMOVE_SUCCESS':
				return {...state, removeSuccess: body};
			case 'SET_REMOVED_VOTE_ID':
				return {...state, removedVoteId: body}
			default:
		}
	}

	const [state, dispatch] = useReducer(reducer, initState)

//fomat time using the data-fns library, this is need for success message when remove favourite
	const getTime = () => format(new Date(), "k':'mm");

// helper function to avoid dublicate code
	const getVotingPetImages = (response) => {
		if(response.length === 0){
			dispatch({type: 'SET_LAST_PAGE', body: true});
			dispatch({type: 'SET_IS_LOADING', body: false});
		}else{
			//response of get my Votes don't contain url of image,
			//that whay I must make request for every vote on another endpoit(/images), for attach to every vote url image
			Promise.all(response.map(el => imageAPI.getSpecificImage(el.image_id)))
				.then(res => {
					const votePets = res.map((el, index) => ({id: response[index].id, image: {id: el.id, url: el.url}, value: response[index].value}))
					dispatch({type: 'SET_VOTE_PETS', body: votePets});
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false});
					dispatch({type: 'SET_LAST_PAGE', body: false});
				})
				.catch(() => {
						dispatch({type: 'SET_IS_ERROR', body: true})
						dispatch({type: 'SET_IS_LOADING', body: false});
				});
		}
	}
	
//initialize my favourites, likes or dislikes pet, handle error, set preloader
	useEffect(() => {
		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		getPetAPI(limit, state.page)
			.then(res => {
				if(res.length === 0){
					dispatch({type: 'SET_LAST_PAGE', body: true});
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res === 'error'){
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true})
				}else{
					if(likes || dislikes){
						getVotingPetImages(res)
					}else{
						dispatch({type: 'SET_VOTE_PETS', body: res});
						dispatch({type: 'SET_LAST_PAGE', body: false});
						dispatch({type: 'SET_IS_LOADING', body: false});
						dispatch({type: 'SET_IS_ERROR', body: false});
					}
				}
			})
	}, [state.limit, state.page, getPetAPI, likes, dislikes]);

//functions for manage pagination
	const setNextPage = () => dispatch({type: 'NEXT_PAGE'});
	const setPreviousPage = () => dispatch({type: 'PREVIOUS_PAGE'});
	const changeLimit = (event) => {
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_LIMIT', body: event.target.value})
	};

//remove favourite, handle errors, set preloader, handle success message, update my favourites pet
	const removeFavourite = (id) => {
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		removePetAPI(id)
			.then(res=> {
				if(res === 'error'){
					dispatch({type: 'SET_IS_ERROR', body: true})
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res.message === 'SUCCESS'){
					dispatch({type: 'SET_REMOVE_SUCCESS', body: true});
					dispatch({type: 'SET_REMOVED_VOTE_ID', body: id})
					setTimeout(() => dispatch({type: 'SET_REMOVE_SUCCESS', body: false}), 5000);
					const limit = +state.limit.match(/.{1,2}$/g)[0];
					getPetAPI(limit, state.page)
						.then(res => {
							if(res.length === 0){
								dispatch({type: 'SET_LAST_PAGE', body: true});
								dispatch({type: 'SET_IS_LOADING', body: false});
							}else if(res === 'error'){
								dispatch({type: 'SET_IS_LOADING', body: false});
								dispatch({type: 'SET_IS_ERROR', body: true})
							}else{
								if(likes || dislikes){
									getVotingPetImages(res)
								}else{
									dispatch({type: 'SET_VOTE_PETS', body: res});
									dispatch({type: 'SET_LAST_PAGE', body: false});
									dispatch({type: 'SET_IS_LOADING', body: false});
									dispatch({type: 'SET_IS_ERROR', body: false});
								}
							}
						})
				}
			})
	}

	return {
		changeLimit,
		state,
		setNextPage,
		setPreviousPage,
		removeFavourite,
		getTime,
	}
}