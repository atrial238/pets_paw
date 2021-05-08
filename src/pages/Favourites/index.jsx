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
		favouritesAPI.getMyFavourites(limit, state.page)
			.then(res => dispatch({type: 'SET_FAVOUTIRES_PETS', body: res}))
	}, [state.limit, state.page]);

	const propsFavoritesBody = {
		changeLimit,
		state
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