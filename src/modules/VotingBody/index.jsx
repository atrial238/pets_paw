import { ActionLog, BackButton } from "../../components"
import {img_voting_dog, wrapper, voting, likes, favourites, dislikes, active, action_log, back_button} from './VotinBody.module.scss';
import dog from '../../assets/images/temporary/1.jpg';
import { Dislikes, Favourites, Likes } from "../../components/Svg";
import preloader from '../../assets/images/preloader/white_preloader_60.svg';

const VotingBody = ({state, vote, addFavourite}) => {
	
	const {randomPet, isLoading, voutingSuccess, isfavourit, recentActionLog} = state;

	let elementActionLog;

	if(recentActionLog){
		elementActionLog  = recentActionLog.map(el => <li key={el.id}><ActionLog time={el.time} id={el.id} typeEvent={el.typeEvent} /></li>);
	}

//props for buttons
	const propsFavourite = {
		className: `${favourites} ${isfavourit && active}`,
		onClick(){addFavourite({image_id: randomPet.id})}
		
	}
	const propsLikes = {
		className: likes,
		onClick(){vote({image_id: randomPet.id, value: 1})}
	}
	const propsDislikes = {
		className: dislikes,
		onClick(){vote({image_id: randomPet.id, value: 0})}
	}

	return (
		<div className={wrapper}>
			<div className={back_button}><BackButton name='voting'/></div>
			<div className={img_voting_dog}>
				<img src={state.randomPet.url} alt='voting dog'/>
				<div className={voting}> 
					{/* <button {...propsLikes}>{(isLoading && preloader) || <Likes/>}</button> */}
					<button {...propsLikes}>{preloader}</button>
					<button {...propsFavourite}>{(isLoading && preloader) || <Favourites/>}</button>
					<button {...propsDislikes}>{ (isLoading && preloader) || <Dislikes/>}</button>
				</div>
			</div>
			<ul className={action_log}>{elementActionLog}</ul>
		</div>
	)
}
export default VotingBody;
