import { ActionLog, BackButton } from "../../components"
import {img_voting_dog, wrapper, voting, likes, favourites, dislikes, action_log, back_button} from './VotinBody.module.scss';
import dog from '../../assets/images/temporary/1.jpg';
import { Dislikes, Favourites, Likes } from "../../components/Svg";

const VotingBody = () => {
	return (
		<div className={wrapper}>
			<div className={back_button}><BackButton name='voting'/></div>
			<div className={img_voting_dog}>
				<img src={dog} alt='voting dog'/>
				<div className={voting}> 
					<button className={likes}><Likes/></button>
					<button className={favourites }><Favourites/></button>
					<button className={dislikes}><Dislikes/></button>
				</div>
			</div>
			<div className={action_log}>
				<ActionLog time='22:35' id='fQSunHvl8' typeEvent='Favourite'/>
				<ActionLog time='22:27' id='HJd0XecNX' typeEvent='Likes'/>
				<ActionLog time='22:21' id='BbMFS3bU' typeEvent='Dislikes'/>
				<ActionLog time='21:56' id='fQSunHvl8' typeEvent=' '/>
			</div>
		</div>
	)
}
export default VotingBody;
