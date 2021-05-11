import {useReducer, useEffect} from 'react';

export const useBusinessLayerGallery = (getPetsImages, getPetImagesByBreed) => {

	const initState = {
		page: 0,
		petImages: [],
		limit: 'Limit: 5',
		isLastPage: false,
		amoutBreeds: null,
		isLoading: false,
		isError: false,
		isSearchByBreed: false,
		breedsName: [],
		currentBreed: 'All breeds',
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
			case 'SET_PET_IMAGES':
				return {...state, petImages: body};
			case 'SET_LAST_PAGE':
				return {...state, isLastPage: body};
			case 'SET_IS_LOADING':
				return {...state, isLoading: body};
			case 'SET_IS_ERROR':
				return {...state, isError: body};
			case 'SET_IS_SEARCH_BY_BREED':
				return {...state, isSearchByBreed: body};
			case 'SET_CURRENT_BREED':
				return {...state, currentBreed: body};
			case 'SET_AMOUT_BREEDS':
				return {...state, amoutBreeds: body}
			case 'SET_BREEDS_NAME':
				return {...state, breedsName: [{name: 'All breeds', id: null}, ...body.map(el => ({name: el.name, id: el.id}))]};
			default:
		}
	}

	const [state, dispatch] = useReducer(reducer, initState);

// this function manege four cases:
//		1. get images for all breeds
//		2. get images for specific breeds by page and limit
//		3. get all images of specific breeds for calculating is this the last page
//		4. get list names of all breeds for dropdown select
	const setPetImages = (methodAPI, isAllBreedsRequest) => {
		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		//define specific breed for seacrch
		const nameBreedForSearch = state.isSearchByBreed ? state.breedsName.find(el => el.name === state.currentBreed).id : 'some';
		//define arguments. without arguments get list names of all breeds for dropdown select. With arguments get images for specific breeds by page and limit
		const methodAPIArguments = isAllBreedsRequest ? [] : [limit, state.page, nameBreedForSearch];

		methodAPI(...methodAPIArguments)
			.then(res => {
				
				if(state.isSearchByBreed && !state.amoutBreeds){
					//get all images of specific breeds for calculating is this the last page
					getPetImagesByBreed(100, null, nameBreedForSearch)
						.then(res => {
							if(res === 'error'){
								dispatch({type: 'SET_IS_LOADING', body: false});
								dispatch({type: 'SET_IS_ERROR', body: true});
							}else{
								dispatch({type: 'SET_IS_LOADING', body: false});
								dispatch({type: 'SET_IS_ERROR', body: false});
								dispatch({type: 'SET_AMOUT_BREEDS', body: res.length});
							}
						})
				}else if(res.length === 0 || (state.amoutBreeds && (state.amoutBreeds <= state.petImages.length * state.page) )){
					// set last page
					dispatch({type: 'SET_LAST_PAGE', body: true});
					dispatch({type: 'SET_IS_LOADING', body: false});

				}else if(res === 'error'){
					// handle error
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true});
				}
				
				dispatch({type: 'SET_IS_LOADING', body: false});
				dispatch({type: 'SET_IS_ERROR', body: false});
				if(isAllBreedsRequest){
					//set  names for dropdown select
					dispatch({type: 'SET_BREEDS_NAME', body: res})
				}else{
					//set images for main contant
					dispatch({type: 'SET_PET_IMAGES', body: res});
				}
			})
	}

//  get list names of all breeds for dropdown select only one time
	useEffect(() => setPetImages(getPetsImages, true), []);

// manage next page, previous page, current breed. Depends what change
	useEffect(() => {
		state.isSearchByBreed ? setPetImages(getPetImagesByBreed) : setPetImages(getPetsImages);
	}, [state.limit, state.page, state.currentBreed]);

//functions for manage pagination
	const setNextPage = () => dispatch({type: 'NEXT_PAGE'});
	const setPreviousPage = () => {
		dispatch({type: 'SET_LAST_PAGE', body: false});
		dispatch({type: 'PREVIOUS_PAGE'})
		dispatch({type: 'SET_AMOUT_BREEDS', body: null});
	};
	const changeLimit = (event) => {
		dispatch({type: 'SET_LAST_PAGE', body: false});
		dispatch({type: 'SET_AMOUT_BREEDS', body: null});
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_LIMIT', body: event.target.value})
	};

// function for manage dropdown list
	const setSearchBreeds = (event) => {
		const value = event.target ? event.target.value : event;
		const isSearchByBreed = value !== 'All breeds';
		dispatch({type: 'SET_LAST_PAGE', body: false});
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_IS_SEARCH_BY_BREED', body: isSearchByBreed});
		dispatch({type: 'SET_CURRENT_BREED', body: value});
		dispatch({type: 'SET_AMOUT_BREEDS', body: null});
	}

	return {
		setSearchBreeds,
		setNextPage,
		setPreviousPage,
		changeLimit,
		state
	}
}
