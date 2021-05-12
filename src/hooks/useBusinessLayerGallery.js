import {useReducer, useEffect} from 'react';

export const useBusinessLayerGallery = (getPetsImages, getPetImagesByBreed, isGalleryPage = false) => {

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
		currentBreedForGallery: 'All breeds',
		items: ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'],
		isImageOpenInNewPage: false,
		orderBreedSearch: 'Random',
		typeBreedSearch: 'All',
		updateSearch: false
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
				return {...state, amoutBreeds: body};
			case 'SET_ORDER_BREED_SEARCH':
				return {...state, orderBreedSearch: body};
			case 'SET_TYPE_BREEDS_SEARCH':
				return {...state, typeBreedSearch: body}
			case 'SET_IS_IMAGE_OPEN_IN_NEW_PAGE':
				return {...state, isImageOpenInNewPage: body};
			case 'SET_CURRENT_PAGE_FOR_GALLERY':
				return {...state, currentBreedForGallery: body};
			case 'SET_ORDER_BREED_FOR_SEARCH':
				return {...state, orderBreedSearch: body};
			case 'SET_TYPE_BREED_FOR_SEARCH':
				return {...state, typeBreedSearch: body};
			case 'SET_UPDATE_SEARCH':
				return {...state, updateSearch: !state.updateSearch};
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
		dispatch({type: 'SET_IS_ERROR', body: false});
		//define specific breed for seacrch
		const currentBreed = isGalleryPage ? state.currentBreedForGallery : state.currentBreed;
		const nameBreedForSearch = state.isSearchByBreed ?  state.breedsName.find(el => el.name === currentBreed ).id : null;
		//define arguments. without arguments get list names of all breeds for dropdown select.
		// With arguments get images for specific breeds by page, limit, order(RANDOM,DESC, ASC), type(gif, jpg, png);
		let type;
		
		switch(state.typeBreedSearch){
			case 'Static':
				type = 'jpg, png';
				break;
			case 'Animated':
				type= 'gif';
				break;
			default:
				type= ['gif','jpg', 'png']
		}
	
		const methodAPIArguments = isAllBreedsRequest ? [] : [limit, state.page, nameBreedForSearch, type, state.orderBreedSearch.toUpperCase()];

		methodAPI(...methodAPIArguments)
			.then(res => {
				
				if(state.isSearchByBreed && !state.amoutBreeds){
					//get all images of specific breeds for calculating is current page the last page
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
	useEffect(() => {
		setPetImages(getPetsImages, true);
		dispatch({type: 'SET_IS_IMAGE_OPEN_IN_NEW_PAGE', body: isGalleryPage})
	}, []);

// manage next page, previous page, current breed. Depends what change
	useEffect(() => {
		state.isSearchByBreed || isGalleryPage ? setPetImages(getPetImagesByBreed) : setPetImages(getPetsImages);
	}, [state.limit, state.page, state.currentBreed, state.updateSearch]);

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
		dispatch({type: 'SET_IS_IMAGE_OPEN_IN_NEW_PAGE', body: isSearchByBreed})
		dispatch({type: 'SET_LAST_PAGE', body: false});
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_IS_SEARCH_BY_BREED', body: isSearchByBreed});
		dispatch({type: 'SET_CURRENT_BREED', body: value});
		dispatch({type: 'SET_AMOUT_BREEDS', body: null});
	}

	const updateSearch = () => {
		dispatch({type: 'SET_IS_SEARCH_BY_BREED', body: true});
		dispatch({type: 'SET_UPDATE_SEARCH'});
		dispatch({type: 'SET_LAST_PAGE', body: false});
		dispatch({type: 'SET_IS_IMAGE_OPEN_IN_NEW_PAGE', body: true})


	}
	const handleCurrentBreedForGallery = (event) => {
		dispatch({type: 'SET_CURRENT_PAGE_FOR_GALLERY', body: event.target.value})
	}
	const handleOrderBreedForSearch = (event) => {
		dispatch({type: 'SET_ORDER_BREED_FOR_SEARCH', body: event.target.value})
	}
	const handleTypeBreedForSearch = (event) => {
		dispatch({type: 'SET_TYPE_BREED_FOR_SEARCH', body: event.target.value})
	}
	return {
		setSearchBreeds,
		setNextPage,
		setPreviousPage,
		changeLimit,
		handleCurrentBreedForGallery,
		handleOrderBreedForSearch,
		handleTypeBreedForSearch,
		updateSearch,
		state,
	}
}
