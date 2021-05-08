import {useReducer} from 'react';

import { BodyContainter, SearchPanel } from "../../components";
import { FavouritesBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';
import {favouritesAPI} from '../../API/api';

const Favourites = () => {
	favouritesAPI.getMyFavourites()
	const initState = {
		page: 0,
	}
	const reducer = (state = initState, {type, body}) =>  {
		switch(type){
			case 'NEXT_PAGE':
				return {...state, page: ++state.page};
			case "PREVIOUS_PAGE":
				return {...state, page: --state.page};
			default:
		}
	}
	const [state, dispatch] = useReducer(reducer, initState)

	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<FavouritesBody/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Favourites;