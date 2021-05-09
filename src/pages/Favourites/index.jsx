import {useReducer, useEffect} from 'react';
import { format } from 'date-fns';

import { BodyContainter, SearchPanel } from "../../components";
import { FavouritesBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';
import {favouritesAPI} from '../../API/api';
import { initState, reducer } from './reducer';


const Favourites = () => {
	
	const [state, dispatch] = useReducer(reducer, initState)

//fomat time using the data-fns library, this is need for success message when remove favourite
	const getTime = () => format(new Date(), "k':'mm");

//initialize my favourites pet, handle error, set preloader
	useEffect(() => {
		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		favouritesAPI.getMyFavourites(limit, state.page)
			.then(res => {
				if(res.length === 0){
					dispatch({type: 'SET_LAST_PAGE', body: true});
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res === 'error'){
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true})
				}else{
					dispatch({type: 'SET_LAST_PAGE', body: false})
					dispatch({type: 'SET_FAVOUTIRES_PETS', body: res})
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false})
				}
			})
	}, [state.limit, state.page]);

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
		favouritesAPI.removeFavourite(id)
			.then(res=> {
				if(res === 'error'){
					dispatch({type: 'SET_IS_ERROR', body: true})
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res.message === 'SUCCESS'){
					dispatch({type: 'SET_REMOVE_SUCCESS', body: true});
					dispatch({type: 'SET_REMOVED_FAV_ID', body: id})
					setTimeout(() => dispatch({type: 'SET_REMOVE_SUCCESS', body: false}), 5000);
					const limit = +state.limit.match(/.{1,2}$/g)[0];
					favouritesAPI.getMyFavourites(limit, state.page)
						.then(res => {
							if(res === 'error') {
								dispatch({type: 'SET_IS_ERROR', body: true})
								dispatch({type: 'SET_IS_LOADING', body: false});
							}else{
								dispatch({type: 'SET_IS_ERROR', body: false})
								dispatch({type: 'SET_IS_LOADING', body: false});
								dispatch({type: 'SET_FAVOUTIRES_PETS', body: res});
							}
						})
				}
			})
	}

//props for FavouritesBody
	const propsFavoritesBody = {
		changeLimit,
		state,
		setNextPage,
		setPreviousPage,
		removeFavourite,
		getTime,
	}
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<FavouritesBody {...propsFavoritesBody}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Favourites;