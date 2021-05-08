import {useReducer, useEffect} from 'react';
import format from 'date-fns/format';

import { votingAPI, favouritesAPI} from '../../API/api';
import { BodyContainter, SearchPanel } from "../../components";
import { Header, VotingBody } from "../../modules";
import { initState, reducer } from './reducer';
import {wrapper} from './Voting.module.scss';


const Voting = () => {

	 const [state, dispatch] = useReducer(reducer, initState);

// initialize first pet image
	useEffect(()=> {
		dispatch({type: 'LOADING', body: true});
		dispatch({type: 'FAVOURITE', body: false});
		dispatch({type: 'ERROR_OCCUR', body: false});
		votingAPI.getRandomPet()
			.then(res => {
				if(res === 'error') {
					dispatch({type: 'ERROR_OCCUR', body: true});
					dispatch({type: 'LOADING', body: false});
				}else{
					dispatch({type: 'LOADING', body: false});
					dispatch({type: 'RANDOM_DOG', body: res});
				}
			})
	}, [])

// helper function 
	const addRecentActionLog = (time, id, typeEvent) => dispatch({type: 'ADD_ITEM_ACTION_LOG', body: {time, id, typeEvent}});

// get formating time via date-fns library
	const getTime = () => format(new Date(), "k':'mm");

// create vote UP or vote Down for current pet
	const addVote = (body) => {
		dispatch({type: 'LOADING', body: true});
		dispatch({type: 'ERROR_OCCUR', body: false});
		votingAPI.addVote(body)
			.then(res => {
				if(res === 'error'){
					dispatch({type: 'ERROR_OCCUR', body: true});
					dispatch({type: 'LOADING', body: false});
				}else{
					if(body.value === 1) addRecentActionLog(getTime(), body.image_id, 'Likes');
					if(body.value === 0) addRecentActionLog(getTime(), body.image_id, 'Dislikes');
					dispatch({type: 'FAVOURITE', body: false});
					dispatch({type: 'ERROR_OCCUR', body: false});
					votingAPI.getRandomPet()
					.then(res => {
						if(res === 'error'){
							dispatch({type: 'ERROR_OCCUR', body: true});
							dispatch({type: 'LOADING', body: false});
						}else{
							dispatch({type: 'LOADING', body: false});
							dispatch({type: 'RANDOM_DOG', body: res});
							dispatch({type: 'ERROR_OCCUR', body: false});
						}
					})
				}
			})
	}
	
// save current image pet as a favourite
	const addFavourite = (body) => {
		dispatch({type: 'FAVOURITE_LOADING', body: true});
		dispatch({type: 'ERROR_OCCUR', body: false});
		favouritesAPI.addFavourite(body)
			.then(res => {
				if(res === 'error'){
					dispatch({type: 'FAVOURITE_LOADING', body: false});
					dispatch({type: 'ERROR_OCCUR', body: true});
				}else{
					dispatch({type: 'FAVOURITE', body: true});
					dispatch({type: 'FAVOURITE_LOADING', body: false});
					addRecentActionLog(getTime(), body.image_id, 'Favourite');
					dispatch({type: 'ERROR_OCCUR', body: false});
				}
			})
	}

	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<VotingBody state={state} addVote={addVote} addFavourite={addFavourite}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Voting;