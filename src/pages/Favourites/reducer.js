export const initState = {
	page: 0,
	favouritesPet: [],
	limit: 'Limit: 5',
	isLastPage: false,
	isLoading: false,
	isError: false
}
export const reducer = (state = initState, {type, body}) =>  {
	switch(type){
		case 'NEXT_PAGE':
			return {...state, page: ++state.page};
		case 'PREVIOUS_PAGE':
			return {...state, page: --state.page};
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
		default:
	}
}