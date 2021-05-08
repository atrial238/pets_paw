export const initState = {
	randomPet: {},
	isLoading: false,
	isFavouritLoading: false,
	voutingSuccess: false,
	isfavourit: false,
	recentActionLog: [],
	isError: false
}

export const reducer = (state = initState, {type, body}) => {
	switch(type){
		case 'RANDOM_DOG':
			return {...state, randomPet: body};
		case 'SUCCESS':
			return {...state, voutingSuccess: body};
		case 'LOADING':
			return {...state, isLoading: body};
		case 'FAVOURITE_LOADING':
			return {...state, isFavouritLoading: body}
		case 'FAVOURITE':
			return {...state, isfavourit: body};
		case 'ERROR_OCCUR':
			return {...state, isError: body}
		case 'ADD_ITEM_ACTION_LOG':
			return {...state, recentActionLog: [{time: body.time, id: body.id, typeEvent: body.typeEvent}, ...state.recentActionLog]}
		default:
			return state;
	}
}