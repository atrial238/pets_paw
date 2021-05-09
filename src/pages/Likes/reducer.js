export const initState = {
	page: 0,
	favouritesPet: [],
	limit: 'Limit: 5',
	isLastPage: false,
	isLoading: false,
	isError: false,
	removeSuccess: false,
	removedFavId: '',
	items: ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20']
}
export const reducer = (state = initState, {type, body}) =>  {
	switch(type){
		case 'NEXT_PAGE':
			return {...state, page: ++state.page};
		case 'PREVIOUS_PAGE':
			return {...state, page: --state.page};
		case 'SET_PAGE_ZERO':
			return {...state, page: 0};
		case 'SET_LIMIT':
			return {...state, limit: body};
		case 'SET_FAVOUTIRES_PETS':
			return {...state, favouritesPet: body};
		case 'SET_LAST_PAGE':
			return {...state, isLastPage: body};
		case 'SET_IS_LOADING':
			return {...state, isLoading: body};
		case 'SET_IS_ERROR':
			return {...state, isError: body};
		case 'SET_REMOVE_SUCCESS':
			return {...state, removeSuccess: body};
		case 'SET_REMOVED_FAV_ID':
			return {...state, removedFavId: body}
		default:
	}
}