import {useReducer, useEffect} from 'react';

import { BodyContainter, SearchPanel } from "../../components";
import { FavouritesBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';
import {favouritesAPI} from '../../API/api';
import { initState, reducer } from './reducer';

const Favourites = () => {
	
	const [state, dispatch] = useReducer(reducer, initState)

	const changeLimit = (event) => dispatch({type: 'SET_LIMIT', body: event.target.value});

	useEffect(() => {
		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		favouritesAPI.getMyFavourites(limit, state.page)
			.then(res => {
				if(res.length === 0){
					dispatch({type: 'SET_LAST_PAGE', body: true})
				}else{
					dispatch({type: 'SET_LAST_PAGE', body: false})
					dispatch({type: 'SET_FAVOUTIRES_PETS', body: res})
				}
			})
	}, [state.limit, state.page]);

	const setNextPage = () => dispatch({type: 'NEXT_PAGE'});
	const setPreviousPage = () => dispatch({type: 'PREVIOUS_PAGE'});
	

	const propsFavoritesBody = {
		changeLimit,
		state,
		setNextPage,
		setPreviousPage
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