import PropTypes from 'prop-types';

import { ActionLog, Placeholder } from "../../components";
import {img_voting_dog, wrapper, voting, likes, favourites, dislikes, active, error, action_log} from './VotinBody.module.scss';
import { Dislikes, Favourites, Likes } from "../../components/Svg";


const VotingBody = ({state, addVote, addFavourite}) => {
	
	const {randomPet, isLoading, isfavourit, recentActionLog, isFavouritLoading, isError} = state;

	let elementActionLog;

	if(recentActionLog){
		elementActionLog  = recentActionLog.map(el =>
			 <li key={el.id}><ActionLog time={el.time} id={el.id} typeEvent={el.typeEvent} /></li>);
	}

//props for buttons
	const propsFavourite = {
		className: `${favourites} ${isfavourit && active}`,
		onClick(){addFavourite({image_id: randomPet.id})},
		disabled: isLoading || isfavourit
	}
	const propsLikes = {
		className: likes,
		onClick(){addVote({image_id: randomPet.id, value: 1})},
		disabled: isLoading
	}
	const propsDislikes = {
		className: dislikes,
		onClick(){addVote({image_id: randomPet.id, value: 0})},
		
	}

	return (
		<div className={wrapper}>
			
			<div className={img_voting_dog + ' ' + (isError && error)}>
			{(isError && 'Oops! Something went wrong') || (isLoading && <Placeholder size='80'/>) || <img src={state.randomPet.url} alt='voting dog'/> }
				<div className={voting}>
					<button {...propsLikes}><Likes/></button>
					<button {...propsFavourite}> {(isFavouritLoading && <Placeholder/>) || <Favourites/> }</button>
					<button {...propsDislikes}> <Dislikes/></button>
				</div>
			</div>
			<ul className={action_log}>{elementActionLog}</ul>
		</div>
	)
}
export default VotingBody;

VotingBody.propTypes = {
	state: {
		randomPet: PropTypes.object,
		isLoading: PropTypes.bool,
		isfavourit:  PropTypes.bool,
		isFavouritLoading: PropTypes.bool,
		recentActionLog: PropTypes.array,
		isError: PropTypes.bool
	},
	addVote: PropTypes.func,
	addFavourite: PropTypes.func
}
