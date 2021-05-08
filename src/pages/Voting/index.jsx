import {useReducer, useEffect} from 'react';
import { votingAPI } from '../../API/api';
import { BodyContainter, SearchPanel } from "../../components";
import { Header, VotingBody } from "../../modules";
import { initState, reducer } from './reducer';
import {wrapper} from './Voting.module.scss';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

const Voting = () => {

	const [state, dispatch] = useReducer(reducer, initState);

	useEffect(()=> {
		dispatch({type: 'FAVOURITE', body: false})
		votingAPI.getRandomPet()
			.then(res => dispatch({type: 'RANDOM_DOG', body: res}))
	}, [])

	const addRecentActionLog = (time, id, typeEvent) => dispatch({type: 'ADD_ITEM_ACTION_LOG', body: {time, id, typeEvent}});

	const getTime = () => format(new Date(), "k':'mm");

	const vote = (body) => {
		dispatch({type: 'LOADING', body: true});
		votingAPI.vote(body)
			.then(() =>{
				if(body.value === 1) addRecentActionLog(getTime(), body.image_id, 'Likes');
				if(body.value === 0) addRecentActionLog(getTime(), body.image_id, 'Dislikes');
				dispatch({type: 'FAVOURITE', body: false})
				votingAPI.getRandomPet()
				.then(res => {
					dispatch({type: 'LOADING', body: false});
					dispatch({type: 'RANDOM_DOG', body: res})
				})
			})
	}

	const addFavourite = (body) => {
		dispatch({type: 'LOADING', body: true});
		votingAPI.addFavourite(body)
			.then(() => {
				dispatch({type: 'FAVOURITE', body: true});
				dispatch({type: 'LOADING', body: false});
				addRecentActionLog(getTime(), body.image_id, 'Favourite');
			})
	}

	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<VotingBody state={state} vote={vote} addFavourite={addFavourite}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Voting;