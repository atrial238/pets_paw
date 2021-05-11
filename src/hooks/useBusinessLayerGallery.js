import {useReducer, useEffect} from 'react';

export const useBusinessLayerGallery = (getPetsImages, getPetImagesByBreed) => {

	const initState = {
		page: 0,
		petImages: [],
		limit: 'Limit: 5',
		isLastPage: false,
		isLoading: false,
		isError: false,
		isSearchByBreed: false,
		breedsName: [{name: 'All breeds', id: null}],
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
			case 'SET_BREEDS_NAME':
				return {...state, breedsName: [...state.breedsName, ...body.map(el => ({name: el.name, id: el.id}))]};
			default:
		}
	}

	const [state, dispatch] = useReducer(reducer, initState);

	const setPetImages = (methodAPI, isAllBreedsRequest) => {
		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})

		const nameBreedForSearch = state.isSearchByBreed ? state.breedsName.find(el => el.name === state.currentBreed).id : 'some';
		
		const methodAPIArguments = isAllBreedsRequest ? [] :  [limit, state.page, nameBreedForSearch];

		methodAPI(...methodAPIArguments)
			.then(res => {
				if(res.length === 0){
					dispatch({type: 'SET_LAST_PAGE', body: true});
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res === 'error'){
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true});
				}else{
					dispatch({type: 'SET_LAST_PAGE', body: false});
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false});

					if(isAllBreedsRequest){
						dispatch({type: 'SET_BREEDS_NAME', body: res})
					}else{
						
						dispatch({type: 'SET_PET_IMAGES', body: res});
					}
				}
			})
	}
	useEffect(() => setPetImages(getPetsImages, true), []);

	useEffect(() => {
		state.isSearchByBreed ? setPetImages(getPetImagesByBreed) : setPetImages(getPetsImages);
			
	}, [state.limit, state.page, state.currentBreed]);

//functions for manage pagination
	const setNextPage = () => dispatch({type: 'NEXT_PAGE'});
	const setPreviousPage = () => dispatch({type: 'PREVIOUS_PAGE'});
	const changeLimit = (event) => {
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_LIMIT', body: event.target.value})
	};
	const setSearchBreeds = (event) => {
		
		const isSearchByBreed = event.target.value !== 'All breeds';
		
		dispatch({type: 'SET_IS_SEARCH_BY_BREED', body: isSearchByBreed});
		dispatch({type: 'SET_CURRENT_BREED', body: event.target.value});
	}

	return {
		setSearchBreeds,
		setNextPage,
		setPreviousPage,
		changeLimit,
		state
	}
}
