export const initState = {
	page: 1,
	favouritesPet: [],
	limit: 'Limit: 5'
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
			return {...state, favouritesPet: body}
		default:
	}
}