export const initState = {
	randomPet: {},
	isLoading: false,
	voutingSuccess: false,
	isfavourit: false,
	recentActionLog: []
}

export const reducer = (state = initState, {type, body}) => {
	switch(type){
		case 'RANDOM_DOG':
			return {...state, randomPet: body};
		case 'SUCCESS':
			return {...state, voutingSuccess: body};
		case 'LOADING':
			return {...state, isLoading: body};
		case 'FAVOURITE':
			return {...state, isfavourit: body};
		case 'ADD_ITEM_ACTION_LOG':
			console.log(state)
			return {...state, recentActionLog: [{time: body.time, id: body.id, typeEvent: body.typeEvent}, ...state.recentActionLog]}
		default:
			return state;
	}
}